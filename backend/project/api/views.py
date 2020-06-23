from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import APIException

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

@api_view(["POST"])
def signup(request):
    try:
        first_name = request.POST["first_name"]
        last_name = request.POST["last_name"]
        email = request.POST["email"]
        password = request.POST["password"]
        return Response({"id": 123, "token": "first" + first_name + "last" + last_name + "email" + email + "password" + password})
    except:
        raise APIException()

@api_view(["POST"])
def signin(request):
    try:
        email = request.POST["email"]
        password = request.POST["password"]
        return Response({"id": 123, "token": "email" + email + "password" + password})
    except:
        raise APIException()
