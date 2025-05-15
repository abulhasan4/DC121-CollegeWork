from django.urls import path
from . import views

urlpatterns = [
   path('', views.index, name="index"),
   path('variable', views.variable, name="variable"),
   path('add', views.add, name="add"),
   path('randomnum', views.randomnum, name="randomnum"),
   path('loop_example', views.loop_example, name="loop_example"),
   path('ex2', views.ex2, name="ex2"),
   path('fizzbuzz', views.fizzbuzz, name="fizzbuzz")
]