from django.urls import path
from . import books

urlpatterns = [
    path("data", books.data),
    path("search", books.search),
    path("random", books.random),
    path("random_not_library", books.random_not_library)
]
