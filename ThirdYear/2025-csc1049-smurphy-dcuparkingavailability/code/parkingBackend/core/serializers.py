from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import *

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'isManager', 'vehicleRegNumber']

class ParkingSpaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParkingSpace
        fields = ['spaceId', 'status', 'reservedBy','locationDetails','type']

class CarParkSerializer(serializers.ModelSerializer):
    parking_spaces = ParkingSpaceSerializer(many=True, read_only=True)
    num_spaces = serializers.IntegerField(write_only=True, required=False, default=0)

    class Meta:
        model = CarPark
        fields = ['id', 'name', 'parking_spaces', 'num_spaces']

    def create(self, validated_data):
        num_spaces = validated_data.pop('num_spaces', 0)
        car_park = CarPark.objects.create(**validated_data)

        ParkingSpace.objects.bulk_create([
            ParkingSpace(locationDetails=car_park, type='Standard')
            for _ in range(num_spaces)
        ])
        
        return car_park



class ReservationSerializer(serializers.ModelSerializer):
    space = serializers.PrimaryKeyRelatedField(queryset=ParkingSpace.objects.all())

    class Meta:
        model = Reservation
        fields = ['reservationId', 'space', 'startTime', 'endTime','actualEndTime','isActive']

class NotificationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Notification
        fields = ['notificationId','message','recipient','timestamp', 'delivered']

class ParkingViolationSerializer(serializers.ModelSerializer):
    loggedBy = serializers.HyperlinkedRelatedField(
        view_name='user-detail',
        queryset=User.objects.all()
    )
    parkingSpace = serializers.PrimaryKeyRelatedField(
        queryset=ParkingSpace.objects.all(),
        allow_null=True,
        required=False
    )

    class Meta:
        model = ParkingViolation
        fields = ['violationId', 'vehicleNumber', 'loggedBy', 'parkingSpace', 'timestamp', 'reason']

class BulkUpdateParkingSpaceSerializer(serializers.Serializer):
    spaceIds = serializers.ListField(
        child=serializers.IntegerField(),
        required=True
    )
    status = serializers.ChoiceField(
        choices=[("available", "Available"), ("occupied", "Occupied"), ("reserved", "Reserved")],
        required=False
    )
    type = serializers.ChoiceField(
        choices=[("Standard", "Standard"), ("Electric", "Electric"), ("Handicap", "Handicap")],
        required=False
    )
    reservedBy = serializers.IntegerField(required=False, allow_null=True)

    



 