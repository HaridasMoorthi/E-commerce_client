from django.urls import path
from .views import OrderListCreateView, OrderTrackingView

urlpatterns = [
    path('', OrderListCreateView.as_view(), name='orders-list-create'),
    path('track/<str:identifier>/', OrderTrackingView.as_view(), name='order-tracking'),
]
