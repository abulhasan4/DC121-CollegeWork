from django.core.management.base import BaseCommand
from core.models import ParkingSpace

class Command(BaseCommand):
    help = "Create 30 parking spaces for each parking location"

    def handle(self, *args, **kwargs):
        CAR_PARK_CHOICES = [
            'CP1', 'CP2', 'CP3', 'CP4', 'Residences', 'Sport', 'Albert', 'Restaurant'
        ]

        for location in CAR_PARK_CHOICES:
            for i in range(30):
                ParkingSpace.objects.create(
                    status='available',
                    locationDetails=location,
                    type=f'Standard {i+1}'
                )
        
        self.stdout.write(self.style.SUCCESS("Successfully created parking spaces!"))
