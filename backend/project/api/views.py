from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(["GET"])
def hello_world(request):
    if request.method == "GET":
        # return Response("Hello World")
        return Response({"name": "test"})


@api_view(["GET"])
def hello_name_get(request, name: str):
    if request.method == "GET":
        return Response(f"Hello {name}")

@api_view(["POST"])
def hello_name_post(request):
    if request.method == "POST":
        try:
            name = request.POST["name"]
            return Response(f"Hello {name}")
        except:
            return Response(f"Error: Invalid request format")

@api_view(["GET"])
def signup(request):
    if request.method == "GET":
        # return Response("Hello World")
        return Response({"name": "test"})
