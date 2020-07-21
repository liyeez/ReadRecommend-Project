# User profile

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .utilities import auth_validator, input_validator, user_validator

from django.db.models import Q
from .models import Collection, Profile, Goal
from datetime import datetime, timedelta


@api_view(["GET"])
@auth_validator
def get_library(request):
    """
    get_library

    Returns a user's library

    Input:
    auth (str)

    Returns:
    collection_id (int)
    book_list (list):
        id (int)
        book_name (str)
    """
    library = request.user.collection_set.get(library=True)

    collection_id = library.collection_id
    book_list = []
    for book in library.books.all():
        book_list.append({"id": book.id, "book_title": book.title,
                          "book_author": book.author, "book_pub_date": book.pub_date})

    return Response({"status": "ok", "message": "Got user library", "collection_id": collection_id, "book_list": book_list}, status=status.HTTP_200_OK)


@api_view(["GET"])
@user_validator
def get_collections(request):
    """
    get_collections

    Returns a user's collections

    Input:
    user_id (int)

    Returns:
    collection_list (list):
        collection_id (int)
        collection_name (str)
    """
    collections = request.user.collection_set.filter(library=False)

    collection_list = []
    for collection in collections.all():
        collection_list.append(
            {"collection_id": collection.collection_id, "collection_name": collection.name})

    return Response({"status": "ok", "message": "Got user collections", "collection_list": collection_list}, status=status.HTTP_200_OK)


@api_view(["GET"])
@input_validator(["search"])
def find_users(request):
    """
    find_users

    Search for other users

    Input:
    search (str)

    Returns:
    user_list (list):
        user_id (int)
        first_name (str)
        last_name (str)
    """
    search = request.GET["search"]

    profiles = Profile.objects.filter(Q(full_name__icontains=search))

    user_list = []
    for profile in profiles.all():
        user_list.append({"user_id": profile.user.id,
                          "first_name": profile.user.first_name, "last_name": profile.user.last_name})

    if len(user_list) > 0:
        message = "Got users"
    else:
        message = "No matches found"

    return Response({"status": "ok", "message": message, "user_list": user_list}, status=status.HTTP_200_OK)


@api_view(["GET"])
@user_validator
def get_profile(request):
    """
    get_profile

    Returns a user's profile details

    Input:
    user_id (int)

    Returns:
    first_name (str)
    last_name (str)
    library_collection_id (str)
    collection_list (list):
        collection_id (int)
        collection_name (str)
    """
    # Currently no additional information exists on profile but its there if we ever need it
    profile: Profile = request.user.profile
    collections: Collection = request.user.collection_set

    first_name = request.user.first_name
    last_name = request.user.last_name
    library_collection_id = 0

    collection_list = []
    for collection in collections.all():
        if not collection.library:
            collection_list.append(
                {"collection_id": collection.collection_id, "collection_name": collection.name})
        else:
            library_collection_id = collection.collection_id

    return Response({"status": "ok", "message": "Got user profile data", "first_name": first_name, "last_name": last_name, "library_collection_id": library_collection_id, "collection_list": collection_list}, status=status.HTTP_200_OK)


@api_view(["GET"])
@auth_validator
def my_profile(request):
    """
    my_profile

    Returns a user's profile details

    Input:
    token (str)

    Returns:
    first_name (str)
    last_name (str)
    library_collection_id (str)
    collection_list (list):
        collection_id (int)
        collection_name (str)
    """
    # Currently no additional information exists on profile but its there if we ever need it
    profile: Profile = request.user.profile
    collections = request.user.collection_set

    first_name = request.user.first_name
    last_name = request.user.last_name
    library_collection_id = 0

    collection_list = []
    for collection in collections.all():
        if not collection.library:
            collection_list.append(
                {"collection_id": collection.collection_id, "collection_name": collection.name})
        else:
            library_collection_id = collection.collection_id

    return Response({"status": "ok", "message": "Got current user profile data", "first_name": first_name, "last_name": last_name, "library_collection_id": library_collection_id, "collection_list": collection_list}, status=status.HTTP_200_OK)

@api_view(["POST"])
@auth_validator
@input_validator(["count_goal", "date_start"])
def set_goal(request): 
    """
    set_goal

    Sets goal for user

    Input:
    auth (str)
    count_goal (int)
    start_date (dd-mm-YYYY)

    Returns:
    None
    """
    date_start = datetime.strptime(request.POST["date_start"], '%d-%m-%Y').date()
    if date_start < datetime.now().date():
        return Response({"status": "error", "message":"invalid date"}, status=status.HTTP_200_OK)
    current_goals = request.user.goal_set.filter(current = True)
    has_current = False
    for goal in current_goals:
        if not goal.is_active():
            goal.current = False
            goal.save()
        else:
            has_current = True
    if has_current:
        return Response({"status": "error", "message":"current goal still in progress"}, status=status.HTTP_200_OK)
    if int(request.POST["count_goal"]) <= 0:
        return Response({"status": "error", "message":"invalid count_goal"}, status=status.HTTP_200_OK)
    goal = Goal.objects.create_goal(request.user, int(request.POST["count_goal"]), date_start + timedelta(days = 30), date_start)

    return Response({"status": "ok", "message":"Goal created"}, status=status.HTTP_200_OK)

