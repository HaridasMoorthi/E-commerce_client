from django.db import models
from accounts.models import User

class Order(models.Model):
    STATUS_CHOICES = (
        ('CONFIRMED', 'Order Placed & Verified'),
        ('PACKED', 'Quality Checked & Packed'),
        ('DISPATCHED', 'In Transit / Dispatched'),
        ('DELIVERED', 'Delivered & Handed Over'),
    )

    order_id = models.CharField(max_length=50, unique=True, db_index=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='orders')
    customer_name = models.CharField(max_length=255)
    customer_phone = models.CharField(max_length=30, db_index=True)
    customer_email = models.EmailField(blank=True, default='')
    
    street_address = models.TextField()
    city = models.CharField(max_length=100)
    pincode = models.CharField(max_length=20)
    
    total_amount = models.DecimalField(max_digits=12, decimal_places=2)
    payment_mode = models.CharField(max_length=50, default='UPI')
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='DISPATCHED')
    
    awb_number = models.CharField(max_length=50, blank=True, default='OM-948210384')
    carrier = models.CharField(max_length=100, default='Blue Dart Priority Air Express')
    items = models.JSONField(default=list)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Order #{self.order_id} - {self.customer_name} (₹{self.total_amount})"
