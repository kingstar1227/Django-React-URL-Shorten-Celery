from django.contrib.auth import get_user_model
from django.conf import settings
from rest_framework import viewsets
from rest_framework import views
from rest_framework.response import Response


from api.models import Record
from api.serializers import RecordSerializer
from api.serializers import UserCreateSerializer
from api.tasks import shorten_url_task

class RecordViewSet(viewsets.ModelViewSet):
    def get_serializer_class(self):
        return RecordSerializer

    def get_queryset(self):
        qs = Record.objects.select_related('user')
        qs = qs.filter(user=self.request.user)
        return qs

    def perform_create(self, serializer):
        record = serializer.save()
        record.user = self.request.user
        shorten_url_task.delay(record_id=record.id)
        record.save()

    def perform_update(self, serializer):
        record = serializer.save()

    def perform_destroy(self, instance):
        instance.delete()


class SignupView(views.APIView):
    authentication_classes = ()
    permission_classes = ()

    def post(self, *args, **kwargs):
        user_data = self.request.data
        serializer = UserCreateSerializer(data=user_data)
        serializer.is_valid(raise_exception=True)
        user = get_user_model().objects.create_user(
            serializer.data['username'],
            serializer.data['email'],
            serializer.data['password']
        )
        return Response({
            'success': True
        })
