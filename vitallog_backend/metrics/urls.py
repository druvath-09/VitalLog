from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import HealthMetricReadingViewSet, register_user

router = DefaultRouter()
router.register(r'readings', HealthMetricReadingViewSet, basename='reading')

urlpatterns = [
    path('', include(router.urls)),
    path('register/', register_user, name='register_user'),
]
