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
