from rest_framework import serializers
from .models import *
from teachers.serializers import *


class ExamSystemSerializer(serializers.ModelSerializer):  
     #department = serializers.StringRelatedField(many=False) 
     class Meta:
          model = ExamSystem
          fields = '__all__'

class SemesterSerializer(serializers.ModelSerializer):
     class Meta:
          model = Semester
          fields = '__all__'

class SemesterDetailSerializer(serializers.ModelSerializer):
     exam_system = ExamSystemSerializer()
     class Meta:
          model = Semester
          fields = '__all__'
     
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
          model = NoticeQuestionModeration
          fields = '__all__'

class NoticeQuesModPostSerializer(serializers.ModelSerializer):

     staff = serializers.StringRelatedField( many = True, read_only=True)

     class Meta:
          model = NoticeQuestionModeration
          fields = ['date', 'day','time', 'exam_year', 'semester', 'year','staff']





class CourseSerializer(serializers.ModelSerializer):

     #exam_system_course = serializers.StringRelatedField(many=True)

     class Meta:
          model = Course
          #fields = ['exam_system_course','course_code', 'course_name']
          fields = '__all__'

class ExamScheduleSerializer(serializers.ModelSerializer):

     class Meta:
          model = ExamSchedule
          #fields = ['exam_system_course','course_code', 'course_name']
          fields = '__all__'

class ExamScheduleDetailSerializer(serializers.ModelSerializer):
     sem = SemesterDetailSerializer()
     #my edition
     # course_schedule = CourseScheduleSerializer(many=True, source='courses')
     class Meta:
          model = ExamSchedule
          #fields = ['exam_system_course','course_code', 'course_name']
          fields = '__all__'

class CourseScheduleSerializer(serializers.ModelSerializer):
      #my chnage
     invigilators = serializers.StringRelatedField(many=True, source='invigilation_schedule.invigilator')


     #exam_system_course = serializers.StringRelatedField(many=True)

     class Meta:
          model = CourseSchedule
          #my add
          # = ['id', 'exam_date', 'course_code', 'time', 'invigilators']

          #fields = ['exam_system_course','course_code', 'course_name']
          fields = '__all__'



class CourseScheduleDetailSerializer(serializers.ModelSerializer):
     exam_schedule = ExamScheduleSerializer()
     course_code = CourseSerializer()
     invigilator = StaffSerializer(many=True)

     class Meta:
          model = CourseSchedule
          #fields = ['exam_system_course','course_code', 'course_name']
          fields = '__all__'


   

class ThirdExaminerNoticeSerializer(serializers.ModelSerializer):
     course = CourseSerializer(read_only = True, many = True)
     staff = serializers.StringRelatedField(many=True)
     exam_system = ExamSystemSerializer(read_only=True)
     class Meta:
          model = ThirdExaminerNotice
          fields = ['memorial_no', 'exam_year', 'date', 'examinee_roll_no', 'exam_system', 'staff', 'course']

# class ExamScehduleSerializer(serializers.ModelSerializer):
#      class Meta:
#           model = ExamSchedule
#           fields = '__all__'



# class InvigilationScheduleCreateSerializer(serializers.ModelSerializer):
#      sem = SemesterDetailSerializer()
     
#      class Meta:
#           model = InvigilationSchedule
#           fields = '__all__'

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

