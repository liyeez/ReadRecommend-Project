from django.urls import path
from . import collections

urlpatterns = [
    path("view_collection", collections.view_collection),
    path("add_title", collections.add_title),
    path("delete_title", collections.delete_title),
    path("rename", collections.rename), 
    path("add_tag", collections.add_tag)
]
