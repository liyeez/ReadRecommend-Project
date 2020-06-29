# User profile

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.core import serializers

from .utilities import auth_validator, input_validator

from django.contrib.auth.models import User
from .models import Collection

@api_view(["GET"])
@input_validator(["user_id"])
def get_library(request):
    """
    get_library

    Returns a user's library

    Input:
    user_id (int)

    Returns:
    collection_id (int)
    book_list (list):
        book_id (int)
        book_name (str)
    """
    if User.objects.filter(id=request.GET["user_id"]).exists():
        user = User.objects.get(id=request.GET["user_id"])
        library = user.collection_set.filter(library=True)[0]

        collection_id = library.collection_id
        book_list = []
        for book in library.books.all():
            book_list.append({"book_id": book.isbn, "book_title": book.title})

        return Response({"status": "ok", "message": "Got user library", "collection_id": collection_id, "book_list": book_list}, status=status.HTTP_200_OK)
    else:
        return Response({"status": "error", "message": "Invalid user"}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

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
    if User.objects.filter(id=request.GET["user_id"]).exists():
        user = User.objects.get(id=request.GET["user_id"])
        collections = user.collection_set.filter(library=False)

        collection_list = []
        for collection in collections.all():
            collection_list.append({"collection_id": collection.collection_id, "collection_name": collection.name})

        return Response({"status": "ok", "message": "Got user collections", "collection_list": collection_list}, status=status.HTTP_200_OK)
    else:
        return Response({"status": "error", "message": "Invalid user"}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

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
        first_name (str)
        last_name (str)
    """
    return Response({"status": "ok", "message": "Got users", "user_list": [{"user_id": 1, "first_name": "test_first0", "last_name": "test_last0"}, {"user_id": 2, "first_name": "test_first1", "last_name": "test_last1"}, {"user_id": 3, "first_name": "test_first2", "last_name": "test_last2"}]}, status=status.HTTP_200_OK)

@api_view(["GET"])
@input_validator(["user_id"])
def get_profile(request):
    """
    get_profile

    Returns a user's profile details

    Input:
    user_id (int)

    Returns:
    first_name (str)
    last_name (str)
    library_collection_id (str)
    collection_list (list):
        collection_id (int)
        collection_name (str)
    """
    if User.objects.filter(id=request.GET["user_id"]).exists():
        user = User.objects.get(id=request.GET["user_id"])
        # Currently no additional information exists on profile but its there if we ever need it
        profile = user.profile
        collections = user.collection_set

        first_name = user.first_name
        last_name = user.last_name
        library_collection_id = 0

        collection_list = []
        for collection in collections.all():
            if not collection.library:
                collection_list.append({"collection_id": collection.collection_id, "collection_name": collection.name})
            else:
                library_collection_id = collection.collection_id

        return Response({"status": "ok", "message": "Got user collections", "first_name": first_name, "last_name": last_name, "library_collection_id": library_collection_id, "collection_list": collection_list}, status=status.HTTP_200_OK)
    else:
        return Response({"status": "error", "message": "Invalid user"}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

@api_view(["GET"])
@auth_validator
def my_profile(request):
    """
    my_profile

    Returns a user's profile details

    Input:
    token (str)

    Returns:
    first_name (str)
    last_name (str)
    library_collection_id (str)
    collection_list (list):
        collection_id (int)
        collection_name (str)
    """
    user = request.user
    # Currently no additional information exists on profile but its there if we ever need it
    profile = user.profile
    collections = user.collection_set

    first_name = user.first_name
    last_name = user.last_name
    library_collection_id = 0

    collection_list = []
    for collection in collections.all():
        if not collection.library:
            collection_list.append({"collection_id": collection.collection_id, "collection_name": collection.name})
        else:
            library_collection_id = collection.collection_id

    return Response({"status": "ok", "message": "Got user collections", "first_name": first_name, "last_name": last_name, "library_collection_id": library_collection_id, "collection_list": collection_list}, status=status.HTTP_200_OK)
