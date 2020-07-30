"""
Utilities
"""

from typing import List

from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.utils.datastructures import MultiValueDictKeyError

def input_validator(fields: List[str]):
    """
    Validates requests to make sure they meet the spec
    Ensures all fields are in the request and they are non empty

    fields List[str]: List of field names
    """
    def decorator_input_validator(func):
        def wrapper(request):
            # Perform input validation
            if request.method == "POST":
                request_dict = request.POST
            elif request.method == "GET":
                request_dict = request.GET
            else:
                try:
                    return func(request)
                except Exception as ex:
                    return Response({"status": "system_error", "message": ex}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            for key in fields:
                if key not in request_dict:
                    return Response({"status": "error", "message": "Missing request fields"}, status=status.HTTP_400_BAD_REQUEST)
            
            try:
                return func(request)
            except Exception as ex:
                return Response({"status": "system_error", "message": ex.args[0]}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return wrapper

    return decorator_input_validator


def auth_validator(func):
    """
    Validates authentication token (auth)

    Decorated function will receive a response with an additional user property
    If the token is invalid, the decorator will send a 401 response and return immediately
    """
    def wrapper(request):
        try:
            if request.method == "POST":
                key = request.POST["auth"]
                user = Token.objects.get(key=request.POST["auth"]).user
            elif request.method == "GET":
                user = Token.objects.get(key=request.GET["auth"]).user
            else:
                return Response({"status": "system_error", "message": "Invalid method for auth validation - backend programmer screwed up"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except ObjectDoesNotExist:
            return Response({"status": "error", "message": "Invalid auth token"}, status=status.HTTP_401_UNAUTHORIZED)
        except MultiValueDictKeyError:
            return Response({"status": "error", "message": "Missing auth token"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as ex:
            return Response({"status": "system_error", "message": ex.args[0]}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        request.user = user
        return func(request)

    return wrapper

def user_validator(func):
    """
    Validates user id (user_id)

    Decorated function will receive a response with an additional user property
    If the user is invalid, the decorator will send a 401 response and return immediately
    """
    def wrapper(request):
        try:
            if request.method == "POST":
                user = User.objects.get(id=request.POST["user_id"])
            elif request.method == "GET":
                user = User.objects.get(id=request.GET["user_id"])
            else:
                return Response({"status": "system_error", "message": "Invalid method for auth validation - backend programmer screwed up"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except ObjectDoesNotExist:
            return Response({"status": "error", "message": "Invalid user"}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as ex:
            return Response({"status": "system_error", "message": ex.args[0]}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        request.user = user
        return func(request)

    return wrapper
