from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from api.models import Collection, Book
from django.core import serializers
from .utilities import input_validator

@api_view(["GET"])
@input_validator(["collection_id"])
def view_collection(request): #given collection id returns collection data
    try: #check collection exists
        c_id = request.GET["collection_id"]
        Collection.objects.get(pk=c_id)
    except:
        return Response({"status": "error", "message": "Collection not found"}, status=status.HTTP_200_OK)
    collection_json = serializers.serialize(
        'json', Collection.objects.filter(pk=c_id))
    return Response({"status": "ok", "message": "Collection data delivered", "data": collection_json}, status=status.HTTP_200_OK)


@api_view(["GET"])
@input_validator(["collection_id", "isbn"])
def add_title(request): #given collection_id and isbn, adds book to collection
    try: #check collection exists
        c_id = request.GET["collection_id"]
        c = Collection.objects.get(pk=c_id)
    except:
        return Response({"status": "error", "message": "Collection not found"}, status=status.HTTP_200_OK)
    try: #check book exists
        isbn = request.GET["isbn"]
        book = Book.objects.get(pk = isbn)
    except:
        return Response({"status": "error", "message": "Book not found"}, status=status.HTTP_200_OK)
    try: #check if book already in collection
        c.books.get(pk = isbn)
        return Response({"status": "error", "message": "Book is already in collection"}, status=status.HTTP_200_OK)
    except:
        c.books.add(book)
        c.save()
        collection_json = serializers.serialize(
            'json', Collection.objects.filter(pk=c_id))
        return Response({"status": "ok", "message": "Book added to collection", "data": collection_json}, status=status.HTTP_200_OK)

@api_view(["GET"])
@input_validator(["collection_id", "isbn"])
def delete_title(request): #given collection_id and isbn, removes book from collection
    try:
        c_id = request.GET["collection_id"]
        c = Collection.objects.get(pk=c_id)
    except:
        return Response({"status": "error", "message": "Collection not found"}, status=status.HTTP_200_OK)
    try:
        isbn = request.GET["isbn"]
        book = Book.objects.get(pk = isbn)
    except:
        return Response({"status": "error", "message": "Book not found"}, status=status.HTTP_200_OK)
    try: #error if book already in collection
        c.books.get(pk = isbn)
        c.books.remove(book)
        c.save()
        collection_json = serializers.serialize(
            'json', Collection.objects.filter(pk=c_id))
        return Response({"status": "ok", "message": "Book removed from collection", "data": collection_json}, status=status.HTTP_200_OK)
    except:
        return Response({"status": "error", "message": "Book is not in collection"}, status=status.HTTP_200_OK)
