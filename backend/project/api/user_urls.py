from django.urls import path
from . import collections

urlpatterns = [
    path("viewcollection", collections.get_collection)
]
