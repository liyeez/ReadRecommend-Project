
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from api.models import Book, BookManager
from django.core import serializers


@api_view(["GET"])
def data(request):

    # Input validation
   # print(request.GET.get('isbn'), False)
    try:
        isbn = request.GET["isbn"]
       # print(isbn)
    except:
        return Response({"status": "error", "message": "Invalid request"}, status=status.HTTP_400_BAD_REQUEST)
    if isbn == '':
        return Response({"status": "error", "message": "Fields cannot be blank"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        Book.objects.get(pk=isbn)
    except:
        return Response({"status": "error", "message": "Isbn not found"}, status=status.HTTP_200_OK)
    # print(bookData.title)
    book_data_json = serializers.serialize(
        'json', Book.objects.filter(pk=isbn))
    return Response({"status": "ok", "message": "Isbn found success", "data": book_data_json}, status=status.HTTP_200_OK)
