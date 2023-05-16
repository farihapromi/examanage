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
    
# @api_view(['GET', 'POST'])
# def invigilation_schedule_list(request):
#     if request.method == 'GET':
#         invigilation_schedule = InvigilationSchedule.objects.all()
#         serializer = InvigilationScheduleSerializer(invigilation_schedule, many = True)
#         return Response(serializer.data)
#     if request.method == 'POST':
#         serializer = InvigilationScheduleSerializer(data = request.data)
#         if serializer.is_valid():
#            serializer.save()
#            return Response(serializer.data, status=status.HTTP_201_CREATED) 
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

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
    


@api_view(['GET', 'POST'])
def exam_bill_list(request):
    if request.method == 'GET':
        exam_bill = ExamBill.objects.all()
        serializer = ExamBillSerializer(exam_bill, many = True)
        return Response(serializer.data)
    if request.method == 'POST':
        serializer = ExamBillSerializer(data = request.data)
        if serializer.is_valid():
           serializer.save()
           return Response(serializer.data, status=status.HTTP_201_CREATED) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

# def course_schedule_options(request, schedule_id):
#     course_schedules = CourseSchedule.objects.filter(exam_schedule=schedule_id)
#     data = []
#     for schedule in course_schedules:
#         data.append({
#             'id': schedule.id,
#             'label': schedule.course_code.code + ' - ' + str(schedule.exam_date) + ' - ' + schedule.time,
#         })
#     return JsonResponse({'data': data})


class CourseScheduleList(generics.ListAPIView):
    serializer_class = CourseScheduleDetailSerializer

    def get_queryset(self):
        exam_schedule_id = self.kwargs['exam_schedule_id']
        return CourseSchedule.objects.filter(exam_schedule_id=exam_schedule_id)
     
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

    # def create(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_create(serializer)
    #     return Response(serializer.data, status=status.HTTP_201_CREATED)

# @api_view(['GET','POST'])
# def moderation_report_create(request):
#     if request.method == 'GET':
#       mod_report = ModerationReport.objects.all()
#       serializer = ModerationReportSerializer(mod_report, many = True)
#       return Response(serializer.data)
#     if request.method == 'POST':
#       serializer = ModerationReportSerializer(data = request.data)
#       if serializer.is_valid():
#          serializer.save()
#          return Response(serializer.data, status=status.HTTP_201_CREATED) 
#       return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
    


# @api_view(['GET'])
# def course_invigilator_schedule(request):
#     if request.method == 'GET':
#         invigilator_schedule = Invigilator.objects.all()
#         serializer = InvigilationScheduleSerializer(invigilator_schedule, many = True)
#         return Response(serializer.data)
# class InvigilationScheduleList(generics.ListAPIView):
    # serializer_class = InvigilationScheduleSerializer
    # def get_queryset(self):
    #     course_schedule_id = self.kwargs['course_schedule_id']
    #     return Invigilator.objects.filter(course_schedule_id=course_schedule_id)
    


#my add
# class CourseScheduleDetailView(generics.RetrieveAPIView):
#     queryset = CourseSchedule.objects.all()
#     serializer_class = CourseScheduleSerializer

#     def retrieve(self, request, *args, **kwargs):
#         instance = self.get_object()
#         serializer = self.get_serializer(instance)
#         data = serializer.data
        
#         # Include invigilator data
#         invigilator_data = []
#         for invigilator in instance.invigilator.all():
#             invigilator_data.append({
#                 'id': invigilator.id,
#                 'first_name': invigilator.first_name,
#                 'last_name': invigilator.last_name,
#                 # include any other relevant invigilator fields
#             })
        
#         data['invigilator'] = invigilator_data
#         return Response(data)



#my eidiotnn
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




#login signup


from django.shortcuts import render,HttpResponse,redirect
from django.contrib.auth.models import User
from teachers.models import Staff
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.decorators import login_required

# Create your views here.
# @login_required(login_url='login')

# def HomePage(request):
#     return render(request,'home.html')
# def SignupPage(request):
#     if request.method =='POST':
#         uname=request.POST.get('username')
#         email=request.POST.get('email')
#         pass1=request.POST.get('password1')
#         pass2=request.POST.get('password2')
#         # @login_required(login_url='login')
#         # my_user=User.objects(uname,email,pass1)
#         if pass1!=pass2:
#             return HttpResponse("Your password and confrom password are not Same!!")
#         else:

#             my_user=Staff.objects.create_user(uname,email,pass1)
#             my_user.save()
            
#             return redirect('home')
        
#         # my_user.save()v cc
#         # return HttpResponse("user has been created successfully")
      

#         print(uname,email,pass1,pass2)
#     return render(request,'signup.html')


# def LoginPage(request):
#      if request.method=='POST':
#         username=request.POST.get('username')
#         pass1=request.POST.get('pass')
#         user=authenticate(request,username=username,password=pass1)
#         if user is not None:
#             login(request,user)
#             return redirect('home')
#         else:
#             return HttpResponse ("Username or Password is incorrect!!!")
        
    
#      return render(request,'login.html')
# def LogoutPage(request):
#     logout(request)
#     return redirect('login')

#for react connecting

from django.shortcuts import render

def index(request):
    return render(request, 'index.html')

def react_page(request):
    return render(request, 'react_page.html')

