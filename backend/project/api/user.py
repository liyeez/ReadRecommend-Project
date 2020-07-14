# User profile

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .utilities import auth_validator, input_validator, user_validator

from django.db.models import Q
from .models import Collection, Profile


@api_view(["GET"])
@auth_validator
def get_library(request):
    """
    get_library

    Returns a user's library

    Input:
    auth (str)

    Returns:
    collection_id (int)
    book_list (list):
        id (int)
        book_name (str)
    """
    library = request.user.collection_set.get(library=True)

    collection_id = library.collection_id
    book_list = []
    for book in library.books.all():
        book_list.append({"id": book.id, "book_title": book.title,
                          "book_author": book.author, "book_pub_date": book.pub_date})

    return Response({"status": "ok", "message": "Got user library", "collection_id": collection_id, "book_list": book_list}, status=status.HTTP_200_OK)


@api_view(["GET"])
@user_validator
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
    collections = request.user.collection_set.filter(library=False)

    collection_list = []
    for collection in collections.all():
        collection_list.append(
            {"collection_id": collection.collection_id, "collection_name": collection.name})

    return Response({"status": "ok", "message": "Got user collections", "collection_list": collection_list}, status=status.HTTP_200_OK)


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
    search = request.GET["search"]

    profiles = Profile.objects.filter(Q(full_name__icontains=search))

    user_list = []
    for profile in profiles.all():
        user_list.append({"user_id": profile.user.id,
                          "first_name": profile.user.first_name, "last_name": profile.user.last_name})

    if len(user_list) > 0:
        message = "Got users"
    else:
        message = "No matches found"

    return Response({"status": "ok", "message": message, "user_list": user_list}, status=status.HTTP_200_OK)


@api_view(["GET"])
@user_validator
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
    # Currently no additional information exists on profile but its there if we ever need it
    profile: Profile = request.user.profile
    collections: Collection = request.user.collection_set

    first_name = request.user.first_name
    last_name = request.user.last_name
    library_collection_id = 0

    collection_list = []
    for collection in collections.all():
        if not collection.library:
            collection_list.append(
                {"collection_id": collection.collection_id, "collection_name": collection.name})
        else:
            library_collection_id = collection.collection_id

    return Response({"status": "ok", "message": "Got user profile data", "first_name": first_name, "last_name": last_name, "library_collection_id": library_collection_id, "collection_list": collection_list}, status=status.HTTP_200_OK)


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
    # Currently no additional information exists on profile but its there if we ever need it
    profile: Profile = request.user.profile
    collections = request.user.collection_set

    first_name = request.user.first_name
    last_name = request.user.last_name
    library_collection_id = 0

    collection_list = []
    for collection in collections.all():
        if not collection.library:
            collection_list.append(
                {"collection_id": collection.collection_id, "collection_name": collection.name})
        else:
            library_collection_id = collection.collection_id

    return Response({"status": "ok", "message": "Got current user profile data", "first_name": first_name, "last_name": last_name, "library_collection_id": library_collection_id, "collection_list": collection_list}, status=status.HTTP_200_OK)
