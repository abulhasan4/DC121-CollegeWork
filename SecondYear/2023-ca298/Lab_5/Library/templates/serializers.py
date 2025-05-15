# serializers.py created inside your app folder
from rest_framework import serializers
from .models import *

class BookSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = MyModel
		fields = ['id', 'year', 'author', 'price', 'title', 'synopsis', 'category']