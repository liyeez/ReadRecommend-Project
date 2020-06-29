from django.urls import path
from . import collections

urlpatterns = [
    path("viewcollection", collections.view_collection),
    path("addtitle", collections.add_title),
    path("deletetitle", collections.delete_title)
]
