from .models import *
from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.forms import ModelForm, ModelChoiceField
from django.db import transaction

class BookForm(forms.ModelForm):
    class Meta:
        model = MyModel
        fields = [ 'title', 'author', 'year', 'price']

    def clean(self):
        data = self.cleaned_data
        title = data['title']
        author = data['author']
        book_exists = Book.objects.filter(title=title).exists()
        if book_exists:
            raise forms.ValidationError(f"The book {title} already exists in the database")
        return data