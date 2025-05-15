from django.shortcuts import render, get_object_or_404, redirect
from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.exceptions import ValidationError
from .models import *
from .serializers import *
from django.http import HttpResponse
import re
import random
from .forms import *
from django.views.generic import CreateView
from django.contrib.auth import login, logout
from django.contrib.auth.views import LoginView
from django.contrib.auth.decorators import login_required
from django.urls import reverse
from django.shortcuts import get_object_or_404
from django.utils.timezone import now
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics, permissions
from django.middleware.csrf import get_token
from django.http import JsonResponse
from rest_framework.decorators import action

# Create your views here.
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
        return redirect('user_dashboard')

class ManagerSignupView(CreateView):
    model = User
    form_class = ManagerSignupForm
    template_name = 'manager_register.html'

    def form_valid(self, form):
        user = form.save()
        login(self.request, user)
        return redirect('manager_dashboard')

class CustomLoginView(LoginView):
    template_name = 'login.html'

    def get_success_url(self):
        if self.request.user.isManager:
            return reverse('manager_dashboard')
        else:
            return reverse('user_dashboard')


def logout_user(request):
    logout(request)
    return redirect("/")


@login_required
def user_dashboard(request):
    return render(request, 'user_dashboard.html')

@login_required
def manager_dashboard(request):
    return render(request, 'manager_dashboard.html')


