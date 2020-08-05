
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ObjectDoesNotExist
from .models import Book, Review
from django.db.models import Q
from .utilities import input_validator, user_validator,auth_validator


@api_view(["GET"])
@input_validator(["id"])
def get_reviews(request):

    book_id = request.GET["id"]
    reviews = Review.objects.filter(book=book_id)

    review_list = []
    for review in reviews.all():
        review_list.append({"user_id":review.user.id,"user_name": (review.user.first_name + " " + review.user.last_name), 
                            "review": review.text,"rating": review.score})

    if len(review_list) > 0:
        message = "Got matching reviews"
    else:
        message = "No matches found"

    return Response({"status": "ok", "message": message, "review_list": review_list, "currentUser": request.user.id}, status=status.HTTP_200_OK)

@api_view(["POST"])
@auth_validator
@input_validator(["id","review","rating"])
def new_review(request):

    book_id = request.POST["id"]
    review = request.POST["review"]
    rating = request.POST["rating"]
    user = request.user
    
    try:
        book = Book.objects.get(id=book_id)      
    except:
        return Response({"status": "error", "message": "invalid book"}, status=status.HTTP_200_OK)
              

    if not Review.objects.filter(user=user,book=book):
        Review.objects.create_review(book, user, rating,review)     
        return Response({"status": "ok", "message": "review successfully created"}, status=status.HTTP_200_OK)
    return Response({"status": "ok", "message": "review unsuccessfully created"}, status=status.HTTP_200_OK)
    
@api_view(["POST"])
@auth_validator
@input_validator(["id"])
def remove_review(request):

    book_id = request.POST["id"]
    user = request.user
    
    try:
        Book.objects.get(id=book_id)
        review = Review.objects.get(user=user,book=book_id)
    except:
        return Response({"status": "error", "message": "invalid book or review"}, status=status.HTTP_200_OK)
        
    review.delete()
    return Response({"status": "ok", "message": "review successfully deleted"}, status=status.HTTP_200_OK)
    


@api_view(["GET"])
@auth_validator
@input_validator(["id"])
def user_reviews(request):

    
   # for user in User.objects.all():
    #    print(user.id)
    try:
        user = User.objects.get(id=id)
        
    except:
        return Response({"status": "error", "message": "invalid user"}, status=status.HTTP_200_OK)

    reviews = Review.objects.filter(user=user)

    review_list = []
    for review in reviews.all():
        review_list.append({"id": book_id, "review": review.text,
                            "rating": review.score})

    if len(review_list) > 0:
        message = "Got matching reviews"
    else:
        message = "No matches found"

    return Response({"status": "ok", "message": message, "review_list": review_list}, status=status.HTTP_200_OK)
 
 