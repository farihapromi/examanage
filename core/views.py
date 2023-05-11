from django.shortcuts import render
from .serializers import *
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .models import *
from django.http import JsonResponse
from rest_framework import generics


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
    
@api_view(['GET', 'POST'])
def invigilation_schedule_list(request):
    if request.method == 'GET':
        invigilation_schedule = InvigilationSchedule.objects.all()
        serializer = InvigilationScheduleSerializer(invigilation_schedule, many = True)
        return Response(serializer.data)
    if request.method == 'POST':
        serializer = InvigilationScheduleSerializer(data = request.data)
        if serializer.is_valid():
           serializer.save()
           return Response(serializer.data, status=status.HTTP_201_CREATED) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

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