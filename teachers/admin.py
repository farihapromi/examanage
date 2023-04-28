from django.contrib import admin
from .models import Staff, UserType, Department

# Register your models here.

#class StaffAdmin(admin.ModelAdmin):
#    fields = ('first_name','last_name','first_name_bangla','last_name_bangla','email','contact', 'address','designation', 'department', 'university', 'usertype')


#admin.site.register(Staff, StaffAdmin)
admin.site.register(UserType)
admin.site.register(Department)
admin.site.register(Staff)

