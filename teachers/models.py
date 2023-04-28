
from django.db import models

from django.contrib.auth.models import AbstractUser


# Create your models here.

class Department(models.Model):
      name = models.CharField(max_length=200)
      shortcode = models.CharField(max_length=20, unique=True)

      def __str__(self):
            return self.name


class UserType(models.Model):
        TEACHER = 1
        CHAIRMAN = 2
        EXAM_COMMITTEE_CHAIRMAN = 3
        EXAM_COMMITTEE_MEMBER = 4
        EXTERNAL = 5
        TYPE_CHOICES = (
            (TEACHER, 'Teacher'),
            (CHAIRMAN, 'Chairman'),
            (EXAM_COMMITTEE_CHAIRMAN, 'Exam Committee Chairman'),
            (EXAM_COMMITTEE_MEMBER, 'Exam Committee Member')
        )

        id = models.PositiveSmallIntegerField(choices= TYPE_CHOICES, primary_key=True)

        def __str__(self):
              return self.get_id_display()

class Staff(AbstractUser):
    first_name = models.CharField(max_length=500)
    last_name = models.CharField(max_length=500)
    first_name_bangla = models.CharField(max_length=500)
    last_name_bangla = models.CharField(max_length=500)
    email = models.CharField(max_length=100, unique=True ) 
    designation = models.CharField(max_length=100, blank = True)
    address = models.CharField(max_length=500)
    contact = models.CharField(max_length=14, unique= True)
    university = models.CharField(max_length=100)
    department = models.ForeignKey(Department, on_delete=models.CASCADE, null=True)
    usertype = models.ManyToManyField(UserType)

    def __str__(self):
          return self.first_name+' '+self.last_name
    





