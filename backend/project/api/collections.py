from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from api.models import Collection, Book, MAX_STR_LEN
from django.core import serializers
from .utilities import input_validator

@api_view(["GET"])
@input_validator(["collection_id"])
def view_collection(request): #given collection id returns collection name, and book list
    try: #check collection exists
        collection = Collection.objects.get(pk=request.GET["collection_id"])
    except:
        return Response({"status": "error", "message": "Collection not found"}, status=status.HTTP_200_OK)
    
    book_list = []
    for book in collection.books.all():
        book_list.append({"isbn": book.isbn, "title": book.title})
    return Response({"status": "ok", "message": "Collection data delivered",
     "collection_name": collection.name, "book_list":book_list}, status=status.HTTP_200_OK)


@api_view(["GET"])
@input_validator(["collection_id", "isbn"])
def add_title(request): #given collection_id and isbn, adds book to collection, returns new book list
    try: #check collection exists
        collection = Collection.objects.get(pk=request.GET["collection_id"])
    except:
        return Response({"status": "error", "message": "Collection not found"}, status=status.HTTP_200_OK)
    try: #check book exists
        isbn = request.GET["isbn"]
        book = Book.objects.get(pk = isbn)
    except:
        return Response({"status": "error", "message": "Book not found"}, status=status.HTTP_200_OK)
    try: #check if book already in collection
        collection.books.get(pk = isbn)
        return Response({"status": "error", "message": "Book is already in collection"}, status=status.HTTP_200_OK)
    except:
        collection.books.add(book)
        collection.save()

        book_list = []
        for book in collection.books.all():
            book_list.append({"isbn": book.isbn, "title": book.title})
        return Response({"status": "ok", "message": "Book added to collection", "book_list":book_list}, status=status.HTTP_200_OK)

@api_view(["GET"])
@input_validator(["collection_id", "isbn"])
def delete_title(request): #given collection_id and isbn, removes book from collection
    try:
        collection = Collection.objects.get(pk=request.GET["collection_id"])
    except:
        return Response({"status": "error", "message": "Collection not found"}, status=status.HTTP_200_OK)
    try:
        isbn = request.GET["isbn"]
        book = Book.objects.get(pk = isbn)
    except:
        return Response({"status": "error", "message": "Book not found"}, status=status.HTTP_200_OK)
    try: #error if book already in collection
        collection.books.get(pk = isbn)
        collection.books.remove(book)
        collection.save()
        book_list = []
        for book in collection.books.all():
            book_list.append({"isbn": book.isbn, "title": book.title})
        return Response({"status": "ok", "message": "Book removed from collection", "book_list":book_list}, status=status.HTTP_200_OK)
    except:
        return Response({"status": "error", "message": "Book is not in collection"}, status=status.HTTP_200_OK)

@api_view(["GET"])
@input_validator(["collection_id", "name"])
def rename(request): #given collection_id and isbn, removes book from collection
    try:
        collection = Collection.objects.get(pk=request.GET["collection_id"])
    except:
        return Response({"status": "error", "message": "Collection not found"}, status=status.HTTP_200_OK)
    name = request.GET["name"]
    if(len(name)> MAX_STR_LEN):
        return Response({"status": "error", "message": "Name too long"}, status=status.HTTP_200_OK)
    collection.name = name
    collection.save()

    return Response({"status": "ok", "message": "Collection successfully renamed", "collection_name":collection.name}, status=status.HTTP_200_OK)