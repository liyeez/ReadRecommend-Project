import json
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ObjectDoesNotExist

from django.db.models import Q
from .models import Book, BookInstance, BookStats, Review, Collection
from .utilities import input_validator, auth_validator
from datetime import datetime
import requests
import base64


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
    book_cover (str)
    book_author (str)
    book_genre (str)
    book_description (str)
    book_pub_date (datetime)
    """
    try:
        book = Book.objects.get(id=request.GET["id"])
    except ObjectDoesNotExist:
        return Response({"status": "error", "message": "Book not found"}, status=status.HTTP_204_NO_CONTENT)

    book_stats = BookStats.objects.filter(book=book).first()
    if book_stats:
        BookStats.objects.update_all()
        return Response({"status": "ok", "message": "Got book data", "book_id": book.id, "book_title": book.title, "book_cover": book.cover, "book_author": book.author, "book_genre": book.genre, "book_description": book.description, "book_pub_date": book.pub_date, "last_review_id": 3, "average_rating": book_stats.average_rating, "n_reviews": book_stats.total_ratings, "n_readers": book_stats.read_count, "n_collections": book_stats.collection_count}, status=status.HTTP_200_OK)
    else:
        return Response({"status": "ok", "message": "Got book data", "book_id": book.id, "book_title": book.title, "book_cover": book.cover, "book_author": book.author, "book_genre": book.genre, "book_description": book.description, "book_pub_date": book.pub_date, "last_review_id": 3}, status=status.HTTP_200_OK)






@api_view(["GET"])
def filter(request):

    books = Book.objects.all()

    filters = ['average_rating','total_ratings','read_count','collection_count']
    BookStats.objects.update_all()

    for f in [x for x in filters if x in request.GET]:
        for b in books:
            book_stat = BookStats.objects.filter(book=b).first()
            if not book_stat:
                books = books.exclude(id=b.id)
            elif getattr(book_stat,f) <= int(request.GET[f]):              
                books = books.exclude(id=b.id)

    book_list = []
    for book in books.all():
        stats = BookStats.objects.filter(book=book).first()
        book_list.append({"book_id": book.id, "book_title": book.title,
                        "book_author": book.author, "book_pub_date": book.pub_date,
                        "average_review": stats.average_rating,"n_reviews": stats.total_ratings,"n_collections":stats.collection_count, "n_readers": stats.read_count})


    if len(book_list) > 0:
        message = "Got matching books"
    else:
        message = "No matches found"

    return Response({"status": "ok", "message": message, "book_list": book_list}, status=status.HTTP_200_OK)






@api_view(["GET"])
@input_validator(["search"])
def search(request):
    """
    search

    Gets all books matching a search string for title/author

    Input:
    search (str)
    opt filter (str)
    Returns:
    book_list (list):
        book_id (int)
        book_title (str)
        book_author (str)
    """
    if 'search' in request.GET:
        search = request.GET["search"]
        books = Book.objects.filter(
            Q(title__icontains=search) | Q(author__contains=search))
    else:
        books = Book.objects.all()

    if 'genre' in request.GET:
        books = books.filter(genre=request.GET['genre'])

    filters = ['average_rating','total_ratings','read_count','collection_count']
    BookStats.objects.update_all()

    for f in [x for x in filters if x in request.GET]:
        for b in books:
            book_stat = BookStats.objects.filter(book=b).first()
            if not book_stat:
                books = books.exclude(id=b.id)
            elif getattr(book_stat,f) <= int(request.GET[f]):              
                books = books.exclude(id=b.id)

    book_list = []
    for book in books.all():
        stats = BookStats.objects.filter(book=book).first()
        book_list.append({"book_id": book.id, "book_title": book.title,
                        "book_author": book.author, "book_pub_date": book.pub_date,
                        "average_review": stats.average_rating,"n_reviews": stats.total_ratings,"n_collections":stats.collection_count, "n_readers": stats.read_count})


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
        bookdata = request.user.userbookmetadata_set.get(book=book)
    except:
        return Response({"status": "ok", "message": "Book not in library", "is_read": False}, status=status.HTTP_200_OK)
    return Response({"status": "ok", "message": "Success", "is_read": bookdata.has_read}, status=status.HTTP_200_OK)

@api_view(["POST"])
@input_validator(["book_id"])
@auth_validator
def set_read(request):
    """
    set_read

    toggle book has_read variable

    Input:
    user_id (int)
    book_id (int)

    Returns:
    None
    """
    try:
        book = Book.objects.get(id=request.POST["book_id"])
    except ObjectDoesNotExist:
        return Response({"status": "error", "message": "Book not found"}, status=status.HTTP_204_NO_CONTENT)
    try:
        bookdata = request.user.userbookmetadata_set.get(book=book)
    except:
        return Response({"status": "error", "message": "Book is not in library"}, status=status.HTTP_200_OK)
    
    if bookdata.has_read == False: 
        bookdata.has_read = True
        bookdata.date_read = datetime.now().date()
        try:
            goal = request.user.goal_set.get(current = True)
            if goal.is_active():
                goal.book_count += 1
                goal.save()
        except:
            pass
    elif bookdata.has_read == True:
        bookdata.has_read = False
        prev_date = bookdata.date_read
        bookdata.date_read = None
        try:
            goal = request.user.goal_set.get(current = True)
            if goal.is_active() and goal.date_start<= prev_date and goal.date_end >= prev_date:
                goal.book_count -= 1
                goal.save()
        except:
            pass
    bookdata.save()
    
    return Response({"status": "ok", "message": "Success", "is_read": bookdata.has_read}, status=status.HTTP_200_OK)


@api_view(["POST"])
@input_validator(["book_title", "book_author", "book_genre", "book_description", "book_isbn", "book_cover", "book_pub_date"])
@auth_validator
def add_book(request):
    """
    add_book

    Adds a book instance and book (if necessary) to the system.

    Input:
    auth (str)
    book_title (str)
    book_author (str)
    book_genre (str)
    book_description (str)
    book_isbn (str)
    book_cover (str)
    book_pub_date (datetime)

    Returns:
    """
    try:
        book_inst = BookInstance.objects.get(isbn=request.POST["book_isbn"])
        return Response({"status": "error", "message": "Book already exists", "book_id": book_inst.book.id}, status=status.HTTP_200_OK)
    except ObjectDoesNotExist:
        pass

    try:    
        book_instance = BookInstance.objects.create_book(request.POST["book_title"], request.POST["book_author"], request.POST["book_genre"], request.POST["book_description"], request.POST["book_isbn"], request.POST["book_pub_date"], request.POST["book_cover"])
        return Response({"status": "ok", "message": "Book added to system", "book_id": book_instance.book.id}, status=status.HTTP_200_OK)
    except:
        return Response({"status": "error", "message": "Fail to create book in system"}, status=status.HTTP_200_OK)

    
@api_view(["GET"])
@input_validator(["search"])
@auth_validator
def search_book(request):
    """
    search_book

    Looks for books externally

    Input:
    search (str)
    (opt) index (int)

    Returns:
    book_list (list):
        book_title (str)
        book_author (str)
        book_genre (str)
        book_description (str)
        book_isbn (str)
        book_cover (str)
        book_pub_date (datetime)
    current_index (int) [the index for the next search result]
    """
    try:
        index = int(request.GET["index"])
    except:
        index = 0

    API_ENDPOINT = "https://www.googleapis.com/books/v1/volumes"
    payload = {"q": request.GET["search"], "startIndex": index}
    r = requests.get(API_ENDPOINT, params=payload)

    results = []
    for match in r.json()["items"]:
        book = {}
        book["book_title"] = ""
        book["book_author"] = ""
        book["book_description"] = ""
        book["book_genre"] = ""
        book["book_isbn"] = "0000000000"
        book["cover"] = ""
        book["book_pub_date"] = ""
        # Sometimes these fields are missing
        try:
            book["book_title"] = match["volumeInfo"]["title"]
            book["book_author"] = match["volumeInfo"]["authors"][0]
            book["book_description"] = match["volumeInfo"]["description"]
            book["book_genre"] = ",".join(match["volumeInfo"]["categories"])
            book["cover"] = match["volumeInfo"]["imageLinks"]["thumbnail"]
            book["book_pub_date"] = match["volumeInfo"]["publishedDate"]
        except:
            pass
        # Look for isbn
        # json doesnt guarantee list order so loop through the possibilities
        for identifier in match["volumeInfo"]["industryIdentifiers"]:
            if identifier["type"] == "ISBN_10":
                book["book_isbn"] = identifier["identifier"]
        results.append(book)
        
    if len(results) > 0:
        return Response({"status": "ok", "message": "Success", "results": results, "current_index": index + len(results)}, status=status.HTTP_200_OK)
    else:
        return Response({"status": "ok", "message": "No matches", "results": [], "current_index": index}, status=status.HTTP_200_OK)

@api_view(["GET"])
@input_validator(["book_id"])
@auth_validator
def readers(request):
    try:
        book = Book.objects.get(id=request.GET["book_id"])
    except:
        return Response({"status": "error", "message": "Book not found"}, status=status.HTTP_200_OK)
    book_id = request.GET["book_id"]
    user_library = request.user.collection_set.get(library=True)
    library_id = user_library.pk
    libraries = Collection.objects.filter(library=True).exclude(pk = library_id)
    suggestions = {} #book suggestions
    for library in libraries:
        try:
            library.books.get(id = book_id)
            for book in library.books.all():
                if book.id != int(book_id) and book not in user_library.books.all():
                    if book in suggestions:
                        suggestions[book] += 1
                    else:
                        suggestions[book] = 1
        except:
            pass
    sort = sorted(suggestions.items(), key=lambda x: x[1], reverse=True)
    book_list = []
    count = 0
    for item in sort:
        count += 1
        if count > 12:
            break
        book = item[0]
        stats = BookStats.objects.filter(book=book).first()
        if stats:
            book_list.append({"book_id": book.id, "book_title": book.title,
                        "book_author": book.author, "book_pub_date": book.pub_date,
                        "average_review": stats.average_rating,"n_reviews": stats.total_ratings,"n_collections":stats.collection_count, "n_readers": stats.read_count})
        else:
            book_list.append({"book_id": book.id, "book_title": book.title,
                        "book_author": book.author, "book_pub_date": book.pub_date,
                        "average_review": 0,"n_reviews": 0,"n_collections":0, "n_readers": 0})
    return Response({"status": "ok", "message": "Books retrieved", "book_list": book_list}, status=status.HTTP_200_OK)

@api_view(["GET"])
@auth_validator
def recommendations(request):
    user_library = request.user.collection_set.get(library=True)
    genres = {}
    for book in user_library.books.all():
        if book.genre in genres:
            genres[book.genre] += 1
        else:
            genres[book.genre] = 1
    sort = sorted(genres.items(), key=lambda x: x[1], reverse=True)
    genre = sort[0][0]
    books = Book.objects.filter(genre = genre)
    book_list = []
    count = 0
    for book in books:
        count += 1
        if count > 12:
            break
        if book not in user_library.books.all():
            stats = BookStats.objects.filter(book=book).first()
            if stats:
                book_list.append({"book_id": book.id, "book_title": book.title,
                            "book_author": book.author, "book_pub_date": book.pub_date,
                            "average_review": stats.average_rating,"n_reviews": stats.total_ratings,"n_collections":stats.collection_count, "n_readers": stats.read_count})
            else:
                book_list.append({"book_id": book.id, "book_title": book.title,
                            "book_author": book.author, "book_pub_date": book.pub_date,
                            "average_review": 0,"n_reviews": 0,"n_collections":0, "n_readers": 0})


    return Response({"status": "ok", "message": "Genre found", "Most_genre": genre, "book_list": book_list}, status=status.HTTP_200_OK)


#
#
#@api_view(["GET"])
#@input_validator(["id"])
#def stats(request):
#    """
#    data
#
#    Retrieves complete book stats
#
#    Input:
#    id (int)
#
#    Returns:
#
#    """
#    try:
#        book = Book.objects.get(id=request.GET["id"])
#    except ObjectDoesNotExist:
#        return Response({"status": "error", "message": "Book not found"}, status=status.HTTP_204_NO_CONTENT)
#
#    try:
#        book_stats = BookStats.objects.get(book=book)
#    except ObjectDoesNotExist:
#        return Response({"status": "error", "message": "Book stats not found"}, status=status.HTTP_204_NO_CONTENT)
#
#    BookStats.objects.update_all()
#
#    return Response({"status": "ok", "message": "Got book stats", "book_average": book_stats.average_rating, "book_total_ratings": book_stats.total_ratings, "book_read_count": book_stats.read_count, "book_collection_count": book_stats.collection_count}, status=status.HTTP_200_OK)
#
#