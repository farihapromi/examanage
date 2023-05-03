from django.db import models
from teachers.models import Staff, Department
from django.core.exceptions import ValidationError

# Create your models here.



class ExamSystem(models.Model):
    department = models.ForeignKey(
        Department,
        to_field='shortcode', 
        on_delete=models.CASCADE, 
        related_name='department')
    year = models.CharField(max_length=10, unique=True)
    committee_members = models.ManyToManyField(
        Staff,
        through='ExamCommittee',
        related_name='committee_member'
    )


    def __str__(self):
        return self.department.shortcode+' '+self.year+' year '


class ExamCommittee(models.Model):
    ROLE_CHOICES = [
        ('chairman', 'Chairman'),
        ('member', 'Member'),
    ]
    exam_system = models.ForeignKey(ExamSystem, on_delete=models.CASCADE)
    staff_member = models.ForeignKey(Staff, on_delete=models.CASCADE)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    exam_year = models.CharField(max_length=10)

    class Meta:
        unique_together = ('exam_system', 'staff_member', 'exam_year')


    def clean(self):
        # Check if the maximum number of committee members have already been assigned
        committee_members = ExamCommittee.objects.filter(exam_system=self.exam_system, exam_year=self.exam_year)
        num_chairmen = len([c for c in committee_members if c.role == 'chairman'])
        num_members = len([c for c in committee_members if c.role == 'member'])
        if self.role == 'chairman' and num_chairmen >= 1:
            raise ValidationError('An exam committee can only have one chairman')
        elif self.role == 'member' and num_members >= 2:
            raise ValidationError('An exam committee can have at most two members')


    def __str__(self):
        return 'Exam Committee'+ self.exam_year+'_'+self.exam_system.year+' year '
      
    

class Semester(models.Model):
    exam_system = models.ForeignKey(ExamSystem, to_field= 'year', on_delete=models.CASCADE)
    semester = models.CharField(max_length=10)

    class Meta:
        unique_together = ('exam_system', 'semester')

    def __str__(self):
        return self.exam_system.department.shortcode+' '+self.exam_system.year+' year '+ self.semester + ' sem'
    

class Notice(models.Model):
    #name = models.CharField(max_length=100)
    memorial_no = models.CharField(max_length=100)
    sem = models.OneToOneField(Semester, on_delete=models.CASCADE)
    exam_year = models.CharField(max_length=4)
    date = models.DateField(auto_now_add=True)
    #fk = models.ForeignKey(Staff, on_delete=models.SET_NULL)

    def __str__(self):
        return 'notice' + self.sem.exam_system.year + ' year '+self.sem.semester + ' sem '+self.exam_year
    


class NoticeQuesMod(models.Model):
    #staff detail name, dept, university, address
    external_examiner = models.OneToOneField(Staff, on_delete=models.CASCADE, related_name='external_examiner')
    exam_committee_members = models.ManyToManyField(Staff)
    date = models.DateField()
    day = models.CharField(max_length=20)
    time = models.CharField(max_length=20)
    exam_year = models.CharField(max_length=10)
    sem = models.OneToOneField(Semester,on_delete=models.CASCADE)


    def __str__(self):
        return 'NoticeQuesmod '+self.exam_year+'' + self.sem.exam_system.year +' year '+self.sem.semester + ' sem'


class ModerationReport(models.Model):
    presented_members = models.IntegerField()

    def __str__(self):
        pass
    

class Course(models.Model):
    semester = models.ForeignKey(Semester, on_delete=models.CASCADE, related_name='semester_course')
    course_code = models.CharField(max_length=100)
    course_name = models.CharField(max_length=200)
    chief = models.ManyToManyField(Staff, through='CourseChief', related_name='course_chief')
    


    def __str__(self):
        return self.course_code
    

