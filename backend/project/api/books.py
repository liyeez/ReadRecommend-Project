
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ObjectDoesNotExist

from django.db.models import Q
from .models import Book
from .utilities import input_validator, auth_validator


@api_view(["GET"])
@input_validator(["id"])
def data(request):
    """
    data

    Retrieves complete book metadata

    Input:
    id (int)

    Returns:
    book_id (int)
    book_title (str)
    book_cover (str): base64 encoded cover
    book_author (str)
    book_pub_date (datetime)
    last_review_id (int) [MAY BE REMOVED IN THE FUTURE]
    """
    try:
        book = Book.objects.get(id=request.GET["id"])
    except ObjectDoesNotExist:
        return Response({"status": "error", "message": "Book not found"}, status=status.HTTP_204_NO_CONTENT)

    return Response({"status": "ok", "message": "Got book data", "book_title": book.title, "book_id": book.id, "book_cover": book.cover, "book_author": book.author, "book_pub_date": book.pub_date, "last_review_id": 3}, status=status.HTTP_200_OK)


@api_view(["GET"])
@input_validator(["search"])
def search(request):
    """
    search

    Gets all books matching a search string for title/author

    Input:
    search (str)

    Returns:
    book_list (list):
        book_id (int)
        book_title (str)
        book_author (str)
    """
    search = request.GET["search"]

    books = Book.objects.filter(
        Q(title__icontains=search) | Q(author__contains=search))

    book_list = []
    for book in books.all():
        book_list.append({"book_id": book.id, "book_title": book.title,
                          "book_author": book.author, "book_pub_date": book.pub_date})

    if len(book_list) > 0:
        message = "Got matching books"
    else:
        message = "No matches found"

    return Response({"status": "ok", "message": message, "book_list": book_list}, status=status.HTTP_200_OK)


@api_view(["GET"])
@input_validator(["count"])
def random(request):
    """
    random

    Retrieves a specified number of random books (<13) and their metadata

    Input:
    count (int)

    Returns:
    book_list (list):
        book_id (int)
        book_title (str)
        book_author (str)
    """
    count = int(request.GET["count"])

    if count > 12:
        return Response({"status": "error", "message": "Too many books"}, status=status.HTTP_416_REQUESTED_RANGE_NOT_SATISFIABLE)

    books = Book.objects.all().order_by('?')[:count]

    book_list = []
    for book in books:
        book_list.append({"book_id": book.id, "book_title": book.title,
                          "book_author": book.author, "book_pub_date": book.pub_date})

    return Response({"status": "ok", "message": "Got random books", "book_list": book_list}, status=status.HTTP_200_OK)


@api_view(["GET"])
@input_validator(["count"])
@auth_validator
def random_not_library(request):
    """
    random not library

    Get <13 random books not in a user’s library

    Input:
    user_id (int)
    count (int)

    Returns:
    book_list (list):
        book_id (int)
        book_title (str)
        book_author (str)
    """
    count = int(request.GET["count"])

    if count > 12:
        return Response({"status": "error", "message": "Too many books"}, status=status.HTTP_416_REQUESTED_RANGE_NOT_SATISFIABLE)

    library = request.user.collection_set.get(library=True)
    books_in_library = library.books.all().values_list("id", flat=True)

    books = Book.objects.exclude(id__in=books_in_library).order_by('?')[:count]

    book_list = []
    for book in books:
        book_list.append({"book_id": book.id, "book_title": book.title,
                          "book_author": book.author, "book_pub_date": book.pub_date})

    return Response({"status": "ok", "message": "Got random books", "book_list": book_list}, status=status.HTTP_200_OK)

@api_view(["GET"])
@input_validator(["book_id"])
@auth_validator
def is_read(request):
    """
    is_read

    Checks if book has been marked as read by user

    Input:
    user_id (int)
    book_id (int)

    Returns:
    has_read (bool)
    """ 
    try:
        book = Book.objects.get(id=request.GET["book_id"])
    except:
        return Response({"status": "ok", "message": "Book not found"}, status=status.HTTP_204_NO_CONTENT)
    try:
        bookdata = request.user.userbookmetadata_set.get(book = book)
    except:
        return Response({"status": "ok", "message": "Book not in library", "is_read": False}, status=status.HTTP_200_OK)
    return Response({"status": "ok", "message": "Success", "is_read": bookdata.has_read}, status=status.HTTP_200_OK)
    #return Response({"status": "ok", "message": "lah", "is_read": False}, status=status.HTTP_200_OK)

@api_view(["POST"])
@input_validator(["book_id", "has_read"])
@auth_validator
def set_read(request):
    """
    set_read

    Sets book to read or not read

    Input:
    user_id (int)
    book_id (int)
    has_read (bool)

    Returns:
    None
    """
    try:
        book = Book.objects.get(id=request.POST["book_id"])
    except ObjectDoesNotExist:
        return Response({"status": "error", "message": "Book not found"}, status=status.HTTP_204_NO_CONTENT)
    try:
        bookdata = request.user.userbookmetadata_set.get(book = book)
        if request.POST["has_read"].lower() == 'true':
            bookdata.has_read = True
        else:
            bookdata.has_read = False
        bookdata.save()
    except:
        return Response({"status": "error", "message": "Book is not in library"}, status=status.HTTP_200_OK)
    return Response({"status": "ok", "message": "Success", "is_read": bookdata.has_read}, status=status.HTTP_200_OK)

