
from django.db import models

from django.contrib.auth.models import AbstractUser, Group, BaseUserManager
from django.utils.translation import gettext_lazy as _



# Create your models here.

class StaffUserManager(BaseUserManager):
    """Define a model manager for User model with no username field."""

    def _create_user(self, email, password=None, **extra_fields):
        """Create and save a User with the given email and password."""
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password=None, **extra_fields):
        """Create and save a SuperUser with the given email and password."""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)

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
     username = None
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

     USERNAME_FIELD='email'
     REQUIRED_FIELDS = []

     objects = StaffUserManager()

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
    


    

