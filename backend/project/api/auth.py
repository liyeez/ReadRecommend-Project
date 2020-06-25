# Authentication handler

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework import status


from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.contrib.auth.forms import UserCreationForm


@api_view(["POST"])
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
    # Input validation
    try:
        email = request.POST["email"]
        first_name = request.POST["first_name"]
        last_name = request.POST["last_name"]
        password = request.POST["password"]
    except:
        return Response({"status": "error", "message": "Invalid request"}, status=status.HTTP_400_BAD_REQUEST)

    if email == "" or first_name == "" or last_name == "" or password == "":
        return Response({"status": "error", "message": "Fields cannot be blank"}, status=status.HTTP_400_BAD_REQUEST)

    # Create the user object and set the data fields
    user = User.objects.create_user(
        email, first_name=first_name, last_name=last_name, email=email)
    user.set_password(password)
    user.save()

    # Get the token
    token, _ = Token.objects.get_or_create(user=user)

    return Response({"status": "ok", "message": "User Successfully Created", "token": token.key}, status=status.HTTP_200_OK)


@api_view(["POST"])
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
    # Input validation
    try:
        email = request.POST["email"]
        password = request.POST["password"]
    except:
        return Response({"status": "error", "message": "Invalid request"}, status=status.HTTP_400_BAD_REQUEST)

    # Try to log in and generate/get a token
    user = authenticate(request, username=email, password=password)
    if user is not None:
        token, _ = Token.objects.get_or_create(user=user)
        return Response({"status": "ok", "message": "User successfully logged in", "token": token.key}, status=status.HTTP_200_OK)
    else:
        return Response({"status": "error", "message": "Could not log in"}, status=status.HTTP_401_UNAUTHORIZED)
