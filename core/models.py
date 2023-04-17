from django.db import models
#from teachers.models import Staff

# Create your models here.

class ExamSystem(models.Model):
    semester = models.CharField(max_length=10, blank=True)
    year = models.CharField(max_length=10)

class Notice(models.Model):
    #name = models.CharField(max_length=100)
    memorial_no = models.CharField(max_length=100)
    semester = models.CharField(max_length=10)
    year = models.CharField(max_length=10)
    exam_year = models.CharField(max_length=4)
    date = models.DateField(auto_now_add=True)
    #notice_generator = models.ForeignKey(Staff, on_delete=models.CASCADE)

    def __str__(self):
        return self.memorial_no
    


class NoticeQuesMod(models.Model):
    #staff detail name, dept, university, address
    date = models.DateField()
    day = models.CharField(max_length=20)
    time = models.CharField(max_length=20)
    exam_system = models.ForeignKey(ExamSystem, on_delete=models.CASCADE)
    #exam_committee_member = 



    
    
