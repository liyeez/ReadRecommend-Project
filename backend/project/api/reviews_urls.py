from django.urls import path
from . import reviews

urlpatterns = [
    path("get_reviews", reviews.get_reviews),


]
