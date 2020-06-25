from django.urls import path
from . import books

urlpatterns = [
    path("data", books.data),
]
