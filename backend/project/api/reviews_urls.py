from django.urls import path
from . import reviews

urlpatterns = [
    path("get_reviews", reviews.get_reviews),
    path("remove_review",reviews.remove_review),
    path("user_reviews",reviews.user_reviews),
    path("new_review",reviews.new_review)

    

]
