from email.policy import default
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
from django.core.validators import MaxValueValidator, MinValueValidator
from django.utils import timezone
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
#... any other imports


# My link to video is in the VideoLink.txt file

class UserManager(BaseUserManager):

    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)

class User(AbstractUser):
    email = models.EmailField('Username', unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    objects = UserManager()


class Crust(models.Model):
    name = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.name

class Sauce(models.Model):
    name = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.name

class Cheese(models.Model):
    name = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.name

class Topping(models.Model):
    name = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.name

class CreatePizza(models.Model):
    id = models.AutoField(primary_key=True)
    size = models.CharField(max_length=20, choices=[('Small', 'Small - €5.99'), ('Medium', 'Medium - €8.99'), ('Large', 'Large - €11.99'), ('Extra Large', 'Extra Large - €14.99'), ('Party Size', 'Party Size - €19.99')])
    crust = models.ForeignKey(Crust, on_delete=models.CASCADE)
    sauce = models.ForeignKey(Sauce, on_delete=models.CASCADE)
    cheese = models.ForeignKey(Cheese, on_delete=models.CASCADE)
    toppings = models.ManyToManyField(Topping)

    def __str__(self):
        return f"{self.size} Pizza with {', '.join(str(t) for t in self.toppings.all())}"



class Basket(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    pizza = models.ForeignKey(CreatePizza, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)


def validate_credit_card_number_length(value):
    if len(str(value)) != 16:
        raise ValidationError('Card number must be 16 digits long.')
    
def validate_cvv_length(value):
    if len(str(value)) != 3:
        raise ValidationError('CVV must be 3 digits long.')

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    card = models.PositiveIntegerField(validators=[validate_credit_card_number_length, MinValueValidator(10**15), MaxValueValidator(10**16 - 1), ])
    cardholder_name = models.CharField(max_length=255, default="Error", blank=False)
    expiry_month = models.IntegerField(default=1, validators=[MinValueValidator(1), MaxValueValidator(12)])
    expiry_year = models.PositiveSmallIntegerField(default=24, validators=[MinValueValidator(24), MaxValueValidator(50)])
    cvv = models.PositiveIntegerField(validators=[validate_cvv_length])
    pizzas = models.ManyToManyField(CreatePizza, through='OrderPizza')
    expected_delivery_time = models.DateTimeField(null=True, blank=True)
    completed = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if not self.pk:
            self.expected_delivery_time = timezone.now() + timezone.timedelta(hours=1)
        super().save(*args, **kwargs)


class OrderPizza(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    pizza = models.ForeignKey(CreatePizza, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
