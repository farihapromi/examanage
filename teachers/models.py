
from django.db import models

from django.contrib.auth.models import AbstractUser, Group


# Create your models here.



# chair_group = Group.objects.get(name='Department Chairman')

class Department(models.Model):
      name = models.CharField(max_length=200)
      shortcode = models.CharField(max_length=20, unique=True)
      shortcode_bangla = models.CharField(max_length=50, unique=True)

      def __str__(self):
            return self.name

'''
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
'''
class Staff(AbstractUser):
     GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
        )
     first_name = models.CharField(max_length=500)
   #   middle_name = models.CharField(max_length=500, blank= True)
     last_name = models.CharField(max_length=500, blank=True)
   #   first_name_in_bangla = models.CharField(max_length=500)
   #   middle_name_in_bangla = models.CharField(max_length=500, blank= True)
   #   last_name_in_bangla = models.CharField(max_length=500, blank=True)
   #   gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
     email = models.EmailField(unique=True ) 
     designation = models.CharField(max_length=100, blank = True)
   #   designation_in_bangla = models.CharField(max_length=100, blank = True)
     address = models.CharField(max_length=500)
   #   address_in_bangla = models.CharField(max_length=500)
   #   contact = models.CharField(max_length=14, unique= True)
     university = models.CharField(max_length=100)
   #   shortcode_of_university_in_bangla = models.CharField(max_length=100, blank=True)
     department = models.ForeignKey(Department, on_delete=models.CASCADE, null=True)
     is_department_chairman = models.BooleanField(default=False)
     is_external = models.BooleanField(default=False)
     #usertype = models.ManyToManyField(UserType)

   #   class Meta:
   #       unique_together = ('department', 'is_department_chairman')

     def __str__(self):
         if self.designation.lower() == 'professor':
            return f"Prof. {self.first_name} {self.last_name}"
         else:
            return f"{self.first_name} {self.last_name}"
         
   #   def save(self, *args, **kwargs):
   #      is_new = not self.pk  # check if this is a new object being created

   #      # call the original save method to create/update the object in the database
   #      super().save(*args, **kwargs)

   #      # check if this is a new staff member and if they are a department chairman
   #      if is_new and self.is_department_chairman:
   #          self.groups.add(chair_group)
         

# staff = Staff.objects.create_user(email = 'john@gmail.com',password='123',first_name='john',department
    


    

