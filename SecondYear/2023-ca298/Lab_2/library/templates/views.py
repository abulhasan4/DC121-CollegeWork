from django.http import HttpResponse
from django.shortcuts import render
import random

def index(request):
    return render(request, 'index.html')

def variable(request):
   x = 5
   return render(request, 'variable.html', {'x': x })

def add(request):
   x = 5
   y = 8
   z = 13
   return render(request, 'add.html', {'x':x, 'y':y, 'z':z})

def randomnum(request):
   x = random.randint(0,100)
   return render(request,'randomnum.html',{'x':x})

def loop_example(request):
	names = ['John','Paul','George','Ringo']
	return render(request, 'loop_example.html', {'names':names})

def ex2(request):
    x = list(range(1,31))
    return render(request,'ex2.html',{'x':x})

def fizzbuzz(request):
    x = list(range(1,101))
    return render(request,'fizzbuzz.html',{'x':x})