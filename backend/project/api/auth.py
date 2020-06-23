from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import APIException

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
