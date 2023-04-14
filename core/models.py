from django.db import models
#from teachers.models import Staff

# Create your models here.

class Notice(models.Model):
    #name = models.CharField(max_length=100)
    memorial_no = models.CharField(max_length=100)
    semester = models.CharField(max_length=10)
    year = models.CharField(max_length=10)
    eng_year = models.CharField(max_length=4)
    date = models.DateField(auto_now_add=True)
    #notice_generator = models.ForeignKey(Staff, on_delete=models.CASCADE)

    def __str__(self):
        return self.memorial_no
    


class NoticeQuesMod(models.Model):
    #staff detail name, dept, university, address
  
    
    
