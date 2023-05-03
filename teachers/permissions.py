from django.contrib.auth.models import Group, Permission
from .models import Staff


def create_groups_and_permissions():
    permissions = Permission.objects.filter(codename__in=['add_coursechief',
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
        department_chairman = Staff.objects.get(is_department_chairman=True)
        department_chairman.groups.add(chair_group)
    except Staff.DoesNotExist:
        pass  # do nothing if department_chairman does not exist




