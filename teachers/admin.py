from django.contrib import admin
from .models import Staff, Department

# Register your models here.

#class StaffAdmin(admin.ModelAdmin):
#    fields = ('first_name','last_name','first_name_bangla','last_name_bangla','email','contact', 'address','designation', 'department', 'university', 'usertype')
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model


class CustomUserAdmin(UserAdmin):
    """Define admin model for custom User model with no username field."""
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal info'), {'fields': ('first_name', 'last_name', 'designation', 'address', 'university', 'department', 'is_department_chairman', 'is_external')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser',
                                       'groups', 'user_permissions')}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'first_name', 'last_name', 'designation', 'address', 'university', 'department', 'is_department_chairman', 'is_external'),
        }),
    )
    list_display = ('email', 'first_name', 'last_name', 'is_staff')
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email',)


admin.site.register(get_user_model(), CustomUserAdmin)

#admin.site.register(Staff, StaffAdmin)
#admin.site.register(UserType)
admin.site.register(Department)
# admin.site.register(Staff)

