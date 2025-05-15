import logging
from celery import shared_task
from django.utils.timezone import now
from .models import Reservation, ParkingSpace

logger = logging.getLogger(__name__)

@shared_task
def check_expired_reservations():
    expired_reservations = Reservation.objects.filter(endTime__lte=now(), isActive=True)
    for reservation in expired_reservations:
        reservation.isActive = False
        reservation.actualEndTime = now()
        reservation.save()

        parking_space = reservation.space
        print(f"Before: reservedBy={parking_space.reservedBy}")  # Debugging print
        parking_space.reservedBy = None
        print(f"After: reservedBy={parking_space.reservedBy}")  # Debugging print
        parking_space.save()

        logger.info(f"Updated reservation {reservation.reservationId} to inactive.")

    logger.info(f"{expired_reservations.count()} reservations updated.")
    return f"{expired_reservations.count()} reservations updated."



