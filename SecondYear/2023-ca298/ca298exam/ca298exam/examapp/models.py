from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
# Create your models here.


class UserManager(BaseUserManager):
    """Define a model manager for User model with no username field."""

    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        """Create and save a User with the given email and password."""
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        """Create and save a regular User with the given email and password."""
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        """Create and save a SuperUser with the given email and password."""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)

class User(AbstractUser):
    email = models.EmailField('Email', unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    objects = UserManager()


class Game(models.Model):
    PLATFORM_CHOICES = [
        ('PS5', 'PlayStation 5'),
        ('XBOX', 'Xbox Series X'),
        ('SWITCH', 'Nintendo Switch'),
    ]
    
    GENRE_CHOICES = [
        ('SHOOTER', 'Shooter'),
        ('ACTION', 'Action'),
        ('ADVENTURE', 'Adventure'),
        ('RPG', 'Role-Playing Game'),
    ]
    
    name = models.CharField(max_length=100)
    description = models.TextField()
    platform = models.CharField(max_length=10, choices=PLATFORM_CHOICES)
    genre = models.CharField(max_length=20, choices=GENRE_CHOICES)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    stock = models.PositiveIntegerField()

    def __str__(self):
        return self.name

class Basket(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.user.username}'s Basket"

