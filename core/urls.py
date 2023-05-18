from django.urls import path
from . import views
from .views import index
from .views import react_page

# from .views import ExamScheduleDetailView

urlpatterns = [
path('noticelist/', views.notice_list, name='notice_list'),
path('quesmodlist/', views.ques_mod_list, name='ques_mod_list'),
path('ques-mod-list-detail/', views.NoticeQuesModDetailView.as_view(), name='ques_mod_list'),
path('moderation-reports/', views.ModerationReportView.as_view(), name='moderation_reports'),
path('ques-mod-list-detail/<int:notice_question_moderation_id>/moderation-reports-detail/', views.ModerationReportList.as_view(), name='moderation_report'),
path('moderation-reports-detail/', views.ModerationReportDetailView.as_view(), name='moderation_report_detail'),
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
# path('exambilllist/', views.exam_bill_list , name = 'exam_bill_list'),
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
# fetch all members of an exam committee for moderation report whether the members are present or not
path('fetch-committee-members/<int:moderation_id>/', views.FetchCommitteeMembersView.as_view(), name='fetch_committee_members'),
# fetch only committee members with member role for using in tabulator model 
path('exam-committees/<int:exam_committee_id>/committee-members-detail/', views.ExamCommitteeMemberList.as_view(), name='fetch_committee_members_role'),
#stencil, tabualtor, labinvigilator url
path('stencils/', views.StencilListCreateView.as_view(), name='stencil-list-create'),
path('stencil-detail/', views.StencilDetailView.as_view(), name='stencil-detail-list'),
path('tabulator-detail/', views.TabulatorDetailView.as_view(), name='tabulator-detail-list'),
path('tabulator-member-detail/', views.TabulatorMemberDetailView.as_view(), name='tabulator-member-detail-list'),
# path('tabulators-detail/', views.TabulatorExamCommiteeDetailView.as_view(), name='tabulators-detail-list'),
path('stencils/<int:pk>/', views.StencilRetrieveUpdateDestroyView.as_view(), name='stencil-retrieve-update-destroy'),
path('tabulators/', views.TabulatorListCreateView.as_view(), name='tabulator-list-create'),
path('tabulators/<int:pk>/', views.TabulatorRetrieveUpdateDestroyView.as_view(), name='tabulator-retrieve-update-destroy'),
path('lab-invigilators/', views.LabInvigilatorListCreateView.as_view(), name='lab-invigilator-list-create'),
path('lab-invigilators/<int:pk>/', views.LabInvigilatorRetrieveUpdateDestroyView.as_view(), name='lab-invigilator-retrieve-update-destroy'),
path('lab-tutorials/', views.LabTutorialListCreateView.as_view(), name='lab-tutorial-create'),
path('lab-tutorials/<int:pk>/', views.LabTutorialRetrieveUpdateDestroyView.as_view(), name = 'lab-tutorial-modify' ),
# exam reponsibility url
path('exam-responsibilities/', views.ExamResponsibilityListCreateView.as_view(), name='exam-responsibility-list-create'),
path('exam-responsibilities/<int:pk>/', views.ExamResponsibilityRetrieveUpdateDestroyView.as_view(), name='exam-responsibility-retrieve-update-destroy'),
]