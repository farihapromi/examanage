from django.shortcuts import render
from .serializers import *
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .models import *
from django.http import JsonResponse
from rest_framework import generics 
from teachers.models import *
from teachers.serializers import *



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
        notice = NoticeQuestionModeration.objects.all()
        serializer = NoticeQuesModSerializer(notice, many = True)
        return Response(serializer.data)
    if request.method == 'POST':
        serializer = NoticeQuesModSerializer(data = request.data)
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
    


@api_view(['GET', 'POST'])
def course_list(request):
    if request.method == 'GET':
        course = Course.objects.all()
        serializer = CourseSerializer(course, many = True)
        return Response(serializer.data)
    if request.method == 'POST':
        serializer = CourseSerializer(data = request.data)
        if serializer.is_valid():
           serializer.save()
           return Response(serializer.data, status=status.HTTP_201_CREATED) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET', 'POST'])
def third_examiner_notice_list(request):
    if request.method == 'GET':
        third_examiner_notice = ThirdExaminerNotice.objects.all()
        serializer = ThirdExaminerNoticeSerializer(third_examiner_notice, many = True)
        return Response(serializer.data)
    if request.method == 'POST':
        serializer = ThirdExaminerNoticeSerializer(data = request.data)
        if serializer.is_valid():
           serializer.save()
           return Response(serializer.data, status=status.HTTP_201_CREATED) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  
    



@api_view(['GET', 'POST'])
def lab_course_list(request):
    if request.method == 'GET':
        lab_course = LabCourse.objects.all()
        serializer = LabCourseSerializer(lab_course, many = True)
        return Response(serializer.data)
    if request.method == 'POST':
        serializer = LabCourseSerializer(data = request.data)
        if serializer.is_valid():
           serializer.save()
           return Response(serializer.data, status=status.HTTP_201_CREATED) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  
    

@api_view(['GET', 'POST'])
def exam_schedule_list(request):
    if request.method == 'GET':
        exam_schedule = ExamSchedule.objects.all()
        serializer = ExamScheduleSerializer(exam_schedule, many = True)
        return Response(serializer.data)
    if request.method == 'POST':
        serializer = ExamScheduleSerializer(data = request.data)
        if serializer.is_valid():
           serializer.save()
           return Response(serializer.data, status=status.HTTP_201_CREATED) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET', 'POST'])
def exam_schedule_detail(request):
    if request.method == 'GET':
        exam_schedule = ExamSchedule.objects.all()
        serializer = ExamScheduleDetailSerializer(exam_schedule, many=True)
        return Response(serializer.data)


#course schedule
@api_view(['GET', 'POST'])
def course_schedule_list(request):
    if request.method == 'GET':
        course_schedule = CourseSchedule.objects.all()
        serializer = CourseScheduleSerializer(course_schedule, many = True)
        return Response(serializer.data)
    if request.method == 'POST':
        serializer = CourseScheduleSerializer(data = request.data)
        if serializer.is_valid():
           serializer.save()
           return Response(serializer.data, status=status.HTTP_201_CREATED) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def course_schedule_detail(request, id):
    try:
      course_schedule = CourseSchedule.objects.get(pk=id)
    except CourseSchedule.DoesNotExist:
      return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        course_schedule = CourseSchedule.objects.get(pk=id)
        serializer = CourseScheduleDetailSerializer(course_schedule)
        return Response(serializer.data)  
    
class CourseScheduleDetailView(generics.ListAPIView):
    queryset = CourseSchedule.objects.all()
    serializer_class = CourseScheduleDetailSerializer
    
# lab course exam schedule schedule view

@api_view(['GET', 'POST'])
def lab_exam_schedule_list(request):
    if request.method == 'GET':
        lab_exam_schedule = LabExamInvigilationSchedule.objects.all()
        serializer = LabExamInvigilationScheduleSerializer(lab_exam_schedule, many = True)
        return Response(serializer.data)
    if request.method == 'POST':
        serializer = LabExamInvigilationScheduleSerializer(data = request.data)
        if serializer.is_valid():
           serializer.save()
           return Response(serializer.data, status=status.HTTP_201_CREATED) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET', 'POST'])
