import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from accounts.models import User
from orders.models import Order

def seed():
    print("Seeding initial data into PostgreSQL...")

    # 1. Admin Superuser
    admin_user, created = User.objects.get_or_create(
        email='admin@oldmoney.luxury',
        defaults={
            'name': 'Old Money Administrator',
            'role': 'admin',
            'is_staff': True,
            'is_superuser': True
        }
    )
    if created or not admin_user.has_usable_password():
        admin_user.set_password('admin123')
        admin_user.save()
        print(f"Created Admin user: {admin_user.email}")
    else:
        print(f"Admin user already exists: {admin_user.email}")

    # 2. Client User (Harid)
    client_user, created = User.objects.get_or_create(
        email='harid3837@gmail.com',
        defaults={
            'name': 'Harid (Verified Client)',
            'phone': '+91 93441 94214',
            'role': 'customer'
        }
    )
    if created or not client_user.has_usable_password():
        client_user.set_password('client123')
        client_user.save()
        print(f"Created Client user: {client_user.email}")
    else:
        print(f"Client user already exists: {client_user.email}")

    # 3. Seed Order OM-842910
    order_id = 'OM-842910'
    if not Order.objects.filter(order_id=order_id).exists():
        Order.objects.create(
            order_id=order_id,
            user=client_user,
            customer_name='Vikramaditya Oberoi',
            customer_phone='+91 98765 43210',
            customer_email='harid3837@gmail.com',
            street_address='A-42 Connaught Place, Block B',
            city='New Delhi',
            pincode='110001',
            total_amount=10998.00,
            payment_mode='UPI Instant',
            status='DISPATCHED',
            awb_number='OM-948210384',
            carrier='Blue Dart Priority Air Express',
            items=[
                {
                    'product': {
                        'title': 'Egyptian Giza Cotton Spread Collar French-Cuff Dress Shirt',
                        'brand': 'Brioni Milano',
                        'price': 4499,
                        'images': ['https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?auto=format&fit=crop&w=400&q=80']
                    },
                    'selectedSize': '40 (15.75)',
                    'selectedColor': 'Crisp Optic White',
                    'quantity': 1
                },
                {
                    'product': {
                        'title': 'High-Waisted Double-Pleated Wool Flannel Gurkha Trousers',
                        'brand': 'Ralph Lauren Purple Label',
                        'price': 6499,
                        'images': ['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=400&q=80']
                    },
                    'selectedSize': '32',
                    'selectedColor': 'Charcoal Melange Flannel',
                    'quantity': 1
                }
            ]
        )
        print(f"Seeded Order: #{order_id}")
    else:
        print(f"Order #{order_id} already exists in PostgreSQL.")

    print("Seeding completed successfully.")

if __name__ == '__main__':
    seed()
