from django.http import HttpResponse
from django.shortcuts import render
from .models import * 
from django.http import JsonResponse 

from rest_framework import viewsets
from .models import MyModel
from .serializers import BookSerializer

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

def api_add(request):
	num1 = float(request.GET.get('num1',1)) 
	num2 = float(request.GET.get('num2',1))
	added = num1 + num2
	resp_dict = {'result':added}
	return JsonResponse(resp_dict)

def api_subtract(request):
    num1 = float(request.GET.get('num1', 0)) 
    num2 = float(request.GET.get('num2', 0))
    subtracted = num1 - num2 
    resp_dict = {'result': subtracted}
    return JsonResponse(resp_dict)

def api_divide(request):
    num1 = float(request.GET.get('num1', 1)) 
    num2 = float(request.GET.get('num2', 1))
    if num2 == 0:
        return JsonResponse({'error': 'Cannot divide by zero'})
    divided = num1 / num2 
    resp_dict = {'result': divided}
    return JsonResponse(resp_dict)

def api_multiply(request):
    num1 = float(request.GET.get('num1', 1)) 
    num2 = float(request.GET.get('num2', 1))
    multiplied = num1 * num2 
    resp_dict = {'result': multiplied}
    return JsonResponse(resp_dict)

def api_exponential(request):
    num1 = float(request.GET.get('base', 1)) 
    num2 = float(request.GET.get('exponent', 1))
    exponentiated = num1 ** num2 
    resp_dict = {'result': exponentiated}
    return JsonResponse(resp_dict)

class BookViewSet(viewsets.ModelViewSet):
    serializer_class = BookSerializer
    queryset = MyModel.objects.all()
