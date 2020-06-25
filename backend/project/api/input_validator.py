"""
Decorator that validates requests
"""

from typing import List

from rest_framework.response import Response
from rest_framework import status

def input_validator(request_type: str, fields: List[str]):
    def decorator_input_validator(func):
        def wrapper(request):
            # Perform input validation
            if request_type == "POST":
                request_dict = request.POST
            elif request_type == "GET":
                request_dict = request.GET
            else:
                return func(request)
            
            for key in fields:
                if key not in request_dict:
                    return Response({"status": "error", "message": "Missing request fields"}, status=status.HTTP_400_BAD_REQUEST)
                if request_dict[key] == "":
                    return Response({"status": "error", "message": "Blank key field (" + key + ")"}, status=status.HTTP_400_BAD_REQUEST)
            
            return func(request)
        return wrapper

    return decorator_input_validator
