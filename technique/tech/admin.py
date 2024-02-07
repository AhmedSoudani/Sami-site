from django.contrib import admin
from .models import User, Exercice

# Register your models here.
admin.site.register(Exercice)
admin.site.register(User)