def lab_exam_schedule_detail(request):
    if request.method == 'GET':
        lab_exam_schedule = LabExamInvigilationSchedule.objects.all()
        serializer = LabExamInvigilationScheduleDetailSerializer(lab_exam_schedule, many=True)
        return Response(serializer.data)

@api_view(['GET', 'POST'])
def lab_course_schedule_list(request):
    if request.method == 'GET':
        lab_course_schedule = LabCourseSchedule.objects.all()
        serializer = LabCourseScheduleSerializer(lab_course_schedule, many = True)
        return Response(serializer.data)
    if request.method == 'POST':
        serializer = LabCourseScheduleSerializer(data = request.data)
        if serializer.is_valid():
           serializer.save()
           return Response(serializer.data, status=status.HTTP_201_CREATED) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def lab_course_schedule_detail(request, id):
    try:
      lab_course_schedule = LabCourseSchedule.objects.get(pk=id)
    except LabCourseSchedule.DoesNotExist:
      return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        lab_course_schedule = LabCourseSchedule.objects.get(pk=id)
        serializer = LabCourseScheduleDetailSerializer(lab_course_schedule)
        return Response(serializer.data)  
    
class LabCourseScheduleDetailView(generics.ListAPIView):
    queryset = LabCourseSchedule.objects.all()
    serializer_class = LabCourseScheduleDetailSerializer
    
@api_view(['GET', 'POST'])
def invigilator_list(request):
    if request.method == 'GET':
        invigilator = Invigilator.objects.all()
        serializer = InvigilatorSerializer(invigilator, many = True)
        return Response(serializer.data)
    if request.method == 'POST':
        serializer = InvigilatorSerializer(data = request.data)
        if serializer.is_valid():
           serializer.save()
           return Response(serializer.data, status=status.HTTP_201_CREATED) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def invigilator_detail(request, id):
    try:
      invigilator = Invigilator.objects.get(pk=id)
    except InvigilatorSerializer.DoesNotExist:
      return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        invigilator = Invigilator.objects.get(pk=id)
        serializer = InvigilatorDetailSerializer(invigilator)
        return Response(serializer.data)  
    

@api_view(['GET', 'POST'])
def stencil_list(request):
    if request.method == 'GET':
        stencil = Stencil.objects.all()
        serializer = StencilSerializer(stencil, many = True)
        return Response(serializer.data)
    if request.method == 'POST':
        serializer = StencilSerializer(data = request.data)
        if serializer.is_valid():
           serializer.save()
           return Response(serializer.data, status=status.HTTP_201_CREATED) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def tabulator_list(request):
    if request.method == 'GET':
        tabulator = Tabulator.objects.all()
        serializer = TabulatorSerializer(tabulator, many = True)
        return Response(serializer.data)
    if request.method == 'POST':
        serializer = TabulatorSerializer(data = request.data)
        if serializer.is_valid():
           serializer.save()
           return Response(serializer.data, status=status.HTTP_201_CREATED) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET', 'POST'])
def exam_responsibility_list(request):
    if request.method == 'GET':
        exam_responsibility = ExamResponsibility.objects.all()
        serializer = ExamResponsibilitySerializer(exam_responsibility, many = True)
        return Response(serializer.data)
    if request.method == 'POST':
        serializer = ExamResponsibilitySerializer(data = request.data)
        if serializer.is_valid():
           serializer.save()
           return Response(serializer.data, status=status.HTTP_201_CREATED) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class StencilDetailView(generics.ListAPIView):
    queryset = Stencil.objects.all()
    serializer_class = StencilDetailSerializer

class TabulatorDetailView(generics.ListAPIView):
    queryset = Tabulator.objects.all()
    serializer_class = TabulatorDetailSerializer

