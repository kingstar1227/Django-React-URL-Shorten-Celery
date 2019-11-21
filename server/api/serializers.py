from django.contrib.auth import get_user_model

from rest_framework import serializers

from api.models import Record


class RecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Record
        fields = ('id', 'full_url', 'status', 'shorten_url')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id', 'username', 'email')
        read_only_fields = ('id', 'username', 'email')


class UserUpdateSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    email = serializers.CharField(required=True)

class UserCreateSerializer(UserUpdateSerializer):
    password = serializers.CharField(min_length=6, required=True)
    confirm_password = serializers.CharField(min_length=6, required=True)

    def validate(self, data):
        data = super(UserCreateSerializer, self).validate(data)
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError('Password confirmation does not match')
        return data
