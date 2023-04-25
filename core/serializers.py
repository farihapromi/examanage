from rest_framework import serializers
from .models import Notice, NoticeQuesMod, ExamSystem, Course, ThirdExaminerNotice, ExamSchedule, InvigilationSchedule


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

     staff = serializers.StringRelatedField( many = True, read_only=True)

     class Meta:
          model = NoticeQuesMod
          fields = ['date', 'day','time', 'exam_year', 'semester', 'year','staff']


class ExamSystemSerializer(serializers.ModelSerializer):  
     department = serializers.StringRelatedField(many=False) 
     class Meta:
          model = ExamSystem
          fields = ['department','semester', 'year']


class CourseSerializer(serializers.ModelSerializer):

     exam_system_course = serializers.StringRelatedField(many=True)

     class Meta:
          model = Course
          fields = ['exam_system_course','course_code', 'course_name']