from rest_framework import serializers
from .models import Staff, Department, UserType

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['id', 'name', 'shortcode']

class DepartmentPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['name', 'shortcode']

class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = ['id', 'first_name', 'last_name','email', 'department', 'designation', 'university', 'contact', 'usertype']

class StaffPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = [ 'password', 'username', 'first_name', 'last_name', 'email', 'department', 'designation', 'university','contact', 'usertype']


class UserTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserType
        fields = ['id', 'TYPE_CHOICES']



     