from django.urls import path
from . import views

urlpatterns = [
path('noticelist/', views.notice_list, name='notice_list'),
path('quesmodlist/', views.ques_mod_list, name='ques_mod_list'),
path('examsystemlist/', views.exam_system_list, name='exam_system_list'),
path('courselist/', views.course_list, name='course-list')

]