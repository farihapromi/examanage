from django.urls import path
from . import views

urlpatterns = [
#path('login_user/', views.login_user, name='login'),
path('list/', views.teacher_list, name='teacher-list'),
path('detail/<int:id>', views.teacher_detail, name='teacher_detail'),
path('deptlist/', views.department_list, name='department-list'),
path('deptdetail/<int:id>', views.department_detail, name='department_detail'),
path('usertypelist/', views.usertype_list, name='usertype_list')
]