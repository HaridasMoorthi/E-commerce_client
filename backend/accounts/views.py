from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate
from .models import User
from .serializers import UserSerializer, RegisterSerializer, get_tokens_for_user

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            tokens = get_tokens_for_user(user)
            return Response({
                'message': 'Account created successfully',
                'user': UserSerializer(user).data,
                'tokens': tokens
            }, status=status.HTTP_201_CREATED)
        return Response({
            'error': list(serializer.errors.values())[0][0] if serializer.errors else 'Registration failed'
        }, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email', '').strip().lower()
        password = request.data.get('password', '')

        if not email or not password:
            return Response({'error': 'Email and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

        # Authenticate with email
        user = authenticate(request, email=email, password=password)
        if user is None:
            # Fallback direct lookup for custom user model
            try:
                candidate = User.objects.get(email=email)
                if candidate.check_password(password):
                    user = candidate
            except User.DoesNotExist:
                pass

        if user is not None and user.is_active:
            tokens = get_tokens_for_user(user)
            return Response({
                'message': 'Sign in successful',
                'user': UserSerializer(user).data,
                'tokens': tokens
            }, status=status.HTTP_200_OK)

        return Response({'error': 'Invalid email address or password.'}, status=status.HTTP_401_UNAUTHORIZED)

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            'user': UserSerializer(request.user).data
        }, status=status.HTTP_200_OK)

class GoogleAuthView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email', '').strip().lower()
        name = request.data.get('name', 'Valued Client').strip()
        phone = request.data.get('phone', '').strip()

        if not email:
            return Response({'error': 'Google email is required.'}, status=status.HTTP_400_BAD_REQUEST)

        user, created = User.objects.get_or_create(
            email=email,
            defaults={
                'name': name or 'Valued Client',
                'phone': phone,
                'role': 'customer'
            }
        )

        tokens = get_tokens_for_user(user)
        return Response({
            'message': 'Google authentication successful',
            'user': UserSerializer(user).data,
            'tokens': tokens,
            'is_new_user': created
        }, status=status.HTTP_200_OK)
