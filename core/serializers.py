from rest_framework import serializers
from .models import *
from teachers.serializers import *


class ExamSystemSerializer(serializers.ModelSerializer):  
     class Meta:
          model = ExamSystem
          fields = '__all__'

# class ExamSystemDetailSerializer(serializers.ModelSerializer):  
#      department = DepartmentSerializer() 
#      class Meta:
#           model = ExamSystem
#           fields = '__all__'

class SemesterSerializer(serializers.ModelSerializer):
     class Meta:
          model = Semester
          fields = '__all__'

class SemesterDetailSerializer(serializers.ModelSerializer):
     exam_system = ExamSystemSerializer()
     class Meta:
          model = Semester
          fields = '__all__'

class ExamCommitteeMemberSerializer(serializers.ModelSerializer):

    class Meta:
        model = ExamCommitteeMember
        fields = '__all__'

class ExamCommitteeMemberDetailSerializer(serializers.ModelSerializer):
    committee_members = TabulatorStaffSerializer()
    class Meta:
        model = ExamCommitteeMember
        fields = '__all__'

class ExamCommitteeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExamCommittee
        fields = '__all__'

class ExamCommitteeDetailSerializer(serializers.ModelSerializer):
    exam_system = ExamSystemSerializer()
#     exam_committee_member = StaffSerializer(many=True)

    class Meta:
        model = ExamCommittee
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

class NoticeQuesModDetailSerializer(serializers.ModelSerializer):
     sem = SemesterDetailSerializer()
     exam_committee = ExamCommitteeDetailSerializer()
     class Meta:
          model = NoticeQuestionModeration
          fields = '__all__'

class NoticeQuesModPostSerializer(serializers.ModelSerializer):

     # staff = serializers.StringRelatedField( many = True, read_only=True)

     class Meta:
          model = NoticeQuestionModeration
          fields = ['date', 'day','time', 'exam_year', 'semester', 'year','staff']


class ModerationReportSerializer(serializers.ModelSerializer):
     class Meta: 
          model = ModerationReport
          fields = '__all__'

class ModerationReportDetailSerializer(serializers.ModelSerializer):
     notice_question_moderation = NoticeQuesModDetailSerializer()
     present_members = StaffSerializer(many=True)
     class Meta: 
          model = ModerationReport
          fields = '__all__'

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

     class Meta:
          model = CourseSchedule
          fields = '__all__'



class CourseScheduleDetailSerializer(serializers.ModelSerializer):
     exam_schedule = ExamScheduleSerializer()
     course_code = CourseSerializer()
     invigilator = StaffSerializer(many=True)

     class Meta:
          model = CourseSchedule
          #fields = ['exam_system_course','course_code', 'course_name']
          fields = '__all__'

class LabExamInvigilationScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = LabExamInvigilationSchedule
        fields = '__all__'

class LabCourseScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = LabCourseSchedule
        fields = '__all__'

class LabExamInvigilatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = LabExamInvigilator
        fields = '__all__'
   

class ThirdExaminerNoticeSerializer(serializers.ModelSerializer):
     course = CourseSerializer(read_only = True, many = True)
     staff = serializers.StringRelatedField(many=True)
     exam_system = ExamSystemSerializer(read_only=True)
     class Meta:
          model = ThirdExaminerNotice
          fields = ['memorial_no', 'exam_year', 'date', 'examinee_roll_no', 'exam_system', 'staff', 'course']



class LabCourseSerializer(serializers.ModelSerializer):
     class Meta:
          model = LabCourse
          fields = '__all__'

# class ExamBillSerializer(serializers.ModelSerializer):
#      class Meta:
#           model = ExamBill
#           fields = '__all__'

class ExamResponsibilitySerializer(serializers.ModelSerializer):
     class Meta:
          model = ExamResponsibility
          fields = '__all__'

class StencilSerializer(serializers.ModelSerializer):
     class Meta:
          model = Stencil
          fields = '__all__'

class StencilDetailSerializer(serializers.ModelSerializer):
     sem = SemesterDetailSerializer()
     staff = StaffSerializer()
     class Meta:
          model = Stencil
          fields = '__all__'

class TabulatorSerializer(serializers.ModelSerializer):
     class Meta:
          model = Tabulator
          fields = '__all__'

class TabulatorDetailSerializer(serializers.ModelSerializer):
     
     sem = SemesterDetailSerializer()  
     tabulator = TabulatorStaffSerializer()  
     class Meta:
          model = Tabulator
          fields = '__all__'

class LabInvigilatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = LabInvigilator
        fields = '__all__'

class LabTutorialSerializer(serializers.ModelSerializer):
    class Meta:
        model = LabTutorial
        fields = '__all__'


