from django.urls import path
from . import views
from .forms import *

urlpatterns = [
    path('',views.index, name="index"),
    path('register/', views.UserSignupView.as_view(), name="register"),
    path('login/',views.LoginView.as_view(template_name="login.html", authentication_form=UserLoginForm)),
    path('logout/', views.logout_user, name="logout"),
    path('customisepizza/', views.create_pizza, name="customise_pizza"),
    path('payment/', views.orderform, name="payment"),
    path('orderhistory/', views.order_history, name="order_history"),
    path('orderdetails/', views.order_details, name = "order_details")

]