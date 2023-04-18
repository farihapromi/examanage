from django.db import models
from teachers.models import Staff, Department

# Create your models here.

class ExamSystem(models.Model):
    fk = models.ForeignKey(Department, on_delete=models.CASCADE)
    semester = models.CharField(max_length=10, blank=True)
    year = models.CharField(max_length=10)

    def __str__(self):
        return self.fk.shortcode+" "+self.year+" year "+ self.semester + " sem"
    

class Notice(models.Model):
    #name = models.CharField(max_length=100)
    memorial_no = models.CharField(max_length=100)
    exam_system = models.ForeignKey(ExamSystem, on_delete=models.CASCADE)
    exam_year = models.CharField(max_length=4)
    date = models.DateField(auto_now_add=True)
    #fk = models.ForeignKey(Staff, on_delete=models.SET_NULL)

    def __str__(self):
        return 'notice' + self.exam_system.year + ' year '+self.exam_system.semester + ' sem'
    


class NoticeQuesMod(models.Model):
    #staff detail name, dept, university, address
    staff = models.ForeignKey(Staff, on_delete=models.DO_NOTHING)
    date = models.DateField()
    day = models.CharField(max_length=20)
    time = models.CharField(max_length=20)
    exam_year = models.CharField(max_length=10)
    exam_system = models.ForeignKey(ExamSystem, on_delete=models.CASCADE)


    #committee_member_name = member_name()
    #committee_member_designation = member_designation()
    #committee_member_department = member_department()

    def __str__(self):
        return 'NoticeQuesmod ' + self.exam_system.year +' year '+self.exam_system.semester + ' sem'

    





    
    
