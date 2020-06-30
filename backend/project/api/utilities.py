"""
Utilities
"""

from typing import List

from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token

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
                if request_dict[key] == "":
                    return Response({"status": "error", "message": "Blank key field (" + key + ")"}, status=status.HTTP_400_BAD_REQUEST)
            
            try:
                return func(request)
            except Exception as ex:
                return Response({"status": "system_error", "message": ex.args}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return wrapper

    return decorator_input_validator


def auth_validator(func):
    """
    Validates authentication token

    Decorated function will receive a response with an additional user property
    If the token is invalid, the decorator will send a 401 response and return immediatealy
    """
    def wrapper(response):
        try:
            if response.method == "POST":
                user = Token.objects.get(key=response.POST["auth"]).user
            elif response.method == "GET":
                user = Token.objects.get(key=response.GET["auth"]).user
            else:
                return Response({"status": "system_error", "message": "Invalid method for auth validation - backend programmer screwed up"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Token.DoesNotExist:
            return Response({"status": "error", "message": "Invalid auth token"}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as ex:
            return Response({"status": "system_error", "message": ex.args[0]}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        response.user = user
        return func(response)

    return wrapper
