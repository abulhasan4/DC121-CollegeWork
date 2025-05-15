# tests.py

from django.test import TestCase
from django.urls import reverse, resolve
from django.utils.timezone import now, timedelta
from rest_framework.test import APIClient, APITestCase
from core.models import User, ParkingSpace, CarPark, Reservation
from core.serializers import ParkingSpaceSerializer, CarParkSerializer
from core.views import *


# --- MODEL TESTS ---

class UserModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser", 
            email="testuser@example.com",
            first_name="Test",
            last_name="User",
            password="password123",
            isManager=False
        )

    def test_user_creation(self):
        self.assertEqual(self.user.email, "testuser@example.com")
        self.assertEqual(self.user.first_name, "Test")
        self.assertFalse(self.user.isManager)


class CarParkModelTest(TestCase):
    def setUp(self):
        self.car_park = CarPark.objects.create(name="Test Car Park")

    def test_car_park_creation(self):
        self.assertEqual(self.car_park.name, "Test Car Park")


class ParkingSpaceModelTest(TestCase):
    def setUp(self):
        self.carpark = CarPark.objects.create(name="Test Car Park")
        self.space = ParkingSpace.objects.create(
            locationDetails=self.carpark,
            type="Standard",
            status="available"
        )

    def test_parking_space_creation(self):
        self.assertEqual(self.space.status, "available")
        self.assertEqual(self.space.locationDetails.name, "Test Car Park")

class ReservationModelTest(TestCase):
    def setUp(self):
        self.car_park = CarPark.objects.create(name="Test Car Park")
        self.parking_space = ParkingSpace.objects.create(
            locationDetails=self.car_park,
            type="Standard",
            status="available"
        )
        self.reservation = Reservation.objects.create(
            space=self.parking_space,
            startTime=now(),
            endTime=now() + timedelta(hours=2),
            isActive=True
        )

    def test_reservation_creation(self):
        self.assertEqual(self.reservation.space, self.parking_space)
        self.assertTrue(self.reservation.isActive)


class ParkingViolationModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser",
            email="testuser@example.com",
            password="password123"
        )
        self.car_park = CarPark.objects.create(name="Test Car Park")
        self.parking_space = ParkingSpace.objects.create(
            locationDetails=self.car_park,
            type="Standard",
            status="occupied"
        )
        self.violation = ParkingViolation.objects.create(
            vehicleNumber="XYZ123",
            loggedBy=self.user,
            parkingSpace=self.parking_space,
            reason="Unauthorized parking"
        )

    def test_parking_violation_creation(self):
        self.assertEqual(self.violation.vehicleNumber, "XYZ123")
        self.assertEqual(self.violation.loggedBy, self.user)
        self.assertEqual(self.violation.parkingSpace, self.parking_space)
        self.assertEqual(self.violation.reason, "Unauthorized parking")


# --- SERIALIZER TESTS ---

User = get_user_model()

class UserSerializerTest(TestCase):
    def setUp(self):
        self.user_data = {
            "email": "test@example.com",
            "first_name": "John",
            "last_name": "Doe",
            "isManager": True,
            "vehicleRegNumber": "ABC123",
        }
        self.serializer = UserSerializer(data=self.user_data)

    def test_serializer_valid(self):
        self.assertTrue(self.serializer.is_valid())


class ParkingSpaceSerializerTest(TestCase):
    def setUp(self):
        self.car_park = CarPark.objects.create(name="Test Car Park")
        self.space_data = {"status": "available", "type": "Standard", "locationDetails": self.car_park.id}
        self.serializer = ParkingSpaceSerializer(data=self.space_data)

    def test_serializer_valid(self):
        self.assertTrue(self.serializer.is_valid())

    def test_serializer_output(self):
        self.assertTrue(self.serializer.is_valid())  
        space = self.serializer.save()
        self.assertEqual(space.status, "available")
        self.assertEqual(space.locationDetails.name, "Test Car Park")
    
class ReservationSerializerTest(TestCase):
    def setUp(self):
        self.car_park = CarPark.objects.create(name="Test Car Park")
        self.parking_space = ParkingSpace.objects.create(
            locationDetails=self.car_park, status="available", type="Standard"
        )
        self.reservation_data = {
            "space": self.parking_space.spaceId,
            "startTime": "2025-02-21T08:00:00Z",
            "endTime": "2025-02-21T10:00:00Z",
            "actualEndTime": None,
            "isActive": True,
        }
        self.serializer = ReservationSerializer(data=self.reservation_data)

    def test_serializer_valid(self):
        self.assertTrue(self.serializer.is_valid())

