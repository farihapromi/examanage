from django.urls import path, include
from . import views
from .views import dashboard
from .views import redirect_home

urlpatterns = [
#path('login_user/', views.login_user, name='login'),
path('staff-list/', views.teacher_list, name='teacher-list'),
path('detail/<int:id>', views.teacher_detail, name='teacher_detail'),
path('deptlist/', views.department_list, name='department-list'),
path('deptdetail/<int:id>', views.department_detail, name='department_detail'),
# path('usertypelist/', views.usertype_list, name='usertype_list')
path('register/', views.register, name='register'),
path('accounts/', include('django.contrib.auth.urls')),
path('dashboard/', dashboard, name='dashboard'),
path('', redirect_home, name='redirect-home'),
]