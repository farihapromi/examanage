from django.contrib.auth.models import Group, Permission
from .models import Staff
from core.models import ExamCommittee


def create_groups_and_permissions_for_department_chairman():
    permissions = Permission.objects.filter(codename__in=['add_course',
                                                    'change_course',
                                                    'delete_course',
                                                    'view_course',
                                                    'add_coursechief',
                                                    'change_coursechief',
                                                    'delete_coursechief',
                                                    'view_coursechief',
                                                    'add_examcommittee',
                                                    'change_examcommittee',
                                                    'delete_examcommittee',
                                                    'view_examcommittee'])
    
    chair_group = Group.objects.create(name='Department Chairman')
    chair_group.permissions.add(*permissions)

    #department_chairman = Staff.objects.get(is_department_chairman =True)
    #department_chairman.groups.add(chair_group)

    try:
        department_chairman = Staff.objects.filter(is_department_chairman=True)
        for department_chairman in department_chairman:
            department_chairman.groups.add(chair_group)
    except Staff.DoesNotExist:
        pass  # do nothing if department_chairman does not exist



def create_groups_and_permissions_for_exam_committee_chairman():
    permissions = Permission.objects.filter(codename__in=['add_notice',
                                                    'change_notice',
                                                    'delete_notice',
                                                    'view_notice',
                                                    'add_course_examiner',
                                                    'change_course_examiner',
                                                    'delete_course_examiner',
                                                    'view_course_examiner',
                                                    'add_exam_bill',
                                                    'change_exam_bill',
                                                    'delete_exam_bill',
                                                    'view_exam_bill',
                                                    'add_examiner',
                                                    'change_examiner',
                                                    'delete_examiner',
                                                    'view_examiner',
                                                    'add_examiner_list',
                                                    'change_examiner_list',
                                                    'delete_examiner_list',
                                                    'view_examiner_list',
                                                    'add_exam_responsibility',
                                                    'change_exam_responsibility',
                                                    'delete_exam_responsibility',
                                                    'view_exam_responsibility',
                                                    'add_exam_schedule',
                                                    'change_exam_schedule',
                                                    'delete_exam_schedule',
                                                    'view_exam_schedule',
                                                    'add_invigilation_schedule',
                                                    'change_invigilation_schedule',
                                                    'delete_invigilation_schedule',
                                                    'view_invigilation_schedule',
                                                    'add_invigilator',
                                                    'change_invigilator',
                                                    'delete_invigilator',
                                                    'view_invigilator',
                                                    'add_lab_course',
                                                    'change_lab_course',
                                                    'delete_lab_course',
                                                    'view_lab_course',
                                                    'add_lab_exam_invigilation_schedule',
                                                    'change_lab_exam_invigilation_schedule',
                                                    'delete_lab_exam_invigilation_schedule',
                                                    'view_lab_exam_invigilation_schedule',
                                                    'add_notice_question_moderation',
                                                    'change_notice_question_moderation',
                                                    'delete_notice_question_moderation',
                                                    'view_notice_question_moderation',
                                                    'add_notice_question_moderation_committee_members',
                                                    'change_notice_question_moderation_committee_members',
                                                    'delete_notice_question_moderation_committee_members',
                                                    'view_notice_question_moderation_committee_members',
                                                    'add_stencil',
                                                    'change_stencil',
                                                    'delete_stencil',
                                                    'view_stencil',
                                                    'add_tabulator',
                                                    'change_tabulator',
                                                    'delete_tabulator',
                                                    'view_tabulator',
                                                    'add_third_examiner',
                                                    'change_third_examiner',
                                                    'delete_third_examiner',
                                                    'view_third_examiner',
                                                    'add_third_examiner_notice',
                                                    'change_third_examiner_notice',
                                                    'delete_third_examiner_notice',
                                                    'view_third_examiner_notice'])
    
    # chair_group = Group.objects.create(name='Department Chairman')
    # chair_group.permissions.add(*permissions)

    # Create a new group
    exam_committee_group = Group.objects.create(name='Exam Committee Chairman')
    exam_committee_group.permissions.add(*permissions)

    # # Get the chairmen of the ExamCommittee model
    # chairmen = ExamCommittee.objects.filter(role='chairman').values_list('staff_member', flat=True)

    # # Add the exam committee chairmen to the group
    # try:
    #     users = Staff.objects.filter(staff__in=chairmen)
    #     exam_committee_group.user_set.set(users)
    # except 



    # Get the exam committee chairman role
    chairman_role = 'chairman'

# Filter the ExamCommittee model by the chairman role
    chairmen = ExamCommittee.objects.filter(role=chairman_role)

# Get the staff members who are chairman
    chairmen_staff = [chairman.staff_member for chairman in chairmen]

# Add the chairmen staff to the group
    for staff_member in chairmen_staff:
        staff_member.groups.add(exam_committee_group)

