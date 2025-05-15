from django.urls import include, path
from . import views
from .views import * 
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'book', views.BookViewSet)



urlpatterns = [
   path('', views.index, name="index"),
   path('all_books', view_all_books, name='all_books'),
   path('books/<int:bookid>', view_single_book, name='single_book'),
   path('books/year/<int:year>/', view_books_by_year, name='books_by_year'),
   path('books/category/<str:category>/', view_books_by_category, name='books_by_category'),
   path('books/category/<str:category>/year/<int:year>/', view_books_by_year_and_category, name='books_by_year_and_category'),
   path('add', views.api_add, name='api_add'),
   path('subtract', views.api_subtract, name='api_subtract'),
   path('divide', views.api_divide, name='api_divide'),
   path('multiply', views.api_multiply, name='api_multiply'),
   path('exponential', views.api_exponential, name='api_exponential'),
   path('api-auth/', include('rest_framework.urls')),
   path('api/', include(router.urls))
]