# @api_view(['GET', 'POST'])
# def exam_bill_list(request):
#     if request.method == 'GET':
#         exam_bill = ExamBill.objects.all()
#         serializer = ExamBillSerializer(exam_bill, many = True)
#         return Response(serializer.data)
#     if request.method == 'POST':
#         serializer = ExamBillSerializer(data = request.data)
#         if serializer.is_valid():
#            serializer.save()
#            return Response(serializer.data, status=status.HTTP_201_CREATED) 
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ExamBillView(generics.ListCreateAPIView):
    queryset = ExamBill.objects.all()
    serializer_class = ExamBillSerializer
    
class LabExamInvigilationScheduleListCreateView(generics.ListCreateAPIView):
    queryset = LabExamInvigilationSchedule.objects.all()
    serializer_class = LabExamInvigilationScheduleSerializer

class LabExamInvigilationScheduleRetrieveUpdateDestroyView(generics.ListAPIView):
    queryset = LabExamInvigilationSchedule.objects.all()
    serializer_class = LabExamInvigilationScheduleSerializer

class LabCourseScheduleListCreateView(generics.ListCreateAPIView):
    queryset = LabCourseSchedule.objects.all()
    serializer_class = LabCourseScheduleSerializer

class LabCourseScheduleList(generics.ListAPIView):
    serializer_class = LabCourseScheduleDetailSerializer

    def get_queryset(self):
        lab_exam_schedule_id = self.kwargs['lab_exam_schedule_id']
        return LabCourseSchedule.objects.filter(lab_exam_schedule_id=lab_exam_schedule_id)

class LabExamInvigilatorListCreateView(generics.ListCreateAPIView):
    queryset = LabExamInvigilator.objects.all()
    serializer_class = LabExamInvigilatorSerializer

class LabExamInvigilatorRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = LabExamInvigilator.objects.all()
    serializer_class = LabExamInvigilatorSerializer


class CourseScheduleList(generics.ListAPIView):
    serializer_class = CourseScheduleDetailSerializer

    def get_queryset(self):
        exam_schedule_id = self.kwargs['exam_schedule_id']
        return CourseSchedule.objects.filter(exam_schedule_id=exam_schedule_id)
    
class ModerationReportList(generics.ListAPIView):
    serializer_class = ModerationReportDetailSerializer

    def get_queryset(self):
        notice_question_moderation_id = self.kwargs['notice_question_moderation_id']
        return ModerationReport.objects.filter(notice_question_moderation_id=notice_question_moderation_id)
     
class SemesterView(generics.ListCreateAPIView):
    queryset = Semester.objects.all()
    serializer_class = SemesterSerializer

class SemesterDetailView(generics.ListCreateAPIView):
    queryset = Semester.objects.all()
    serializer_class = SemesterDetailSerializer
     #examshceudle my edit

class ExamScheduleDetailView(generics.RetrieveAPIView):
      queryset = ExamSchedule.objects.all()
      serializer_class = ExamScheduleDetailSerializer

class ExamCommitteeView(generics.ListCreateAPIView):
    queryset = ExamCommittee.objects.all()
    serializer_class = ExamCommitteeSerializer

class ExamCommiteeDetailView(generics.ListCreateAPIView):
    queryset = ExamCommittee.objects.all()
    serializer_class = ExamCommitteeDetailSerializer


class ExamCommitteeMemberView(generics.ListCreateAPIView):
    queryset = ExamCommitteeMember.objects.all()
    serializer_class = ExamCommitteeMemberSerializer 


class ExamCommitteeMemberDetailView(generics.ListCreateAPIView):
    queryset = ExamCommitteeMember.objects.all()
    serializer_class = ExamCommitteeMemberDetailSerializer

class NoticeQuesModDetailView(generics.ListCreateAPIView):
    queryset = NoticeQuestionModeration.objects.all()
    serializer_class = NoticeQuesModDetailSerializer 

class ModerationReportView(generics.ListCreateAPIView):
    queryset = ModerationReport.objects.all()
    serializer_class = ModerationReportSerializer

# views for examiner list

class ExaminerListView(generics.ListCreateAPIView):
    queryset = ExaminerList.objects.all()
    serializer_class = ExaminerListSerializer

