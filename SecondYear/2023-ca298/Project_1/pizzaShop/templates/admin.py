from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import *


# Register your models here.
admin.site.register(User, UserAdmin)
admin.site.register(CreatePizza)
admin.site.register(OrderPizza)
admin.site.register(Order)
admin.site.register(Basket)
admin.site.register(Cheese)
admin.site.register(Topping)
admin.site.register(Sauce)
admin.site.register(Crust)
