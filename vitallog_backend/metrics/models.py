from django.db import models
from django.contrib.auth.models import User

class HealthMetricReading(models.Model):
    METRIC_TYPES = [
        ('weight', 'Weight'),
        ('blood_pressure', 'Blood Pressure'),
        ('blood_sugar', 'Blood Sugar'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    metric_type = models.CharField(max_length=20, choices=METRIC_TYPES)
    value = models.FloatField()
    unit = models.CharField(max_length=10)
    date = models.DateField()

    def __str__(self):
        return f"{self.user.username} - {self.metric_type} - {self.value}{self.unit}"




