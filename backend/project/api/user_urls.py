from django.urls import path
from . import user

urlpatterns = [
    path("get_library", user.get_library),
    path("get_collections", user.get_collections),
    path("find_users", user.find_users),
    path("get_profile", user.get_profile),
    path("my_profile", user.my_profile)
]
