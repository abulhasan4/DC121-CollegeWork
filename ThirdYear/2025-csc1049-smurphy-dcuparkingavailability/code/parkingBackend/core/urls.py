from django.urls import path, include
from rest_framework import routers
from . import views
from .forms import *
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView
from .views import *
from .views import BulkUpdateParkingSpace 

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet, basename = 'user')
'''router.register(r'management', views., basename = 'user') '''
router.register(r'parking', views.ParkingViewset, basename = 'parkingspace')
router.register(r'carparks', views.CarParkViewSet, basename="carparks")
router.register(r'reservation',views.ReservationViewset, basename= 'reservation')
router.register(r'notification', views.NotificationViewset, basename= 'notification')
router.register(r'parkingviolation', views.ParkingViolationViewset, basename = 'parkingviolation')

urlpatterns = [
    path('',views.index, name="index"),
    path('register/', views.UserSignupView.as_view(), name="register"),
    path('register/manager/', views.ManagerSignupView.as_view(), name='manager_register'),
    path('logout/', views.logout_user, name="logout"),
    path('dashboard/user/', views.user_dashboard, name='user_dashboard'),
    path('dashboard/manager/', views.manager_dashboard, name='manager_dashboard'),
    path("api/users/me/", UserProfileView.as_view(), name="user-me"),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
    path('api/login/', views.CustomLoginView.as_view(), name='custom_login'),
    path("api/logout/", LogoutView.as_view(), name="logout"),
    path('api/register/', UserCreateView.as_view(), name="register" ),
    path("api/manage-users/", ManageUsersView.as_view(), name="manage_users"),
    path("api/manage-users/<int:user_id>/", ManageUsersView.as_view(), name="delete_user"),
    path('api/carpark/create/', CreateCarParkView.as_view(), name='create-carpark'),
    path('api/parking/<int:space_id>/reserve/', ReserveParkingSpaceAPIView.as_view(), name='reserve-parking'),
    path("api/reservation/space/<int:space_id>/", ReservationView.as_view(), name="reservation-view"),
    path('api/parking/<int:space_id>/confirm-violation/', ConfirmParkingViolationAPIView.as_view(), name="confirm_violation"),
    path('api/mass-update/', BulkUpdateParkingSpace.as_view(), name='mass_update'),
    path("api/csrf/", csrf_token_view, name="csrf_token"),
]