class ExaminerListDetailView(generics.ListAPIView):
    queryset = ExaminerList.objects.all()
    serializer_class = ExaminerListDetailSerializer

class CourseExaminerView(generics.ListCreateAPIView):
    queryset = CourseExaminer.objects.all()
    serializer_class = CourseExaminerSerializer

class CourseExaminerList(generics.ListAPIView):
    serializer_class = CourseExaminerDetailSerializer

    def get_queryset(self):
        examiner_list_id = self.kwargs['examiner_list_id']
        return CourseExaminer.objects.filter(examiner_list_id=examiner_list_id)

class CourseExaminerDetailView(generics.ListAPIView):
    queryset = CourseExaminer.objects.all()
    serializer_class = CourseExaminerDetailSerializer

class ExaminerView(generics.ListCreateAPIView):
    queryset = Examiner.objects.all()
    serializer_class = ExaminerSerializer

class ExaminerDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Examiner.objects.all()
    serializer_class = ExaminerSerializer

    # views for examiner list ends here

@api_view(['GET'])
def moderation_reports(request):
    moderation_id = request.GET.get('moderation_id')
    moderation_report = ModerationReport.objects.filter(notice_question_moderation_id=moderation_id).first()
    serializer = ModerationReportDetailSerializer(moderation_report)
    return Response(serializer.data)

class ModerationReportDetailView(generics.ListCreateAPIView):
    # queryset = ModerationReport.objects.all()
    serializer_class = ModerationReportDetailSerializer
    def get_queryset(self):
        moderation_id = self.request.query_params.get('moderation_id')
        if moderation_id is not None:
            return ModerationReport.objects.filter(notice_question_moderation_id=moderation_id)
        return ModerationReport.objects.all()

  

@api_view(['GET','POST'])
def teacher_list(request):

   if request.method == 'GET':
      staff = Staff.objects.all()
      serializer = StaffSerializer(staff, many = True)
      return Response(serializer.data)
  

from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views import View
from .models import NoticeQuestionModeration, ExamCommitteeMember

class FetchCommitteeMembersView(View):
    def get(self, request, moderation_id):
        moderation = get_object_or_404(NoticeQuestionModeration, id=moderation_id)
        committee_members = ExamCommitteeMember.objects.filter(exam_committee__exam_system=moderation.sem.exam_system, exam_committee__exam_year=moderation.exam_year)

        members_data = []
        for member in committee_members:
            members_data.append({
                'id': member.committee_members.id,
                'first_name': member.committee_members.first_name,
                'last_name': member.committee_members.last_name,
            })

        return JsonResponse(members_data, safe=False)
    
def moderation_reports_detail(request, responsibility_id):
    moderation_report = get_object_or_404(ModerationReport, notice_question_moderation__id=responsibility_id)

    serializer = ModerationReportDetailSerializer(moderation_report)
    return JsonResponse(serializer.data)

class StencilListCreateView(generics.ListCreateAPIView):
    queryset = Stencil.objects.all()
    serializer_class = StencilSerializer

class StencilRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Stencil.objects.all()
    serializer_class = StencilSerializer

# class TabulatorListCreateView(generics.ListCreateAPIView):
#     queryset = Tabulator.objects.all()
#     serializer_class = TabulatorSerializer

# class TabulatorRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Tabulator.objects.all()
#     serializer_class = TabulatorSerializer

class TabulatorMemberDetailView(generics.ListCreateAPIView):
    queryset = Tabulator.objects.all()
    serializer_class = TabulatorDetailSerializer


class LabInvigilatorListCreateView(generics.ListCreateAPIView):
    queryset = LabInvigilator.objects.all()
    serializer_class = LabInvigilatorSerializer

class LabInvigilatorRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = LabInvigilator.objects.all()
    serializer_class = LabInvigilatorSerializer

class LabTutorialListCreateView(generics.ListCreateAPIView):
    queryset = LabTutorial.objects.all()
    serializer_class = LabTutorialSerializer

