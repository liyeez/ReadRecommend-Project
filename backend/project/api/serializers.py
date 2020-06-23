from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model

# Required for custom user profiles which lets just not touch for now :/
# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ["username", "email", "first_name", "last_name", "password"]

#     def create(self, validated_data):
#         user = get_user_model(**validated_data)
#         user.set_password(validated_data["password"])
#         user.save()
#         return user
