from django.contrib import admin
from .models import User, Exercice,Books

# Register your models here.
admin.site.register(Exercice)
admin.site.register(User)
admin.site.register(Books)