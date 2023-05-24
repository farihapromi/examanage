from rest_framework import serializers
from .models import Staff, Department

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        # fields = ['id', 'name', 'shortcode']
        fields = '__all__'


class DepartmentPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        # fields = ['name', 'shortcode', 'shortcode_bengali']
        fields = '__all__'

class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        # fields = [ 'first_name', 'last_name','email', 'department', 'designation', 'university']
        fields = '__all__'

class TabulatorStaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = [ 'id', 'first_name', 'last_name', 'email', 'department', 'designation', 'university']

'''
class UserTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserType
        fields = ['id', 'TYPE_CHOICES']



     '''