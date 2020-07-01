from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from api.models import Collection, Book, Tag, MAX_STR_LEN, User
from django.core import serializers
from .utilities import auth_validator, input_validator
from django.contrib.auth.models import User

@api_view(["POST"])
@auth_validator
@input_validator(["collection_name"])
def create_collection(request): #given user id returns creates empty collection, returns collection_id
    user = request.user
    if(len(request.POST["collection_name"])> MAX_STR_LEN):
        return Response({"status": "error", "message": "Name too long"}, status=status.HTTP_200_OK)
    
    collection = Collection.objects.create_collection(name = request.POST["collection_name"], user = user)

    return Response({"status": "ok", "message": "Collection successfully added", "collection_id": collection.collection_id}, status=status.HTTP_200_OK)

@api_view(["POST"])
@auth_validator
@input_validator(["collection_id"])
def delete_collection(request): #given user id returns creates empty collection, returns collection_id
    user = request.user
    try:
        collection = user.collection_set.get(collection_id=request.POST["collection_id"]) 
    except:
        return Response({"status": "error", "message": "invalid collection"}, status=status.HTTP_200_OK)

    if(collection.library):
        return Response({"status": "error", "message": "Cannot delete library"}, status=status.HTTP_200_OK)

    collection.delete()
    return Response({"status": "ok", "message": "Collection successfully deleted"}, status=status.HTTP_200_OK)


@api_view(["GET"])
@input_validator(["collection_id"])
def view_collection(request): #given collection id returns collection name, tag list, book list
    try: #check collection exists
        collection = Collection.objects.get(collection_id=request.GET["collection_id"])
    except:
        return Response({"status": "error", "message": "Collection not found"}, status=status.HTTP_200_OK)
    
    tag_list = []
    for tag in collection.tags.all():
        tag_list.append({'tag': tag.name})

    book_list = []
    for book in collection.books.all():
        book_list.append({"isbn": book.isbn, "title": book.title})
    return Response({"status": "ok", "message": "Collection data delivered",
     "collection_name": collection.name, "book_list":book_list, "tag_list":tag_list}, status=status.HTTP_200_OK)

@api_view(["POST"])
@auth_validator
@input_validator(["collection_id", "isbn"])
def add_title(request): #given collection_id and isbn, adds book to collection, returns new book list
    try: #check collection exists
        collection = request.user.collection_set.get(collection_id=request.POST["collection_id"])
    except:
        return Response({"status": "error", "message": "Collection not found"}, status=status.HTTP_200_OK)
    try: #check book exists
        isbn = request.POST["isbn"]
        book = Book.objects.get(isbn=isbn)
    except:
        return Response({"status": "error", "message": "Book not found"}, status=status.HTTP_200_OK)
    try: #check if book already in collection
        collection.books.get(isbn=isbn)
        return Response({"status": "error", "message": "Book is already in collection"}, status=status.HTTP_200_OK)
    except:
        collection.books.add(book)
        collection.save()

        # Add to library if it is not in there already
        library = collection.user.collection_set.get(library=True)
        if book not in library.books.all():
            library.books.add(book)
            library.save()

        return Response({"status": "ok", "message": "Book added to collection"}, status=status.HTTP_200_OK)

@api_view(["POST"])
@auth_validator
@input_validator(["isbn"])
def add_to_library(request):
    library = request.user.collection_set.get(library=True)
    try: #check book exists
        isbn = request.POST["isbn"]
        book = Book.objects.get(isbn=isbn)
    except:
        return Response({"status": "error", "message": "Book not found"}, status=status.HTTP_200_OK)
    try: #check if book already in collection
        library.books.get(isbn=isbn)
        return Response({"status": "error", "message": "Book is already in library"}, status=status.HTTP_200_OK)
    except:
        library.books.add(book)
        library.save()
    return Response({"status": "ok", "message": "Book added to library"}, status=status.HTTP_200_OK)


@api_view(["POST"])
@auth_validator
@input_validator(["isbn"])
def delete_from_library(request):
    # Check the book is real first
    try:
        book = Book.objects.get(isbn=request.POST["isbn"])
    except:
        return Response({"status": "error", "message": "Book not found"}, status=status.HTTP_204_NO_CONTENT)
    
    count = 0

    collections = request.user.collection_set.all()
    for collection in collections:
        try:
            matching_books = collection.books.get(isbn=request.POST["isbn"])
            collection.books.remove(matching_books)
            collection.save()
            count += 1
        except:
            pass

    if count == 0:
        return Response({"status": "error", "message": "Book is not in library"}, status=status.HTTP_204_NO_CONTENT)
    else:
        return Response({"status": "ok", "message": "Book removed from library"}, status=status.HTTP_200_OK)

