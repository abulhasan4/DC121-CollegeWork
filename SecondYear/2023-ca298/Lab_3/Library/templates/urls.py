from django.urls import path
from . import views
from .views import * 

urlpatterns = [
   path('', views.index, name="index"),
   path('all_books', view_all_books, name='all_books'),
   path('books/<int:bookid>', view_single_book, name='single_book'),
   path('books/year/<int:year>/', view_books_by_year, name='books_by_year'),
   path('books/category/<str:category>/', view_books_by_category, name='books_by_category'),
   path('books/category/<str:category>/year/<int:year>/', view_books_by_year_and_category, name='books_by_year_and_category')
]