@api_view(["GET"])
@auth_validator
def is_goal_met(request):
    """
    is_goal_met

    checks if the users current goal has been met

    Input:
    auth (str)
    book_count (int)

    Returns:
    None
    """
    try:
        current_goal = request.user.goal_set.get(current = True)
        if current_goal.is_active():
            return Response({"status": "ok", "message":"Goal retrieved", "is_met": current_goal.complete}, status=status.HTTP_200_OK)
    except:
        return Response({"status": "error", "message":"no current goals"}, status=status.HTTP_200_OK)

@api_view(["GET"])
@auth_validator
def get_goals(request):
    """
    get_goals

    gets all user goals

    Input:
    auth (str)

    Returns:
    goals_list (list): (sorted by date_start ascending)
        date_start (datetime.date)
        date_end (datetime.date)
        goal (int)
        books_read (int)
        complete (bool)
        date_complete (datetime.date)

    """
    goals = request.user.goal_set.all().order_by('date_start')
    goals_list = []
    for goal in goals:
        goals_list.append({"date_start": goal.date_start, "date_end": goal.date_end, 
            "goal": goal.count_goal, "books_read": goal.book_count, "complete": goal.complete, 
            "date_complete": goal.date_complete})
    return Response({"status": "ok", "message":"Goals retrieved", "goals_list": goals_list}, status=status.HTTP_200_OK)

@api_view(["POST"])
@auth_validator
def delete_goal(request):
    """
    delete_goal

    deletes current user goal if it is active

    Input:
    auth (str)

    Returns:
    None

    """
    try:
        goal = request.user.goal_set.get(current = True)
        if goal.is_active() or goal.in_future():
            goal.delete()
            return Response({"status": "ok", "message":"Goal deleted"}, status=status.HTTP_200_OK)
        else:
            return Response({"status": "error", "message":"No active goals to delete"}, status=status.HTTP_200_OK)
            
    except:
        return Response({"status": "error", "message":"No current goals"}, status=status.HTTP_200_OK)

@api_view(["POST"])
@auth_validator
@input_validator(["count_goal"])
def change_count_goal(request):
    """
    change_count_goal

    changes count_goal to specfied value

    Input:
    auth (str)
    count_goal (int)

    Returns:
    None

    """
    if int(request.POST["count_goal"]) <= 0:
        return Response({"status": "error", "message":"invalid count_goal"}, status=status.HTTP_200_OK)
    try:
        goal = request.user.goal_set.get(current = True)
        if int(request.POST["count_goal"]) == goal.count_goal:
            return Response({"status": "error", "message":"count_goal not changed"}, status=status.HTTP_200_OK)
        if goal.is_active() or goal.in_future():
            goal.count_goal = int(request.POST["count_goal"])
            goal.save()
            return Response({"status": "ok", "message":"Goal changed"}, status=status.HTTP_200_OK)
        else:
            return Response({"status": "error", "message":"Cannot edit past goals"}, status=status.HTTP_200_OK)
    except:
        return Response({"status": "error", "message":"Cannot edit past goals"}, status=status.HTTP_200_OK)

@api_view(["POST"])
@auth_validator
@input_validator(["date_start"])
def change_start_date(request):
    """
    change_start_date

    changes start_date to specfied date in the future including present
    goal does no longer count books that were counted before date change (even if added the day of change)

    Input:
    auth (str)
    date_start (datetime.date)

    Returns:
    None

    """
    date_start = datetime.strptime(request.POST["date_start"], '%d-%m-%Y').date()
    if date_start < datetime.now().date():
        return Response({"status": "error", "message":"invalid date"}, status=status.HTTP_200_OK)

    try:
        goal = request.user.goal_set.get(current = True)
        if goal.in_future():
            goal.date_start = date_start
            goal.date_end = date_start + timedelta(days = 30)
            goal.save()
            return Response({"status": "ok", "message":"Goal dates changed"}, status=status.HTTP_200_OK)
        elif goal.is_active():
            goal.date_start = date_start
            goal.date_end = date_start + timedelta(days = 30)
            goal.book_count = 0
            goal.complete = False
            goal.save()
            return Response({"status": "ok", "message":"Goal dates changed"}, status=status.HTTP_200_OK)
        else:
            return Response({"status": "error", "message":"Cannot edit past goals"}, status=status.HTTP_200_OK)

    except:
        return Response({"status": "error", "message":"Cannot edit past goals"}, status=status.HTTP_200_OK)
