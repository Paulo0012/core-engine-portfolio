from django.db import models

class DeviceStatus(models.Model):
    device_name = models.CharField(max_length=100) # Ex: "Raspberry-Pico-W"
    cpu_usage = models.FloatField()
    memory_usage = models.FloatField()
    is_online = models.BooleanField(default=True)
    last_ping = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.device_name} - {self.last_ping}"