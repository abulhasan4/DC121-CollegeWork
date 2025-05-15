from django.http import HttpResponse
from django.shortcuts import render
from .models import * 

def index(request):
    return render(request, 'index.html')

def view_all_books(request):
    all_books = MyModel.objects.all()
    return render(request, 'all_books.html', {'books':all_books})

from django.shortcuts import get_object_or_404

def view_single_book(request, bookid):
	single_book = get_object_or_404(MyModel, id=bookid)
	return render(request, 'single_book.html', {'book':single_book})

def view_books_by_year(request, year):
    books_in_year = MyModel.objects.filter(year=year)
    return render(request, 'books_by_year.html', {'books': books_in_year, 'year': year})

def view_books_by_category(request, category):
    books_by_category = MyModel.objects.filter(category=category)
    return render(request, 'books_by_category.html', {'books': books_by_category, 'category': category})

def view_books_by_year_and_category(request, category, year):
    books_by_category_and_year = MyModel.objects.filter(category=category, year=year)
    return render(request, 'books_by_year_and_category.html', {'books': books_by_category_and_year, 'category': category, 'year': year})