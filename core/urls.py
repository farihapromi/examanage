from django.urls import path
from . import views
from .views import index
from .views import react_page
from teachers.views import department_list

# from .views import ExamScheduleDetailView

urlpatterns = [
    path('deptlist/', department_list, name='department-list'),
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
#third examiner view url
path('third-examiner-notice-list/', views.third_examiner_notice_list, name='third_examiner_notice_list'),
path('third-examiner-list/', views.third_examiner_list, name='third_examiner_list'),
path('third-examiner-notice-detail-list/', views.ThirdExaminerNoticeDetailList.as_view(), name='third_examiner_notice_detail_list'),
path('third-examiner-detail-list/', views.ThirdExaminerDetailList.as_view(), name='third_examiner_detail_list'),
path('third-examiner-notice-detail-list/<int:notice_id>/third-examiner-detail-list/', views.ThirdExaminerList.as_view(), name='third-examiner-list'),
path('labcourselist/', views.lab_course_list , name = 'lab_course_list'),
path('examschedulelist/', views.exam_schedule_list , name = 'exam_schedule_list'),
path('examscheduledetail/', views.exam_schedule_detail , name = 'exam_schedule_detail'),
path('stencillist/', views.stencil_list , name = 'stencil_list'),
# path('exam-bills/', views.exam_bill_list , name = 'exam_bill_list'),
 path('exam-bills/', views.ExamBillView.as_view(), name='exam-bill-list'),
path('exam-bill-detail/', views.ExamBillDetailView.as_view(), name='exam-bill-detail-list'),
path('exam-responsibility-list/', views.exam_responsibility_list , name = 'exam_responsibility_list'),
# theory course exam schedule
path('invigilator/', views.invigilator_list , name = 'invigilator_list'),
path('tabulatorlist/', views.tabulator_list , name = 'tabulator_list'),
path('courseschedule/',views.course_schedule_list,name='course_schedule_list'),
path('coursescheduledetail/<int:id>',views.course_schedule_detail,name='course_schedule_detail'),
path('course-schedule-detail/', views.CourseScheduleDetailView.as_view(), name='course_schedule_detail_list'),
path('examscheduledetail/<int:exam_schedule_id>/coursescheduledetail/', views.CourseScheduleList.as_view()),

# lab course schedule url  LabExamInvigilatorListCreateView
path('lab-exam-schedule-list/', views.lab_exam_schedule_list , name = 'lab_exam_schedule_list'),
path('lab-exam-schedule-detail/', views.lab_exam_schedule_detail , name = 'lab_exam_schedule_detail'),
path('lab-course-schedule/',views.lab_course_schedule_list,name='lab_course_schedule_list'),
path('lab-course-schedule-detail/<int:id>',views.lab_course_schedule_detail,name='lab_course_schedule_detail'),
path('lab-course-schedule-detail/', views.LabCourseScheduleDetailView.as_view(), name='lab_course_schedule_detail_list'),
path('lab-exam-schedule-detail/<int:lab_exam_schedule_id>/lab-course-schedule-detail/', views.LabCourseScheduleList.as_view()),
path('lab-exam-invigilator/', views.LabExamInvigilatorListCreateView.as_view(), name='lab-invigilator-list-create'),
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
# exam committee details to be sent to exam office
path('committee-detail/<int:exam_committee_id>/committee-members-detail/', views.ExamCommitteeMemberDetailList.as_view(), name='exam-committee-member-role'),
# fetch all members of an exam committee for moderation report whether the members are present or not
path('fetch-committee-members/<int:moderation_id>/committee-members-detail/', views.FetchCommitteeMembersView.as_view(), name='fetch_committee_members'),
# fetch only committee members with member role for using in tabulator model 
path('exam-committees/<int:exam_committee_id>/committee-members-detail/', views.ExamCommitteeMemberList.as_view(), name='fetch_committee_members_role'),
#stencil, tabualtor, labinvigilator url
path('stencils/', views.StencilListCreateView.as_view(), name='stencil-list-create'),
path('stencil-detail/', views.StencilDetailView.as_view(), name='stencil-detail-list'),
path('tabulator-detail/', views.TabulatorDetailView.as_view(), name='tabulator-detail-list'),
path('tabulator-member-detail/', views.TabulatorMemberDetailView.as_view(), name='tabulator-member-detail-list'),
# path('tabulators-detail/', views.TabulatorExamCommiteeDetailView.as_view(), name='tabulators-detail-list'),
path('stencils/<int:pk>/', views.StencilRetrieveUpdateDestroyView.as_view(), name='stencil-retrieve-update-destroy'),
# path('tabulators/', views.TabulatorListCreateView.as_view(), name='tabulator-list-create'),
# path('tabulators/<int:pk>/', views.TabulatorRetrieveUpdateDestroyView.as_view(), name='tabulator-retrieve-update-destroy'),
# modified tabulator api url
path('tabulator-list/', views.TabulatorListView.as_view(), name='tabulator-list'),
path('tabulator-list-detail/', views.TabulatorListDetailView.as_view(), name='tabulator-list-detail'),
path('tabulator-info/', views.TabulatorInfoView.as_view(), name='tabulator-info-create'),
path('tabulator-info-detail/', views.TabulatorInfoDetailView.as_view(), name='tabulator-info-detail'),

path('lab-invigilators/', views.LabInvigilatorListCreateView.as_view(), name='lab-invigilator-list-create'),
path('lab-invigilators/<int:pk>/', views.LabInvigilatorRetrieveUpdateDestroyView.as_view(), name='lab-invigilator-retrieve-update-destroy'),
path('lab-tutorials/', views.LabTutorialListCreateView.as_view(), name='lab-tutorial-create'),
path('lab-tutorial-detail/', views.LabTutorialDetailView.as_view(), name='lab-tutorial-detail'),
# modified lab tutorial list model api
path('lab-tutorial-list/', views.LabTutorialListView.as_view(), name='lab-tutorial-list'),
path('lab-tutorial-list-detail/', views.LabTutorialListDetailView.as_view(), name='lab-tutorial-list-detail'),
path('lab-course-chief/', views.LabCourseChiefListView.as_view(), name='lab-course-chief'),
path('lab-course-chief-detail/', views.LabCourseChiefDetailView.as_view(), name='lab-course-chief-detail'),

# path('lab-tutorials/<int:pk>/', views.LabTutorialRetrieveUpdateDestroyView.as_view(), name = 'lab-tutorial-modify' ),
# exam reponsibility url
path('exam-responsibilities/', views.ExamResponsibilityListCreateView.as_view(), name='exam-responsibility-list-create'),
path('exam-responsibilities/<int:pk>/', views.ExamResponsibilityRetrieveUpdateDestroyView.as_view(), name='exam-responsibility-retrieve-update-destroy'),
path('exam-responsibility-detail/', views.ExamResponsibilityDetailView.as_view(), name='exam-responsibility-detail'),
path('exam-responsibility-detail/<int:pk>/', views.ExamResponsibilityRetrieveDetailView.as_view(), name='exam-responsibility-detail'),

# exam bill related url
path('exam-responsibility-detail/<int:responsibility_id>/present-members', views.present_members_view, name='present_members'),
path('moderation-reports-detail/<int:responsibility_id>/', views.moderation_reports_detail, name='moderation_reports_detail'),
# examiner list url
path('examiner-list/', views.ExaminerListView.as_view(), name='examiner-list'),
path('examiner-detail-list/', views.ExaminerListDetailView.as_view(), name='examiner-list-detail'),
path('course-examiner/', views.CourseExaminerView.as_view(), name='course-examiner'),
path('course-examiner-detail/', views.CourseExaminerDetailView.as_view(), name='course-examiner-detail'),
path('examiner/', views.ExaminerView.as_view(), name='examiner'),
path('examiner/<int:pk>/',views.ExaminerDetailView.as_view(), name='examiner-detail'),
path('examiner-detail-list/<int:examiner_list_id>/course-examiner-detail/', views.CourseExaminerList.as_view()),

# lab exam invigilation schedule 
# path('lab-exam-invigilation-schedules/', views.LabExamInvigilationScheduleViewSet.as_view({'get': 'list', 'post': 'create'})),
# path('lab-exam-invigilation-schedules/<int:pk>/', views.LabExamInvigilationScheduleViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'})),


]