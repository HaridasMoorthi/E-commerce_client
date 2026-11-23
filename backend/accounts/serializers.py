from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'name', 'phone', 'role', 'is_staff', 'created_at')
        read_only_fields = ('id', 'created_at', 'is_staff')

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ('name', 'email', 'phone', 'password')

    def create(self, validated_data):
        email = validated_data['email'].lower()
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError({"email": "A client with this email already exists."})
        
        user = User.objects.create_user(
            email=email,
            password=validated_data['password'],
            name=validated_data['name'],
            phone=validated_data.get('phone', ''),
            role='customer'
        )
        return user

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    refresh['name'] = user.name
    refresh['email'] = user.email
    refresh['role'] = user.role
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }
