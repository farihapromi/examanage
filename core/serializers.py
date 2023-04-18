from rest_framework import serializers
from .models import Notice, NoticeQuesMod, ExamSystem

class NoticeSerializer(serializers.ModelSerializer):
    class Meta:
          model = Notice
          fields = ['id','memorial_no','semester', 'year', 'eng_year','date'] 


class NoticePostSerializer(serializers.ModelSerializer):
    class Meta:
          model = Notice
          fields = ['memorial_no','semester', 'year', 'eng_year', 'date'] 


class NoticeQuesModSerializer(serializers.ModelSerializer):
     class Meta:
          model = NoticeQuesMod
          fields = '__all__'

class NoticeQuesModPostSerializer(serializers.ModelSerializer):

     staff = serializers.PrimaryKeyRelatedField(queryset=NoticeQuesMod.objects.all(), many = True)

     class Meta:
          model = NoticeQuesMod
          fields = ['date', 'day','time', 'exam_year', 'semester', 'year','staff']

class ExamSystemSerializer(serializers.ModelSerializer):   
     class Meta:
          model = ExamSystem
          fields = ['semester', 'year']
