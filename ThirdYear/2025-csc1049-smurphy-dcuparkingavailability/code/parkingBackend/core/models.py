from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
# Create your models here.


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
    username = models.CharField(max_length=150, blank=True, null=True)
    email = models.EmailField(unique=True)

    isManager = models.BooleanField(default=False)
    vehicleRegNumber = models.CharField(max_length=20, blank=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']


class CarPark(models.Model):
    name = models.CharField(max_length=50, unique=True)
 

class ParkingSpace(models.Model):
    STATUS_CHOICES = [
        ('available', 'Available'),
        ('occupied', 'Occupied'),
        ('reserved', 'Reserved'),
    ]


    spaceId = models.AutoField(primary_key=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='available')
    reservedBy = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="reserved_spaces")
    locationDetails = models.ForeignKey(CarPark, on_delete=models.CASCADE)
    type = models.CharField(max_length=50)

    def is_available(self):
        return self.status == 'available'
    
    def reserve(self, user):
        if self.is_available():
            self.status = 'reserved'
            self.reservedBy = user
            self.save()
            return True
        return False
    

class Reservation(models.Model):
    reservationId = models.AutoField(primary_key=True)
    space = models.ForeignKey(ParkingSpace, on_delete=models.CASCADE, related_name="reservations")
    startTime = models.DateTimeField()
    endTime = models.DateTimeField()
    actualEndTime = models.DateTimeField(null=True, blank=True)
    isActive = models.BooleanField(default=False)

class Notification(models.Model):
    notificationId = models.AutoField(primary_key=True)
    message = models.TextField()
    recipient = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notifications")
    timestamp = models.DateTimeField(auto_now_add=True)
    delivered = models.BooleanField(default=False)

class ManagementReservation(models.Model):
    management = models.ForeignKey(User, on_delete=models.CASCADE, related_name="reservations")
    isOffLimits = models.BooleanField(default=False)
    reason = models.TextField()

class ParkingViolation(models.Model):
    violationId = models.AutoField(primary_key=True)
    vehicleNumber = models.CharField(max_length=20)
    loggedBy = models.ForeignKey(User, on_delete=models.CASCADE, related_name="violations")
    parkingSpace = models.ForeignKey(ParkingSpace, on_delete=models.SET_NULL, null=True, blank=True, related_name="violations")
    timestamp = models.DateTimeField(auto_now_add=True)
    reason = models.TextField()

















