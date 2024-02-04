from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission


# Create your models here.
class User(AbstractUser):
    groups = models.ManyToManyField(Group, related_name='user_related_groups')
    user_permissions = models.ManyToManyField(
        Permission, related_name='user_related_permissions'
    )