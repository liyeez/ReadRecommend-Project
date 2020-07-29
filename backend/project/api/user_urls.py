from django.urls import path
from . import user

urlpatterns = [
    path("get_library", user.get_library),
    path("get_collections", user.get_collections),
    path("find_users", user.find_users),
    path("get_profile", user.get_profile),
    path("my_profile", user.my_profile), 
    path("set_goal", user.set_goal),
    path("is_goal_met", user.is_goal_met),
    path("get_goals", user.get_goals),
    path("delete_goal", user.delete_goal),
    path("change_count_goal", user.change_count_goal),
    path("change_start_date", user.change_start_date),
    path("in_library", user.in_library)
]
