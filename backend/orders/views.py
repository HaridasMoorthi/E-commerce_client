import random
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.db.models import Q
from .models import Order
from .serializers import OrderSerializer

class OrderListCreateView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        user = request.user if request.user.is_authenticated else None
        
        # If admin, return all atelier orders
        if user and (user.is_staff or getattr(user, 'role', '') == 'admin'):
            orders = Order.objects.all()
            return Response(OrderSerializer(orders, many=True).data)

        # If authenticated customer, filter by user, email, or phone
        if user:
            orders = Order.objects.filter(
                Q(user=user) | 
                Q(customer_email__iexact=user.email) | 
                Q(customer_phone=user.phone)
            )
            return Response(OrderSerializer(orders, many=True).data)

        # Public guest with email query
        email = request.query_params.get('email', '').strip().lower()
        phone = request.query_params.get('phone', '').strip()
        if email or phone:
            q = Q()
            if email:
                q |= Q(customer_email__iexact=email)
            if phone:
                q |= Q(customer_phone__icontains=phone)
            orders = Order.objects.filter(q)
            return Response(OrderSerializer(orders, many=True).data)

        return Response([])

    def post(self, request):
        data = request.data.copy()
        
        # Auto-generate Order ID if not provided
        if not data.get('order_id'):
            data['order_id'] = f"OM-{random.randint(100000, 999999)}"
        if not data.get('awb_number'):
            data['awb_number'] = f"OM-{random.randint(900000000, 999999999)}"

        if request.user.is_authenticated:
            data['user'] = request.user.id
            if not data.get('customer_name'):
                data['customer_name'] = request.user.name
            if not data.get('customer_email'):
                data['customer_email'] = request.user.email
            if not data.get('customer_phone') and request.user.phone:
                data['customer_phone'] = request.user.phone

        serializer = OrderSerializer(data=data)
        if serializer.is_valid():
            order = serializer.save()
            return Response({
                'message': 'Order placed and securely saved to PostgreSQL database.',
                'order': OrderSerializer(order).data
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class OrderTrackingView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, identifier):
        clean_id = identifier.strip()
        from django.db.models import Q
        order = Order.objects.filter(
            Q(order_id__iexact=clean_id) |
            Q(awb_number__iexact=clean_id) |
            Q(customer_phone__icontains=clean_id)
        ).first()

        if order:
            return Response(OrderSerializer(order).data, status=status.HTTP_200_OK)

        return Response({'error': f'No order found matching "{identifier}"'}, status=status.HTTP_404_NOT_FOUND)
