from django.urls import path
from . import views

urlpatterns = [
path('noticelist/', views.notice_list, name='notice_list'),

]