class BulkUpdateParkingSpaceSerializerTest(TestCase):
    def setUp(self):
        self.car_park = CarPark.objects.create(name="Test Car Park")
        self.space1 = ParkingSpace.objects.create(
            locationDetails=self.car_park, status="available", type="Standard"
        )
        self.space2 = ParkingSpace.objects.create(
            locationDetails=self.car_park, status="available", type="Standard"
        )
        self.update_data = {
            "spaceIds": [self.space1.spaceId, self.space2.spaceId],
            "status": "occupied",
            "type": "Electric",
            "reservedBy": None,
        }
        self.serializer = BulkUpdateParkingSpaceSerializer(data=self.update_data)

    def test_serializer_valid(self):
        self.assertTrue(self.serializer.is_valid())



class CarParkSerializerTest(TestCase):
    def setUp(self):
        self.car_park_data = {"name": "Test Car Park", "num_spaces": 5}
        self.serializer = CarParkSerializer(data=self.car_park_data)

    def test_serializer_valid(self):
        self.assertTrue(self.serializer.is_valid())


# --- VIEW TESTS ---

class ViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username="testuser", 
            email="testuser@example.com",
            first_name="Test",
            last_name="User",
            password="password123"
        )
        self.client.login(username="testuser", password="password123")
        self.carpark = CarPark.objects.create(name="Test Car Park")
        self.space = ParkingSpace.objects.create(status="available", type="Standard", locationDetails=self.carpark)
        self.space.save()

    def test_login(self):
        response = self.client.post(reverse("custom_login"), {
            "email": "testuser@example.com",
            "password": "password123"
        })
        self.assertEqual(response.status_code, 200)

class ManageUsersViewTest(APITestCase):
    def setUp(self):
        self.manager = User.objects.create_user(username="manageruser", email="manager@example.com", password="password123", isManager=True)
        self.user = User.objects.create_user(username="user", email="user@example.com", password="password123", isManager=False)
        self.client.login(username="manager@example.com", password="password123")

    def test_get_users(self):
        response = self.client.get(reverse("manage_users"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_user(self):
        response = self.client.delete(reverse("delete_user", args=[self.user.id]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class ConfirmParkingViolationAPIViewTest(APITestCase):
    def setUp(self):
        self.carpark = CarPark.objects.create(name="Test Car Park")
        self.space = ParkingSpace.objects.create(status="available", type="Standard", locationDetails=self.carpark)
        self.client.force_authenticate(user=User.objects.create_user(username="manager", password="password123", isManager=True))

    def test_confirm_violation(self):
        response = self.client.patch(reverse("confirm_violation", args=[self.space.spaceId]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class CreateCarParkViewTest(APITestCase):
    def setUp(self):
        self.manager = User.objects.create_user(username="manageruser", email="manager@example.com", password="password123", isManager=True)
        self.client.force_authenticate(user=self.manager)
        self.url = reverse("create-carpark")

    def test_create_car_park(self):
        data = {"name": "New Car Park", "num_spaces": 3}
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

class BulkUpdateParkingSpaceTest(APITestCase):
    def setUp(self):
        self.carpark = CarPark.objects.create(name="Test Car Park")
        self.space1 = ParkingSpace.objects.create(status="available", type="Standard", locationDetails=self.carpark)
        self.space2 = ParkingSpace.objects.create(status="available", type="Standard", locationDetails=self.carpark)
        self.client.force_authenticate(user=User.objects.create_user(username="admin", password="password123", isManager=True))
        self.url = reverse("mass_update")

    def test_bulk_update(self):
        data = {"spaceIds": [self.space1.spaceId, self.space2.spaceId], "status": "occupied"}
        response = self.client.patch(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


# --- URL TESTS ---

class UrlTests(TestCase):
    def test_login_url_resolves(self):
        url = reverse("custom_login")
        self.assertEqual(resolve(url).func.view_class.__name__, "CustomLoginView")

    def test_reserve_url_resolves(self):
        url = reverse("reserve-parking", args=[1])
        self.assertEqual(resolve(url).func.view_class.__name__, "ReserveParkingSpaceAPIView")

    
    def test_manage_users_url_resolves(self):
        url = reverse("manage_users")
        self.assertEqual(resolve(url).func.view_class, ManageUsersView)

    def test_delete_user_url_resolves(self):
        url = reverse("delete_user", args=[1])
        self.assertEqual(resolve(url).func.view_class, ManageUsersView)

    def test_create_car_park_url_resolves(self):
        url = reverse("create-carpark")
        self.assertEqual(resolve(url).func.view_class, CreateCarParkView)

    def test_confirm_violation_url_resolves(self):
        url = reverse("confirm_violation", args=[1])
        self.assertEqual(resolve(url).func.view_class, ConfirmParkingViolationAPIView)

    def test_mass_update_url_resolves(self):
        url = reverse("mass_update")
        self.assertEqual(resolve(url).func.view_class, BulkUpdateParkingSpace)

    def test_reservation_url_resolves(self):
        url = reverse("reservation-view", args=[1])
        self.assertEqual(resolve(url).func.view_class, ReservationView)
