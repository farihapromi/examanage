from django.contrib import admin
from .models import Notice, NoticeQuesMod, ExamSystem

# Register your models here.

admin.site.register(Notice)
admin.site.register(NoticeQuesMod)
admin.site.register(ExamSystem)