
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ObjectDoesNotExist

from django.db.models import Q
from .models import Review
from .utilities import input_validator, user_validator


@api_view(["GET"])
@input_validator(["id"])
def get_reviews(request):

    book_id = request.GET["id"]

    reviews = Review.objects.filter(book=book_id)

    review_list = []
    for review in reviews.all():
        review_list.append({"review_user": 'temp', "review_score": review.score,
                            "review_text": review.text})

    if len(review_list) > 0:
        message = "Got matching reviews"
    else:
        message = "No matches found"

    return Response({"status": "ok", "message": message, "review_list": review_list}, status=status.HTTP_200_OK)
