# Authentication handler

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .input_validator import input_validator

from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token


@api_view(["POST"])
@input_validator("POST", ["email", "first_name", "last_name", "password"])
def signup(request):
    """
    Signup

    Stored as regular user but we just always make username = email

    Takes:
    email (str)
    first_name (str)
    last_name (str)
    password (str)

    Returns:
    token (str)
    """
    # Check that the email (username) is unique
    if User.objects.filter(username=request.POST["email"]).exists():
        return Response({"status": "error", "message": "Username already taken"}, status=status.HTTP_409_CONFLICT)

    # Create the user object and set the data fields
    user = User.objects.create_user(
        request.POST["email"], first_name=request.POST["first_name"], last_name=request.POST["last_name"], email=request.POST["email"])
    user_id = user.id
    user.set_password(request.POST["password"])
    user.save()

    # Get the token
    token, _ = Token.objects.get_or_create(user=user)

    return Response({"status": "ok", "message": "User Successfully Created", "id": user_id, "token": token.key}, status=status.HTTP_200_OK)


@api_view(["POST"])
@input_validator("POST", ["email", "password"])
def signin(request):
    """
    Signin

    Return a token

    Takes:
    email (str)
    password (str)

    Returns:
    token (str)
    """
    # Try to log in and generate/get a token
    user = authenticate(request, username=request.POST["email"], password=request.POST["password"])
    if user is not None:
        user_id = user.id
        token, _ = Token.objects.get_or_create(user=user)
        return Response({"status": "ok", "message": "User successfully logged in", "id": user_id, "token": token.key}, status=status.HTTP_200_OK)
    else:
        return Response({"status": "error", "message": "Could not log in"}, status=status.HTTP_401_UNAUTHORIZED)
