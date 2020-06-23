from django.db import models
from django.utils import timezone
import datetime

'''
class UserManager(models.Manager):
    def create_user(self, email, first_name, last_name, password):
        user = self.create(email=email, first_name=first_name,
                           last_name=last_name, password=password)
        return user


class User(models.Model):
    email = models.EmailField(max_length=128, unique=True)
    first_name = models.CharField(max_length=24)
    last_name = models.CharField(max_length=24)
    password = models.CharField(max_length=64)

    def __str__(self):
        return self.email + ' ' + self.first_name + ' ' + self.last_name
'''