class ReservationView(APIView):
    def post(self, request):
        try:
            space_id = request.data.get("space")
            end_time = request.data.get("endTime")
            space = ParkingSpace.objects.get(spaceId=space_id)

            reservation = Reservation.objects.create(
                space=space,
                startTime=now(),
                endTime=end_time,
                isActive=True
            )

            return Response({"message": "Reservation successful!", "reservationId": reservation.reservationId}, status=status.HTTP_201_CREATED)
        except ParkingSpace.DoesNotExist:
            return Response({"error": "Parking space not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, space_id):
            try:
                space = ParkingSpace.objects.get(spaceId=space_id)
                
                reservation = Reservation.objects.filter(space=space, isActive=True).last()

                if not reservation:
                    return Response({"error": "No active reservation found."}, status=status.HTTP_404_NOT_FOUND)
                
                reservation.isActive = False
                reservation.actualEndTime = now()
                reservation.save()

                space.status = "available"
                space.save()

                return Response({"message": "Parking space unreserved successfully."}, status=status.HTTP_200_OK)
            except ParkingSpace.DoesNotExist:
                return Response({"error": "Parking space not found."}, status=status.HTTP_404_NOT_FOUND)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


def csrf_token_view(request):
    return JsonResponse({"csrfToken": get_token(request)})

from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth import get_user_model

User = get_user_model()

class ManageUsersView(APIView):

    def get(self, request):
        
        users = User.objects.filter(isManager=False, is_superuser=False) 
        user_data = [
            {"id": user.id, "first_name": user.first_name, "last_name": user.last_name, "email": user.email}
            for user in users
        ]
        return Response(user_data, status=status.HTTP_200_OK)

    def delete(self, request, user_id):
        try:
            user = User.objects.get(id=user_id, isManager=False)
            user.delete()
            return Response({"message": "User deleted successfully"}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"error": "User not found or unauthorized"}, status=status.HTTP_404_NOT_FOUND)




class UserCreateView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email = request.data.get("email")
        first_name = request.data.get("first_name")
        last_name = request.data.get("last_name")
        password = request.data.get("password")
        isManager = request.data.get("isManager", False)  # Default to False if not provided
        vehicleRegNumber = request.data.get("vehicleRegNumber", "")


        if User.objects.filter(email=email).exists():
            return Response({"error": "Email already in use"}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(
            email=email,
            username=email,
            first_name=first_name,
            last_name=last_name,
            password=password,
            isManager=isManager,  # Assigning isManager field
            vehicleRegNumber=vehicleRegNumber,
        )

        token, _ = Token.objects.get_or_create(user=user)

        return Response({"token": token.key, "email": user.email}, status=status.HTTP_201_CREATED)

class ManagerParkingSpaceAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def patch(self, request, space_id):
        if not request.user.isManager:  
            return Response({"error": "Permission denied. Only managers can update parking spaces."}, status=status.HTTP_403_FORBIDDEN)
        
        parking_space = get_object_or_404(ParkingSpace, spaceId=space_id)
        serializer = ParkingSpaceSerializer(parking_space, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ReserveParkingSpaceAPIView(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, space_id):
        user = request.user
        try:
            space = ParkingSpace.objects.get(spaceId=space_id)

            existing_reservation = ParkingSpace.objects.filter(reservedBy=user).exclude(spaceId=space_id).first()
            if existing_reservation:
                return Response(
                    {"error": "You can only reserve one parking spot at a time."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            if space.status == "available":
                space.status = "occupied"
                space.reservedBy = user
            elif space.status == "occupied" and space.reservedBy == user:
                space.status = "available"
                space.reservedBy = None
            else:
                return Response(
                    {"error": "This parking space is already occupied by another user."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            space.save()
            return Response(ParkingSpaceSerializer(space).data, status=status.HTTP_200_OK)

        except ParkingSpace.DoesNotExist:
            return Response({"error": "Parking space not found."}, status=status.HTTP_404_NOT_FOUND)
        
class ConfirmParkingViolationAPIView(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, space_id):
        try:
            space = ParkingSpace.objects.get(spaceId=space_id)

        
            space.status = "occupied"
            space.reservedBy = None

            space.save()
            return Response({"message": "Space marked as occupied."}, status=status.HTTP_200_OK)

        except ParkingSpace.DoesNotExist:
            return Response({"error": "Parking space not found."}, status=status.HTTP_404_NOT_FOUND)



class CustomLoginView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        user = authenticate(username=email, password=password)

        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({"token": token.key, "email": user.email}, status=status.HTTP_200_OK)

        return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            'id': user.id,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "isManager": user.isManager,
            "vehicleRegNumber": user.vehicleRegNumber,
        })

    def put(self, request):
        user = request.user
        data = request.data
        user.first_name = data.get("first_name", user.first_name)
        user.last_name = data.get("last_name", user.last_name)
        user.email = data.get("email", user.email)
        user.isManager = data.get("isManager", user.isManager)
        user.vehicleRegNumber = data.get("vehicleRegNumber", user.vehicleRegNumber)
        user.save()
        return Response({"message": "Profile updated successfully!"})
    

class CreateCarParkView(APIView):
    permission_classes = [permissions.IsAuthenticated] 

    def post(self, request):
        if not request.user.isManager:
            return Response({"error": "Only managers can create parking areas."},
                            status=status.HTTP_403_FORBIDDEN)

        serializer = CarParkSerializer(data=request.data)
        if serializer.is_valid():
            num_spaces = serializer.validated_data.get('num_spaces', 0)
            car_park = serializer.save()  

            ParkingSpace.objects.bulk_create([
                ParkingSpace(locationDetails=car_park, type='Standard')
                for _ in range(num_spaces)
            ])

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class BulkUpdateParkingSpace(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request):
        serializer = BulkUpdateParkingSpaceSerializer(data=request.data)
        if serializer.is_valid():
            space_ids = serializer.validated_data['spaceIds']
            update_data = {k: v for k, v in serializer.validated_data.items() if k != 'spaceIds' and v is not None}
            ParkingSpace.objects.filter(spaceId__in=space_ids).update(**update_data)
            return Response({"message": "Parking spaces updated successfully"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            Token.objects.filter(user=request.user).delete()
            return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


'''Viewsets'''

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated] 

    def get_queryset(self):
        user = self.request.user

        if user.is_superuser or user.is_staff:
            return User.objects.all()

        email = self.request.query_params.get("email")
        if email:
            return User.objects.filter(email=email)

        return User.objects.filter(id=user.id)
    
    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def me(self, request):
        user = request.user
        serializer = self.get_serializer(user)
        return Response(serializer.data)


class CarParkViewSet(viewsets.ModelViewSet):
    queryset = CarPark.objects.all()
    serializer_class = CarParkSerializer

class ParkingViewset(viewsets.ModelViewSet):
    queryset = ParkingSpace.objects.all() 
    serializer_class = ParkingSpaceSerializer
    lookup_field = 'spaceId'

class ReservationViewset(viewsets.ModelViewSet):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

class NotificationViewset(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

class ParkingViolationViewset(viewsets.ModelViewSet):
    queryset = ParkingViolation.objects.all()
    serializer_class = ParkingViolationSerializer