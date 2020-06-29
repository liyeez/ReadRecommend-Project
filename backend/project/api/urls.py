from django.urls import include, path
from rest_framework import routers
from . import views, auth, books

urlpatterns = [
    path("auth/", include("api.auth_urls")),
    path("books/", include("api.books_urls")),
    path("collections/", include("api.collections_urls")),
    path("user/", include("api.user_urls")),
    path("hello_world", views.hello_world),
    path("hello_name_get/<str:name>/", views.hello_name_get),
    path("hello_name_post", views.hello_name_post)
]
