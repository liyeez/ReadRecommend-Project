from django.urls import include, path
from rest_framework import routers
from . import views

urlpatterns = [
    path("hello_world", views.hello_world),
    path("hello_name_get/<str:name>/", views.hello_name_get),
    path("hello_name_post", views.hello_name_post),
    path("auth/signin", views.signin),
    path("auth/signup", views.signup)
]
