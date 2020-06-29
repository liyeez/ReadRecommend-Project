from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from api.models import Collection, Book
from django.core import serializers

@api_view(["GET"])
def view_collection(request): #given collection id returns collection data
    try:
        c_id = request.GET["collection_id"]
    except:
        return Response({"status": "error", "message": "Invalid request"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        collection = Collection.objects.get(pk=c_id)
        book_list = []
        for b in collection.books.all():
            book_list.append({"book_id": b.isbn, "book_title": b.title});

    except:
        return Response({"status": "error", "message": "Collection not found"}, status=status.HTTP_200_OK)
    #collection_json = serializers.serialize('json', Collection.objects.filter(pk=c_id))
    return Response({"status": "ok", "message": "Collection data delivered", "books": book_list, "collection_title": collection.name}, status=status.HTTP_200_OK)

@api_view(["GET"])
def add_title(request): #given collection_id and isbn, adds book to collection
    try: 
        c_id = request.GET["collection_id"]
        isbn = request.GET["isbn"]
    except:
        return Response({"status": "error", "message": "Invalid request"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        c = Collection.objects.get(pk=c_id)
    except:
        return Response({"status": "error", "message": "Collection not found"}, status=status.HTTP_200_OK)
    try:
        book = Book.objects.get(pk = isbn)
    except:
        return Response({"status": "error", "message": "Book not found"}, status=status.HTTP_200_OK)
    try: #error if book already in collection
        c.books.get(pk = isbn)
        return Response({"status": "error", "message": "Book is already in collection"}, status=status.HTTP_200_OK)
    except:
        c.books.add(book)
        c.save()
        collection_json = serializers.serialize(
            'json', Collection.objects.filter(pk=c_id))
        return Response({"status": "ok", "message": "Book added to collection", "data": collection_json}, status=status.HTTP_200_OK)

@api_view(["GET"])
def delete_title(request): #given collection_id and isbn, removes book from collection
    try: 
        c_id = request.GET["collection_id"]
        isbn = request.GET["isbn"]
        print("isbn "+ isbn)
    except:
        return Response({"status": "error", "message": "Invalid request"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        c = Collection.objects.get(pk=c_id)
    except:
        return Response({"status": "error", "message": "Collection not found"}, status=status.HTTP_200_OK)
    try:
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
