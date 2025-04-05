from rest_framework import serializers
from .models import HealthMetricReading

class HealthMetricReadingSerializer(serializers.ModelSerializer):
    class Meta:
        model = HealthMetricReading
        fields = ['id', 'metric_type', 'value', 'unit', 'date']
        read_only_fields = ['id']
