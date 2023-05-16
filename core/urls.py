from django.urls import path
from . import views
from .views import index
from .views import react_page

# from .views import ExamScheduleDetailView

urlpatterns = [
path('noticelist/', views.notice_list, name='notice_list'),
path('quesmodlist/', views.ques_mod_list, name='ques_mod_list'),
path('ques-mod-list-detail/', views.NoticeQuesModDetailView.as_view(), name='ques_mod_list'),
path('moderation-reports/', views.ModerationReportView.as_view(), name='moderation_report'),
# path('moderation-reports-create/', views.moderation_report_create, name='moderation_report_create'),
path('examsystemlist/', views.exam_system_list, name='exam_system_list'),
path('semester-list/', views.SemesterView.as_view(), name = 'semester_create'),
path('semester-detail-list/', views.SemesterDetailView.as_view(), name = 'semester_detail'),
path('courselist/', views.course_list, name='course_list'),
path('thirdexaminernoticelist/', views.third_examiner_notice_list, name='third_examiner_notice_list'),
path('labcourselist/', views.lab_course_list , name = 'lab_course_list'),
path('examschedulelist/', views.exam_schedule_list , name = 'exam_schedule_list'),
path('examscheduledetail/', views.exam_schedule_detail , name = 'exam_schedule_detail'),
path('stencillist/', views.stencil_list , name = 'stencil_list'),
path('exambilllist/', views.exam_bill_list , name = 'exam_bill_list'),
path('examresponsibilitylist/', views.exam_responsibility_list , name = 'exam_responsibility_list'),
# path('invigilationlist', views.invigilation_schedule_list , name = 'invigilation_schedule_list'),
path('tabulatorlist/', views.tabulator_list , name = 'tabulator_list'),
path('courseschedule/',views.course_schedule_list,name='course_schedule_list'),
path('coursescheduledetail/<int:id>',views.course_schedule_detail,name='course_schedule_detail'),
path('examscheduledetail/<int:exam_schedule_id>/coursescheduledetail/', views.CourseScheduleList.as_view()),
# path('invigilationschedule/',views.InvigilationScheduleList.as_view(),name='invigilationschedule')
# path('invigilationschedule/<int:course_schedule_id>/', views.InvigilationScheduleList.as_view()),
#path('examschedules/', views.ExamScheduleDetailView.as_view(), name='exam_schedule_detail'),
 #path('examschedules/<int:exam_schedule_id>/coursescheduledetail/', views.ExamScheduleDetailView.as_view(), name='exam_schedule_detail'),
path('', index, name='index'),
path('react/', react_page, name='react_page'),
path('exam-committees/', views.ExamCommitteeView.as_view(), name='exam-committee-list-create'),
path('committee-members/', views.ExamCommitteeMemberView.as_view(), name='exam_committee_member'),
path('committee-detail/',views.ExamCommiteeDetailView.as_view(),name='commitee-detail'),
path('committee-members-detail/', views.ExamCommitteeMemberDetailView.as_view(), name='exam_committee_member_detail'),
path('staff-list/', views.teacher_list, name='teacher-list'),
path('fetch-committee-members/<int:moderation_id>/', views.FetchCommitteeMembersView.as_view(), name='fetch_committee_members'),
# path('moderation-reports/create/', views.ModerationReportCreateView.as_view(), name='moderation_report_create'),

]