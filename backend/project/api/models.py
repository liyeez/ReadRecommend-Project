from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from datetime import datetime

MAX_STR_LEN = 100
# These should really go in another python file but it works as is
# The ordering is messed up because of the relationships between the tables


class BookManager(models.Manager):
    def create_book(self, title, author, pub_date):
        book = self.filter(title__startswith='title').filter(author__startswith='author').get_or_create(
            id=Book.objects.count() + 1, title=title, author=author, pub_date=pub_date)
        return book


class Book(models.Model):
    id = models.IntegerField(primary_key=True)
    cover = models.CharField(max_length=128)
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    pub_date = models.DateField()
    objects = BookManager()

    # since this review and book instance are compositions of Book, we have these as Model methods rather than table methods

    def create_instance(self, isbn, pub_date):
        return BookInstance.objects.create_book(self.title, self.author, isbn, pub_date, self)

    def create_review(self, user, score, text):
        return Review.objects.create_review(self, user, score, text)


class BookInstanceManager(models.Manager):
    def create_book(self, title, author, isbn, pub_date, book):
        bookInstance = self.create(title=title, author=author,
                                   isbn=isbn, pub_date=pub_date, book=book)
        return bookInstance


class BookInstance(models.Model):
    isbn = models.CharField(primary_key=True, max_length=13)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    cover = models.CharField(max_length=128)
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    pub_date = models.DateField()

# Book review

class ReviewManager(models.Manager):
    def create_review(self, book, user, score, text):
        review = self.create(book=book, user=user, score=score, text=text)
        return review


class Review(models.Model):
    review_id = models.AutoField(primary_key=True, unique=True)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    score = models.IntegerField()
    text = models.CharField(max_length=1028)

    objects = ReviewManager()


# User profile
# Do we want to store bookinstance or Book in the collection?
class ProfileManager(models.Manager):
    def create_profile(self, user):
        full_name = user.first_name + " " + user.last_name
        profile = self.create(user=user, full_name=full_name)
        return profile


class Profile(models.Model):
    # Delete the profile if the user is also deleted
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=32)
    # Profile specific data if we ever need any
    objects = ProfileManager()


# Hook into user profile creation and create a Profile
@receiver(post_save, sender=User)
def hook_user_create(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create_profile(user=instance)
        Collection.objects.create_collection(
            name="Library", user=instance, library=True)

# Hook into user save and update Profile


@receiver(post_save, sender=User)
def hook_user_save(sender, instance, **kwargs):
    # Update profile data
    instance.profile.full_name = instance.first_name + " " + instance.last_name
    instance.profile.save()

# Tags for collections


class Tag(models.Model):
    name = models.CharField(max_length=MAX_STR_LEN, primary_key=True)

# Collection

class CollectionManager(models.Manager):
    def create_collection(self, name, user, library=False):
        collection = self.create(name=name, library=library, user=user)
        return collection


class Collection(models.Model):
    collection_id = models.AutoField(primary_key=True, unique=True)
    name = models.CharField(max_length=MAX_STR_LEN)
    library = models.BooleanField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    books = models.ManyToManyField(Book, blank=True)
    tags = models.ManyToManyField(Tag, blank=True)

    objects = CollectionManager()

class CollectionBookMetadataManager(models.Manager):
    def create_collectionbookmetadata(self, collection, book):
        book_metadata = self.create(collection = collection, book = book)
        return book_metadata

class CollectionBookMetadata(models.Model):
    collection = models.ForeignKey(Collection, on_delete = models.CASCADE)
    time_added = models.DateTimeField(auto_now_add = True)
    book = models.ForeignKey(Book, on_delete = models.CASCADE)
    objects = CollectionBookMetadataManager()

class UserBookMetadataManager(models.Manager):
    def create_userbookmetadata(self, user, book, has_read=False):
        book_metadata = self.create(user = user, book = book, has_read = has_read)
        return book_metadata

class UserBookMetadata(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    book = models.ForeignKey(Book, on_delete = models.CASCADE)
    has_read = models.BooleanField()
    date_read = models.DateField(blank = True, null = True)
    objects = UserBookMetadataManager()

class GoalManager(models.Manager):
    def create_goal(self, user, count_goal, date_end, date_start):
        goal = self.create(user = user, count_goal = count_goal, date_end = date_end, date_start = date_start)
        return goal
class Goal(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    book_count = models.IntegerField(default = 0) #number of books read for this goal so far
    count_goal = models.IntegerField(default = 0) #users goal for number of books read
    complete = models.BooleanField(default = False) #goal is complete or not
    current = models.BooleanField(default = True) #latest goal, only one current goal per user
    date_start = models.DateField() #start date of goal set by user
    date_end = models.DateField() #end date of goal set to be 30 days after start date
    date_complete = models.DateField(blank = True, null = True) #date user read goal number of books
    objects = GoalManager()

    def is_active(self): #check if today's date is in goal date range
        if datetime.now().date() <= self.date_end and datetime.now().date() >= self.date_start:
            return True
        else:
            return False
    def in_future(self):
        if datetime.now().date() < self.date_start:
            return True
        else:
            return False

    def save(self, *args, **kwargs): 
        if self.book_count >= self.count_goal:
            self.complete = True
            self.date_complete = datetime.now().date()
        else:
            self.complete = False
            self.date_complete = None
        super(Goal, self).save(*args, **kwargs) 