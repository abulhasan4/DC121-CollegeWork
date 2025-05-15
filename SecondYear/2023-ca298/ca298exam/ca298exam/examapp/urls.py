from django.urls import path, include
from . import views
from .forms import * # add o imports at the top of the file

urlpatterns = [
    path('',views.index, name="index"),# mywebsite.com 
    path('register/', views.UserSignupView.as_view(), name="register"),
    path('login/',views.LoginView.as_view(template_name="login.html", authentication_form=UserLoginForm), name='login'),
    path('logout/', views.logout_user, name="logout"),
    path('games/', views.all_games, name='all_games'),
    path('game/<int:game_id>/', views.game_detail, name='game_detail'),
    path('console/<str:platform>/', views.console_games, name='console_games'),
    path('add-to-basket/<int:game_id>/', views.add_to_basket, name='add_to_basket'),
    path('basket/', views.basket_view, name='basket_view'),
    path('add_game/', views.add_game, name='add_game'),   
]
