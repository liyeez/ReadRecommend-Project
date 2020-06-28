from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from api.models import Collection
from django.core import serializers

@api_view(["GET"])
def get_collection(request):

    collection_id = request.GET['collection_id']

    if collection_id:
    	if(Collection.objects.filter(pk = collection_id)).exists():
    		collection = Collection.objects.get(pk = collection_id)
    		collection_data = serializers.serialize('json', collection)
    	return Response({"status": "ok", "message": "Collection data delivered", "data": collection_data}, status=status.HTTP_200_OK)
    else:
    	return Response({"status": "error", "message": "Invalid request"}, status=status.HTTP_400_BAD_REQUEST)

