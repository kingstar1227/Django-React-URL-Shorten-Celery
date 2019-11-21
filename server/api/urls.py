from django.conf.urls import include, url
from rest_framework.routers import SimpleRouter
from rest_framework.authtoken.views import obtain_auth_token

from api.views import RecordViewSet
from api.views import SignupView



router = SimpleRouter()
router.register('records', RecordViewSet, 'record')

urlpatterns = [
    url('login/', obtain_auth_token),
    url('signup/', SignupView.as_view()),
    url(r'^', include(router.urls)),
]