@api_view(["POST"])
@auth_validator
@input_validator(["collection_id", "isbn"])
def delete_title(request): #given collection_id and isbn, removes book from collection
    try:
        collection = request.user.collection_set.get(collection_id=request.POST["collection_id"])
    except:
        return Response({"status": "error", "message": "Collection not found"}, status=status.HTTP_200_OK)
    try:
        isbn = request.POST["isbn"]
        book = Book.objects.get(isbn=isbn)
    except:
        return Response({"status": "error", "message": "Book not found"}, status=status.HTTP_200_OK)
    try: #error if book already in collection
        collection.books.get(isbn=isbn)
        collection.books.remove(book)
        collection.save()
        return Response({"status": "ok", "message": "Book removed from collection"}, status=status.HTTP_200_OK)
    except:
        return Response({"status": "error", "message": "Book is not in collection"}, status=status.HTTP_200_OK)

@api_view(["POST"])
@input_validator(["collection_id", "collection_name"])
def rename(request): #given collection_id and new collection name, renames collection
                    #returns collection name
    try:
        collection = Collection.objects.get(collection_id=request.POST["collection_id"])
    except:
        return Response({"status": "error", "message": "Collection not found"}, status=status.HTTP_200_OK)
    name = request.POST["collection_name"]
    if(len(name)> MAX_STR_LEN):
        return Response({"status": "error", "message": "Name too long"}, status=status.HTTP_200_OK)
    collection.name = name
    collection.save()

    return Response({"status": "ok", "message": "Collection successfully renamed"}, status=status.HTTP_200_OK)

@api_view(["POST"])
@input_validator(["collection_id", "tag_label"])
def add_tag(request): #given collection id and tag label, adds tag to collection
                    #returns collection name, tag list and book list.
    try:
        collection = Collection.objects.get(collection_id=request.POST["collection_id"])
    except:
        return Response({"status": "error", "message": "Collection not found"}, status=status.HTTP_200_OK)
    tag_label = request.POST["tag_label"]
    try:
        tag = Tag.objects.get(name=tag_label)
    except:
        tag = Tag.objects.create(name=tag_label)

    try:
        collection.tags.get(name=tag_label)
        return Response({"status": "error", "message": "Collection already has this tag"}, status=status.HTTP_200_OK)
    except:
        collection.tags.add(tag)
        collection.save()
    return Response({"status": "ok", "message": "Tag successfully added to collection"}, status=status.HTTP_200_OK)

@api_view(["POST"])
@input_validator(["collection_id", "tag_label"])
def delete_tag(request): #given collection id and tag label, removes tag from collection
                    #returns collection name, tag list and book list.
    try:
        collection = Collection.objects.get(collection_id=request.POST["collection_id"])
    except:
        return Response({"status": "error", "message": "Collection not found"}, status=status.HTTP_200_OK)
    tag_label = request.POST["tag_label"]
    try:
        tag = Tag.objects.get(name=tag_label)
    except:
        return Response({"status": "error", "message": "Tag not found"}, status=status.HTTP_200_OK)

    try:
        collection.tags.get(name=tag_label)
        collection.tags.remove(tag)
        collection.save()
        return Response({"status": "ok", "message": "Tag successfully removed from collection"}, status=status.HTTP_200_OK)

    except:
        return Response({"status": "error", "message": "Collection does not have this tag"}, status=status.HTTP_200_OK)

@api_view(["GET"])
@input_validator(["collection_id"])
def get_tags(request):
    try:
        collection = Collection.objects.get(collection_id=request.GET["collection_id"])
    except:
        return Response({"status": "error", "message": "Collection not found"}, status=status.HTTP_200_OK)

    tags = collection.tags.all()

    tag_list = []
    for tag in tags:
        tag_list.append({"tag_label": tag.name})

    if len(tag_list) == 0:
        return Response({"status": "ok", "message": "Collection has no tags"}, status=status.HTTP_200_OK)
    else:
        return Response({"status": "ok", "message": "Got tags", "tag_list": tag_list}, status=status.HTTP_200_OK)
