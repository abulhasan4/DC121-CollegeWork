from .models import *
from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.forms import ModelForm, ModelChoiceField
from django.db import transaction

class UserSignupForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = User

    @transaction.atomic
    def save(self):
        user = super().save(commit=False)
        user.is_admin = False
        user.email = self.cleaned_data['username']
        user.save()
        return user


class UserLoginForm(AuthenticationForm):
    def __init__(self, *args, **kwargs):
        super(UserLoginForm, self).__init__(*args, **kwargs)

class CreatePizzaForm(forms.ModelForm):
    toppings = forms.ModelMultipleChoiceField(
        queryset=Topping.objects.all(),
        widget=forms.CheckboxSelectMultiple,
    )

    class Meta:
        model = CreatePizza
        fields = ['size', 'crust', 'sauce', 'cheese', 'toppings']

class OrderForm(forms.ModelForm):
    expiry_month = forms.IntegerField(label='Expiration Month')
    expiry_year = forms.IntegerField(label='Expiration Year')
    cardholder_name = forms.CharField(label='Cardholder Name', max_length=255)

    class Meta:
        model = Order
        fields = ['name', 'address', 'card', 'expiry_month', 'expiry_year', 'cvv', 'cardholder_name']
        labels = {
            'name': 'Full Name',
            'address': 'Delivery Address',
            'card': 'Credit Card Number',
            'cardholder_name': 'Name on Card',
            'expiry_month': 'Expiration Month',
            'expiry_year': 'Expiration Year',
            'cvv': 'CVV',
        }

    def clean_card(self):
        card = self.cleaned_data['card']
        return card

    def clean_expiry_month(self):
        expiry_month = self.cleaned_data['expiry_month']
        if expiry_month < 1 or expiry_month > 12:
            raise forms.ValidationError('Invalid expiration month.')
        return expiry_month

    def clean_expiry_year(self):
        expiry_year = self.cleaned_data['expiry_year']
        
        if expiry_year < 24:
            raise forms.ValidationError('Invalid expiration year.')
        return expiry_year

    def clean_cvv(self):
        cvv = self.cleaned_data['cvv']
        return cvv