class LabTutorialDetailView(generics.ListAPIView):
    queryset = LabTutorial.objects.all()
    serializer_class = LabTutorialDetailSerializer  

# modified labtutoriallist and labcoursechief model view

class LabTutorialListView(generics.ListCreateAPIView):
    queryset = LabTutorialList.objects.all()
    serializer_class = LabTutorialListSerializer

class LabTutorialListDetailView(generics.ListAPIView):
    queryset = LabTutorialList.objects.all()
    serializer_class = LabTutorialListDetailSerializer

class LabCourseChiefListView(generics.ListCreateAPIView):
    queryset = LabCourseChief.objects.all()
    serializer_class = LabCourseChiefSerializer

class LabCourseChiefDetailView(generics.ListAPIView):
    queryset = LabCourseChief.objects.all()
    serializer_class = LabCourseChiefDetailSerializer  

# tabulator modified views

class TabulatorListView(generics.ListCreateAPIView):
    queryset = TabulatorList.objects.all()
    serializer_class = TabulatorListSerializer

class TabulatorListDetailView(generics.ListAPIView):
    queryset = TabulatorList.objects.all()
    serializer_class = TabulatorListDetailSerializer

class TabulatorInfoView(generics.ListCreateAPIView):
    queryset = TabulatorInfo.objects.all()
    serializer_class = TabulatorInfoSerializer

class TabulatorInfoDetailView(generics.ListAPIView):
    queryset = TabulatorInfo.objects.all()
    serializer_class = TabulatorInfoDetailSerializer

class ExamResponsibilityListCreateView(generics.ListCreateAPIView):
    queryset = ExamResponsibility.objects.all()
    serializer_class = ExamResponsibilitySerializer

class ExamResponsibilityRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ExamResponsibility.objects.all()
    serializer_class = ExamResponsibilitySerializer

class ExamResponsibilityDetailView(generics.ListAPIView):
    queryset = ExamResponsibility.objects.all()
    serializer_class = ExamResponsibilityDetailSerializer


from django.http import JsonResponse
from django.views.decorators.http import require_GET

@require_GET
def fetch_committee_members(request):
    exam_committee_id = request.GET.get('exam_committee_id')

    try:
        exam_committee = ExamCommittee.objects.get(id=exam_committee_id)
        members = exam_committee.exam_committee_member.filter(role='member')
        member_data = [{'id': member.id, 'name': member.first_name} for member in members]
        return JsonResponse({'members': member_data})
    except ExamCommittee.DoesNotExist:
        return JsonResponse({'error': 'Exam committee not found'}, status=404)
    

class ExamCommitteeMemberList(generics.ListAPIView):
    serializer_class = ExamCommitteeMemberDetailSerializer

    def get_queryset(self):
        exam_committee_id = self.kwargs['exam_committee_id']
        return ExamCommitteeMember.objects.filter(exam_committee_id=exam_committee_id, role='member')

# fetch present members for checking in exam bill form against staff
def present_members_view(request, responsibility_id):
    try:
        exam_responsibility = ExamResponsibility.objects.get(id=responsibility_id)
        present_members = exam_responsibility.moderation_report.present_members.values_list('id', flat=True)
        # Modify the above line to fetch the appropriate present members based on your data structure

        return JsonResponse({'present_members': list(present_members)})
    except ExamResponsibility.DoesNotExist:
        return JsonResponse({'error': 'Exam responsibility does not exist'}, status=404)

# @api_view(['GET'])
# def exam_schedule_invigilators(request, exam_schedule_id):
#     course_schedules = CourseSchedule.objects.filter(exam_schedule_id=exam_schedule_id)
#     invigilators = {}
#     for course_schedule in course_schedules:
#         invigilator_list = []
#         for invigilation_schedule in course_schedule.invigilation_schedule.all():
#             invigilator_list.append(str(invigilation_schedule.invigilator))
#         invigilators[course_schedule.id] = invigilator_list
#     return Response(invigilators)


from django.shortcuts import render

def index(request):
    return render(request, 'index.html')

def react_page(request):
    return render(request, 'react_page.html')

