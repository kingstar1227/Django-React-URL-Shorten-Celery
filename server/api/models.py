from django.conf import settings
from django.db import models

from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


class Record(models.Model):
    status = models.CharField(max_length=300, null=False, default='Pending')
    shorten_url = models.CharField(max_length=300, null=True, blank=True)
    full_url = models.CharField(max_length=300, null=False, blank=False)

    user = models.ForeignKey(settings.AUTH_USER_MODEL, null=True)

    def __str__(self):
        return u'{} at {} {}'.format(
            self.full_url,
            self.shorten_url,
            self.full_url
        )