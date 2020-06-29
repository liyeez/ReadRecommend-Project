from django.contrib import admin

# Register your models here.
from .models import *

# admin.site.register(Question)
admin.site.register(Book)
admin.site.register(Collection)
admin.site.register(Profile)