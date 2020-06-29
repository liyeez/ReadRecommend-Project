
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from django.db.models import Q
from .models import Book
from .utilities import input_validator

@api_view(["GET"])
@input_validator(["book_id"])
def data(request):
    """
    data

    Retrieves complete book metadata

    Input:
    book_id (int)

    Returns:
    book_title (str)
    book_cover (str): base64 encoded cover
    book_author (str)
    book_isbn (int)
    book_pub_date (datetime)
    """

    try:
        book = Book.objects.get(isbn=request.GET["book_id"])
    except:
        return Response({"status": "error", "message": "Book not found"}, status=status.HTTP_204_NO_CONTENT)

    book_title = book.title
    book_cover = book.cover
    book_author = book.author
    book_pub_date = book.pub_date

    return Response({"status": "ok", "message": "Got book data", "book_title": book_title, "book_cover": book_cover, "book_author": book_author, "book_pub_date": book_pub_date}, status=status.HTTP_200_OK)


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
    """
    search = request.GET["search"]

    books = Book.objects.filter(Q(title__icontains=search) | Q(author__contains=search))

    book_list = []
    for book in books.all():
        book_list.append({"book_id": book.isbn, "book_title": book.title})

    if len(book_list) > 0:
        message = "Got matching books"
    else:
        message = "No matches found"

    return Response({"status": "ok", "message": message, "book_list": book_list}, status=status.HTTP_200_OK)

@api_view(["GET"])
@input_validator(["number"])
def random(request):
    """
    random

    Retrieves a specified number of random books (<13) and their metadata

    Input:
    number (int)

    Returns:
    book_list (list):
        book_id (int)
        book_title (str)
    """
    number = int(request.GET["number"])

    if number > 12:
        return Response({"status": "error", "message": "Too many books"}, status=status.HTTP_416_REQUESTED_RANGE_NOT_SATISFIABLE)

    books = Book.objects.all().order_by('?')[:number]

    book_list = []
    for book in books:
        book_list.append({"book_id": book.isbn, "book_title": book.title})

    return Response({"status": "ok", "message": "Got matching books", "book_list": book_list}, status=status.HTTP_200_OK)
