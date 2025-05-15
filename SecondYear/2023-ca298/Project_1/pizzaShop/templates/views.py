from django.http import HttpResponse
import re
from django.shortcuts import render, get_object_or_404
import random
from .models import *
from .forms import *
from django.views.generic import CreateView
from django.shortcuts import render, redirect
from django.contrib.auth import login, logout
from django.contrib.auth.views import LoginView
from django.contrib.auth.decorators import login_required

def index(request):
    return render(request, 'index.html')

class UserSignupView(CreateView):
    model = User
    form_class = UserSignupForm
    template_name = 'register.html'

    def get_context_data(self, **kwargs):
        return super().get_context_data(**kwargs)

    def form_valid(self, form):
        user = form.save()
        login(self.request, user)
        return redirect('order_history')

class UserLoginView(LoginView):
    template_name='login.html'


def logout_user(request):
    logout(request)
    return redirect("/")

@login_required
def create_pizza(request):
    user = request.user

    if request.method == "POST":
        form = CreatePizzaForm(request.POST)
        if form.is_valid():
            pizza = form.save()

            temp_order = Basket.objects.create(user=user, pizza=pizza)
            selected_toppings = request.POST.getlist('toppings')
            temp_order.save()

    else:
        form = CreatePizzaForm()

    return render(request, 'customise_pizza.html', {'form': form})

@login_required
def orderform(request):
    user = request.user

    if request.method == "POST":
        form = OrderForm(request.POST)
        if form.is_valid():
            order = form.save(commit=False)
            order.user = user
            order.completed = True
            order.save()

            temp_orders = Basket.objects.filter(user=user)
            for temp_order in temp_orders:
                order_pizza = OrderPizza.objects.create(order=order, pizza=temp_order.pizza, quantity=temp_order.quantity)
                temp_order.delete()

            return redirect('order_details')

    else:
        form = OrderForm()

    return render(request, 'payment.html', {'form': form})


@login_required
def order_history(request):
    user = request.user
    user_orders = Order.objects.filter(user=user)
    return render(request, 'order_history.html', {'user_orders': user_orders})


@login_required
def order_details(request):
    user = request.user
    most_recent_order = Order.objects.filter(user=user).order_by('-id').first()

    if most_recent_order:
        order_details = OrderPizza.objects.filter(order=most_recent_order)
    return render(request, 'order_details.html', {'order_details': order_details, 'order' : most_recent_order})


