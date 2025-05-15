from django.shortcuts import render, get_object_or_404
import random
from .models import *
from .forms import *
from django.views.generic import CreateView
from django.shortcuts import render, redirect
from django.contrib.auth import login, logout
from django.contrib.auth.views import LoginView
from django.contrib.auth.decorators import login_required
from django.contrib.admin.views.decorators import staff_member_required
from django.db.models import Sum
# Create your views here.


def index(request):
    return render(request, 'index.html')

class UserSignupView(CreateView):
    model = User
    form_class = UserSignupForm
    template_name = 'user_signup.html'

    def get_context_data(self, **kwargs):
        return super().get_context_data(**kwargs)

    def form_valid(self, form):
        user = form.save()
        login(self.request, user)
        return redirect('/')

class UserLoginVGameiew(LoginView):
    template_name='login.html'


def logout_user(request):
    logout(request)
    return redirect("/")

def all_games(request):
    games = Game.objects.all()
    return render(request, 'all_games.html', {'games': games})

def game_detail(request, game_id):
    game = get_object_or_404(Game, pk=game_id)
    return render(request, 'game_detail.html', {'game': game})

def console_games(request, platform):
    games = Game.objects.filter(platform=platform)
    return render(request, 'console_games.html', {'games': games})

@login_required
def add_to_basket(request, game_id):
    game = get_object_or_404(Game, pk=game_id)
    if request.method == 'POST':
        quantity = int(request.POST.get('quantity'))
        if quantity > game.stock:
            return render(request, 'add_to_basket.html', {'game': game, 'error_message': 'Insufficient stock.'})
        else:
            game.stock -= quantity
            game.save()
            basket_item, created = Basket.objects.get_or_create(user=request.user, game=game)
            if not created:
                basket_item.quantity += quantity
                basket_item.save()
            return redirect('basket_view')
    return render(request, 'add_to_basket.html', {'game': game})

from django.db.models import Sum

@login_required
def basket_view(request):
    basket_items = Basket.objects.filter(user=request.user)
    
    for item in basket_items:
        item.total_price = item.quantity * item.game.price
    
    total_price = sum(item.total_price for item in basket_items)
    
    return render(request, 'basket.html', {'basket_items': basket_items, 'total_price': total_price})
    
@staff_member_required
def add_game(request):
    if request.method == 'POST':
        form = GameForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('all_games')
    else:
        form = GameForm()
    return render(request, 'add_game.html', {'form': form})