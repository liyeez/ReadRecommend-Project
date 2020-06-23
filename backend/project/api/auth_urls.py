from django.urls import path
from . import auth

urlpatterns = [
    path("signup", auth.signup),
    path("signin", auth.signin)
]
