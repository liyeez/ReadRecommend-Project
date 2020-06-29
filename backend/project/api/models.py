from django.db import models
from django.utils import timezone
import datetime


class BookManager(models.Manager):
    def create_book(self, title, author, isbn, pub_date):
        book = self.create(title=title, author=author,
                           isbn=isbn, pub_date=pub_date)
        # do something with the book
        return book

    # def get_reviews(isbn):
    #


class Book(models.Model):
    cover = models.CharField(max_length=128)
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    isbn = models.CharField(max_length=13, primary_key=True)
    pub_date = models.DateField()
    objects = BookManager()



# Collection
class Collection(models.Model):
    collection_id = models.AutoField(primary_key=True, unique=True)
    owner = models.IntegerField()




# User profile
class ProfileManager(models.Manager):
    def create_profile(self, user_id):
        profile = self.create(user_id=user_id, library=1)

class Profile(models.Model):
    user_id = models.IntegerField(primary_key=True, unique=True)
    library = models.IntegerField()
    collections = models.ForeignKey(Collection, on_delete=models.CASCADE)

    objects = ProfileManager()

    class Meta:
        ordering = ["user_id"]
