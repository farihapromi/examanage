from django.shortcuts import render
from .serializers import StaffSerializer, StaffPostSerializer, DepartmentSerializer, DepartmentPostSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .models import Staff, Department
from django.contrib.auth.decorators import permission_required

# Create your views here.

# role based views

@permission_required('')

@api_view(['GET','POST'])
def teacher_list(request):

   if request.method == 'GET':
      staff = Staff.objects.all()
      serializer = StaffSerializer(staff, many = True)
      return Response(serializer.data)
   if request.method == 'POST':
      serializer = StaffPostSerializer(data = request.data)
      if serializer.is_valid():
         serializer.save()
         return Response(serializer.data, status=status.HTTP_201_CREATED) 
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
      

@api_view(['GET', 'PUT', 'DELETE'])
def teacher_detail(request, id):

   try:
      staff = Staff.objects.get(pk=id)
   except Staff.DoesNotExist:
      return Response(status=status.HTTP_404_NOT_FOUND)
   
   if request.method == 'GET':
      serializer = StaffSerializer(staff)
      return Response(serializer.data)
   elif request.method == 'PUT':
      serializer = StaffSerializer(data=request.data)
      if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   elif request.method == 'DELETE':
      staff.delete()
      return Response(status=status.HTTP_204_NO_CONTENT)
   


# @api_view(['GET','POST'])
# def usertype_list(request):
#    if request.method == 'GET':
#       usertype = UserType.objects.all()
#       serializer = UserTypeSerializer(usertype, many = True)
#       return Response(serializer.data)
#    if request.method == 'POST':
#       serializer = UserTypeSerializer(data = request.data)
#       if serializer.is_valid():
#          serializer.save()
#          return Response(serializer.data, status=status.HTTP_201_CREATED) 
#       return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   


@api_view(['GET', 'POST'])
def department_list(request):
   if request.method == 'GET':
      department = Department.objects.all()
      serializer = DepartmentSerializer(department, many=True)
      return Response(serializer.data)
   if request.method == 'POST':
      serializer = DepartmentPostSerializer(data = request.data)
      if serializer.is_valid():
         serializer.save()
         return Response(serializer.data, status=status.HTTP_201_CREATED) 
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   

@api_view(['GET','PUT', 'DELETE'])
def department_detail(request, id):

   try:
      department = Department.objects.get(pk=id)
   except Department.DoesNotExist:
      return Response(status=status.HTTP_404_NOT_FOUND)
   
   if request.method == 'GET':
      serializer = DepartmentSerializer(department)
      return Response(serializer.data)
   elif request.method == 'PUT':
      serializer = DepartmentSerializer(data = request.data)
      if serializer.is_valid():
         serializer.save()
         return Response(serializer.data)
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   elif request.method == 'DELETE':
      department.delete()
      return Response(status=status.HTTP_204_NO_CONTENT)

