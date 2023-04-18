from django.shortcuts import render
from .serializers import NoticePostSerializer, NoticeSerializer, NoticeQuesModSerializer, NoticeQuesModPostSerializer, ExamSystemSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .models import Notice, NoticeQuesMod, ExamSystem

# Create your views here.

@api_view(['GET', 'POST'])
def notice_list(request):
    if request.method == 'GET':
        notice = Notice.objects.all()
        serializer = NoticeSerializer(notice, many = True)
        return Response(serializer.data)
    if request.method == 'POST':
        serializer = NoticePostSerializer(data = request.data)
        if serializer.is_valid():
           serializer.save()
           return Response(serializer.data, status=status.HTTP_201_CREATED) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET', 'POST'])
def ques_mod_list(request):
    if request.method == 'GET':
        notice = NoticeQuesMod.objects.all()
        serializer = NoticeQuesModSerializer(notice, many = True)
        return Response(serializer.data)
    if request.method == 'POST':
        serializer = NoticeQuesModPostSerializer(data = request.data)
        if serializer.is_valid():
           serializer.save()
           return Response(serializer.data, status=status.HTTP_201_CREATED) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET', 'POST'])
def exam_system_list(request):
    if request.method == 'GET':
        system = ExamSystem.objects.all()
        serializer = ExamSystemSerializer(system, many = True)
        return Response(serializer.data)
    if request.method == 'POST':
        serializer = ExamSystemSerializer(data = request.data)
        if serializer.is_valid():
           serializer.save()
           return Response(serializer.data, status=status.HTTP_201_CREATED) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


