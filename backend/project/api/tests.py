from django.test import TestCase, Client
from api.models import *
import datetime

# Create your tests here.

class CollectionTestCase(TestCase):
	def setUp(self):
		
		Collection.objects.create(name = "collection1")
		Collection.objects.create(name = "collection2")
		Book.objects.create(title = "Harry Potter", isbn = "1", pub_date = datetime.date(2020, 6, 28))
		Book.objects.create(title = "Book", isbn = "2", pub_date = datetime.date(2020, 6, 28))

	def test_add_books(self):
		one = Collection.objects.get(name = "collection1")
		two = Collection.objects.get(name = "collection2")
		hp = Book.objects.get(pk = "1")
		b = Book.objects.get(pk = "2")
		one.books.add(hp)
		one.books.add(b)
		two.books.add(hp)
		print("Collection 1: "+ str(one.books.all()))
		print("Collection 2: "+ str(two.books.all()))

	def test_get_collection(self):
		c = Client()
		one = Collection.objects.get(name = "collection1")
		two = Collection.objects.get(name = "collection2")
		hp = Book.objects.get(pk = "1")
		b = Book.objects.get(pk = "2")
		one.books.add(hp)
		one.books.add(b)
		two.books.add(hp)
		response = c.get('/user/viewcollection', {'collection_id': 1})
		print(response.status_code)