class CourseChief(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    chief = models.ForeignKey(Staff, on_delete=models.CASCADE)
    exam_year = models.CharField(max_length=4)

    def __str__(self):
        return self.course.course_code + '_chief_'+ self.chief.first_name+' '+self.chief.last_name
    

class LabCourse(Course):
    credit = models.IntegerField()

    def __str__(self):
        return self.course_code

    

class ExamSchedule(models.Model):
    sem = models.ForeignKey(Semester, on_delete=models.CASCADE)
    date_generation = models.DateField(auto_now_add=True)
    exam_year = models.CharField(max_length=10)  
    exam_date = models.DateField()
    course = models.OneToOneField(Course,on_delete=models.CASCADE)
    time = models.CharField(max_length=50)
    
    def __str__(self):
        return 'ExamSchedule'+self.exam_year +' '+self.course.course_code+self.sem.exam_system.year +' year '+self.sem.semester + ' sem'
    


class InvigilationSchedule(ExamSchedule):
    invigilators = models.ManyToManyField(Staff, through='Invigilator', related_name='invigilators')
    
    def __str__(self):
        return 'InvigilationSchedule'+super().exam_year + ' '+super().course.course_code
    

class Invigilator(models.Model):
    invigilation = models.ForeignKey(InvigilationSchedule, on_delete=models.CASCADE)
    invigilator = models.ForeignKey(Staff, on_delete=models.CASCADE)

    def __str__(self):
        return 'Invigilator_exam_' +self.invigilation.course.course_code +'_'+ self.invigilator.first_name+'_'+self.invigilator.last_name    
    
class ThirdExaminerNotice(Notice):
    staff = models.ManyToManyField(Staff)
    course = models.ManyToManyField(Course)
    examinee_roll_no = models.CharField(max_length=500, blank=True)

    def __str__(self):
        return 'তৃতীয়_পরীক্ষক_নিয়োগ'+self.exam_year 
    





class ExamResponsibility(models.Model):
    exam_year = models.CharField(max_length=20)
    sem = models.OneToOneField(Semester, on_delete=models.CASCADE)
    question_no = models.IntegerField()
    notice_ques_mod = models.ManyToManyField(NoticeQuesMod)
    staff_stencil = models.ManyToManyField(Staff,through='Stencil', related_name='staff_stencil')
    tabulators = models.ManyToManyField(Staff, through='Tabulator', related_name= 'tabulators')
   
    lab_exam_invigilator = models.ManyToManyField(InvigilationSchedule)
    examinee_no_viva = models.IntegerField()
    #chairman and members of exam committee in viva voce
    course_lab_tutorial = models.ManyToManyField(LabCourse, related_name='course_lab_tutorial')
    credit_lab_tutorial = models.ManyToManyField(LabCourse, related_name='credit_lab_tutorial')
    staff_lab_tutorial = models.ManyToManyField(Staff)
    student_no_lab_tutorial = models.IntegerField()


    def __str__(self):
        return 'Exam Responsibility '+ self.sem.exam_system.year+' year '+self.sem.semester+' sem'+self.exam_year
    

class Tabulator(models.Model):
    exam_responsibility = models.ForeignKey(ExamResponsibility, on_delete=models.CASCADE)
    tabulator = models.OneToOneField(Staff,on_delete=models.CASCADE)
    examinee_no = models.IntegerField()

class Stencil(models.Model):
    exam_responsibility = models.ForeignKey(ExamResponsibility, on_delete=models.CASCADE)
    staff = models.OneToOneField(Staff, on_delete=models.CASCADE)
    stencil_no = models.IntegerField()


class ExamBill(models.Model):
    examiner_bangla = models.OneToOneField(Staff,on_delete=models.CASCADE, related_name='examiner_bangla')
    examiner_english = models.OneToOneField(Staff,on_delete=models.CASCADE, related_name='examiner_english')
    exam_year = models.CharField(max_length=20)
    sem = models.ForeignKey(Semester, on_delete=models.CASCADE, related_name='sem')
    exam_responsibility = models.ForeignKey(ExamResponsibility, on_delete=models.CASCADE, related_name='exam_responsibility')
    chairman = models.OneToOneField(Staff,on_delete=models.CASCADE, related_name='exam_committee_chairman')

    def __str__(self):
        return 'Exam Bill '+self.exam_year+' '+self.sem.exam_system.year+' year '+ self.sem.semester+' sem '+self.examiner_english.first_name +' '+self.examiner_english.last_name+' '







    
