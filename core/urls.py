from django.urls import path
from . import views

urlpatterns = [
path('noticelist/', views.notice_list, name='notice_list'),
path('quesmodlist/', views.ques_mod_list, name='ques_mod_list'),
path('examsystemlist/', views.exam_system_list, name='exam_system_list'),
path('courselist/', views.course_list, name='course_list'),
path('thirdexaminernoticelist/', views.third_examiner_notice_list, name='third_examiner_notice_list'),
path('labcourselist/', views.lab_course_list , name = 'lab_course_list'),
path('examschedulelist/', views.exam_schedule_list , name = 'exam_schedule_list'),
path('examscheduledetail/', views.exam_schedule_detail , name = 'exam_schedule_detail'),
path('stencillist/', views.stencil_list , name = 'stencil_list'),
path('exambilllist/', views.exam_bill_list , name = 'exam_bill_list'),
path('examresponsibilitylist/', views.exam_responsibility_list , name = 'exam_responsibility_list'),
path('invigilationlist', views.invigilation_schedule_list , name = 'invigilation_schedule_list'),
path('tabulatorlist/', views.tabulator_list , name = 'tabulator_list'),
path('courseschedule/',views.course_schedule_list,name='course_schedule_list'),
path('coursescheduledetail/<int:id>',views.course_schedule_detail,name='course_schedule_detail'),
path('examscheduledetail/<int:exam_schedule_id>/coursescheduledetail/', views.CourseScheduleList.as_view()),



]