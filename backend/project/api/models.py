from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


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



# User profile
class ProfileManager(models.Manager):
    def create_profile(self, user):
        profile = self.create(user=user)
        return profile

class Profile(models.Model):
    # Delete the profile if the user is also deleted
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # Profile specific data if we ever need any
    objects = ProfileManager()

# User profile hooks
# Used here because extending user profile is scary
# Manager is safer to use than just hooking everything though

# Hook into user profile creation and create a Profile
@receiver(post_save, sender=User)
def hook_user_create(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create_profile(user=instance)
        Collection.objects.create_collection(name="Library", user=instance, library=True)
    
# Hook into user save and update Profile
@receiver(post_save, sender=User)
def hook_user_save(sender, instance, **kwargs):
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
