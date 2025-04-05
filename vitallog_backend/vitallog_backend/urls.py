from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from metrics.views import register_user

urlpatterns = [
    # Admin panel
    path('admin/', admin.site.urls),

    # Metrics app routes (includes /readings/)
    path('api/', include('metrics.urls')),

    # Authentication endpoints
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Custom registration endpoint
    path('api/register/', register_user, name='register_user'),
]
