# User profile

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .utilities import auth_validator, input_validator

from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

@api_view(["GET"])
@input_validator(["user_id"])
def get_library(request):
    """
    get_library

    Returns a user's library

    Input:
    user_id (int)

    Returns:
    book_list (list):
        book_id (int)
        book_name (str)
    """
    return Response({"status": "ok", "message": "Got user library", "book_list": [{"book_id": 1234567891011, "book_name": "test_book0"}, {"book_id": 1234567891012, "book_name": "test_book1"}]}, status=status.HTTP_200_OK)

@api_view(["GET"])
@input_validator(["user_id"])
def get_collections(request):
    """
    get_collections

    Returns a user's collections

    Input:
    user_id (int)

    Returns:
    collection_list (list):
        collection_id (int)
        collection_name (str)
    """
    return Response({"status": "ok", "message": "Got user collections", "collection_list": [{"collection_id": 123, "collection_name": "test_collection0"}, {"collection_id": 124, "collection_name": "test_collection1"}]}, status=status.HTTP_200_OK)

@api_view(["GET"])
@input_validator(["search"])
def find_users(request):
    """
    find_users

    Search for other users

    Input:
    search (str)

    Returns:
    user_list (list):
        user_id (int)
        user_first_name (str)
        user_last_name (str)
    """
    return Response({"status": "ok", "message": "Got users", "user_list": [{"user_id": 1, "user_first_name": "test_first0", "user_last_name": "test_last0"}, {"user_id": 2, "user_first_name": "test_first1", "user_last_name": "test_last1"}, {"user_id": 3, "user_first_name": "test_first2", "user_last_name": "test_last2"}]}, status=status.HTTP_200_OK)

@api_view(["GET"])
@input_validator(["user_id"])
def get_profile(request):
    """
    get_profile

    Returns a user's profile details

    Input:
    user_id (int)

    Returns:
    user_first_name (str)
    user_last_name (str)
    collection_list (list):
        collection_id (int)
        collection_name (str)
    """
    return Response({"status": "ok", "message": "Got user profile data", "user_first_name": "test_first0", "user_last_name": "test_last0", "collection_list": [{"collection_id": 123, "collection_name": "test_collection0"}, {"collection_id": 124, "collection_name": "test_collection1"}]}, status=status.HTTP_200_OK)

@api_view(["GET"])
@auth_validator
def my_profile(request):
    """
    my_profile

    Returns a user's profile details

    Input:
    token (str)

    Returns:
    user_first_name (str)
    user_last_name (str)
    collection_list (list):
        collection_id (int)
        collection_name (str)
    """
    return Response({"status": "ok", "message": "Got current user profile data", "user_first_name": "test_first0", "user_last_name": "test_last0", "collection_list": [{"collection_id": 123, "collection_name": "test_collection0"}, {"collection_id": 124, "collection_name": "test_collection1"}]}, status=status.HTTP_200_OK)
