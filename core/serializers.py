from rest_framework import serializers
from .models import Notice, NoticeQuesMod, ExamSystem, Course, ThirdExaminerNotice, ExamSchedule, InvigilationSchedule, LabCourse, ExamBill, ExamResponsibility, Stencil, Tabulator


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
     #department = serializers.StringRelatedField(many=False) 
     class Meta:
          model = ExamSystem
          fields = ['id','department','semester', 'year']


class CourseSerializer(serializers.ModelSerializer):

     #exam_system_course = serializers.StringRelatedField(many=True)

     class Meta:
          model = Course
          #fields = ['exam_system_course','course_code', 'course_name']
          fields = '__all__'

class ThirdExaminerNoticeSerializer(serializers.ModelSerializer):
     course = CourseSerializer(read_only = True, many = True)
     staff = serializers.StringRelatedField(many=True)
     exam_system = ExamSystemSerializer(read_only=True)
     class Meta:
          model = ThirdExaminerNotice
          fields = ['memorial_no', 'exam_year', 'date', 'examinee_roll_no', 'exam_system', 'staff', 'course']

class ExamScehduleSerializer(serializers.ModelSerializer):
     class Meta:
          model = ExamSchedule
          fields = '__all__'

class InvigilationScheduleSerializer(serializers.ModelSerializer):
     class Meta:
          model = InvigilationSchedule
          fields = '__all__'

class LabCourseSerializer(serializers.ModelSerializer):
     class Meta:
          model = LabCourse
          fields = '__all__'

class ExamBillSerializer(serializers.ModelSerializer):
     class Meta:
          model = ExamBill
          fields = '__all__'

class ExamResponsibilitySerializer(serializers.ModelSerializer):
     class Meta:
          model = ExamResponsibility
          fields = '__all__'

class StencilSerializer(serializers.ModelSerializer):
     class Meta:
          model = Stencil
          fields = '__all__'


class TabulatorSerializer(serializers.ModelSerializer):
     class Meta:
          model = Tabulator
          fields = '__all__'

