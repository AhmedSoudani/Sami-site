from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class User(AbstractUser):
    pass



class Exercice(models.Model):
    question = models.CharField(max_length=200, blank=False)
    response = models.CharField(max_length=100, blank=False)
    choices = models.TextField(blank=True)
    level = models.IntegerField(blank=False)


    def serialize(self):
        return {
            "id" : self.id,
            "question" : self.question,
            "response" : self.response,
            "choices" : self.choices,
            "level" : self.level
        }

    def __str__(self):
        return f"{self.question[:10]}..."
    

class Books(models.Model):
    title = models.CharField(max_length=100, blank=False)
    src = models.CharField(max_length=500, blank=False)
    description = models.TextField()
    
