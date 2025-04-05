from rest_framework import viewsets, permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError

from .models import HealthMetricReading
from .serializers import HealthMetricReadingSerializer


class HealthMetricReadingViewSet(viewsets.ModelViewSet):
    serializer_class = HealthMetricReadingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Only return readings for the authenticated user
        return HealthMetricReading.objects.filter(user=self.request.user).order_by('-date')

    def perform_create(self, serializer):
        # Automatically associate the logged-in user
        serializer.save(user=self.request.user)


@api_view(["POST"])
def register_user(request):
    username = request.data.get("username")
    email = request.data.get("email")
    password = request.data.get("password")

    # Check all required fields
    if not username or not email or not password:
        return Response({"error": "All fields are required."}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already exists."}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(email=email).exists():
        return Response({"error": "Email already exists."}, status=status.HTTP_400_BAD_REQUEST)

    # Optional: Validate password strength
    try:
        validate_password(password)
    except ValidationError as e:
        return Response({"error": e.messages}, status=status.HTTP_400_BAD_REQUEST)

    # Create user
    user = User.objects.create_user(username=username, email=email, password=password)
    return Response({"message": "User registered successfully."}, status=status.HTTP_201_CREATED)
