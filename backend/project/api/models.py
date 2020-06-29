from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

# These should really go in another python file but it works as is
# The ordering is messed up because of the relationships between the tables


class BookManager(models.Manager):
    def create_book(self, title, author, isbn, pub_date):
        book = self.create(title=title, author=author,
                           isbn=isbn, pub_date=pub_date)
        return book
    
    def create_review(self, user, score, text):
        Review.objects.create_review(self.book, user, score, text)
    
class Book(models.Model):
    isbn = models.CharField(primary_key=True, max_length=13)
    cover = models.CharField(max_length=128)
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    pub_date = models.DateField()

    objects = BookManager()

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
        Collection.objects.create_collection(name="Library", user=instance, library=True)

# Hook into user save and update Profile
@receiver(post_save, sender=User)
def hook_user_save(sender, instance, **kwargs):
    # Update profile data
    instance.profile.full_name = instance.first_name + " " + instance.last_name
    instance.profile.save()



# Collection
class CollectionManager(models.Manager):
    def create_collection(self, name, user, library=False):
        collection = self.create(name=name, library=library, user=user)
        return collection

class Collection(models.Model):
    collection_id = models.AutoField(primary_key=True, unique=True)
    name = models.CharField(max_length=100)
    library = models.BooleanField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    books = models.ManyToManyField(Book)

    objects = CollectionManager()
