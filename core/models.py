from django.db import models
from teachers.models import Staff, Department

# Create your models here.



class ExamSystem(models.Model):
    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name='department')
    semester = models.CharField(max_length=10, blank=True)
    year = models.CharField(max_length=10)

    def __str__(self):
        if self.semester == '':
            return self.department.shortcode+' '+self.year+' year '
        return self.department.shortcode+' '+self.year+' year '+ self.semester + ' sem'
    

class Notice(models.Model):
    #name = models.CharField(max_length=100)
    memorial_no = models.CharField(max_length=100)
    exam_system = models.OneToOneField(ExamSystem, on_delete=models.CASCADE)
    exam_year = models.CharField(max_length=4)
    date = models.DateField(auto_now_add=True)
    #fk = models.ForeignKey(Staff, on_delete=models.SET_NULL)

    def __str__(self):
        return 'notice' + self.exam_system.year + ' year '+self.exam_system.semester + ' sem '+self.exam_year
    


class NoticeQuesMod(models.Model):
    #staff detail name, dept, university, address
    external_examiner = models.OneToOneField(Staff, on_delete=models.CASCADE, related_name='external_examiner')
    exam_committee_members = models.ManyToManyField(Staff)
    date = models.DateField()
    day = models.CharField(max_length=20)
    time = models.CharField(max_length=20)
    exam_year = models.CharField(max_length=10)
    exam_system = models.OneToOneField(ExamSystem,on_delete=models.CASCADE)


    #committee_member_name = member_name()
    #committee_member_designation = member_designation()
    #committee_member_department = member_department()

    def __str__(self):
        return 'NoticeQuesmod '+self.exam_year+'' + self.exam_system.year +' year '+self.exam_system.semester + ' sem'
    

class Course(models.Model):
    exam_system = models.ForeignKey(ExamSystem, on_delete=models.CASCADE, related_name='exam_system_course')
    course_code = models.CharField(max_length=100)
    course_name = models.CharField(max_length=200)
    


    def __str__(self):
        return self.course_code
    

class LabCourse(Course):
    credit = models.IntegerField()

    def __str__(self):
        return self.course_code

    

class ExamSchedule(models.Model):

    date_generation = models.DateField(auto_now_add=True)
    exam_year = models.CharField(max_length=10)  
    exam_date = models.DateField()
    course = models.OneToOneField(Course,on_delete=models.CASCADE)
    time = models.CharField(max_length=50)
    
    def __str__(self):
        return 'ExamSchedule'+self.exam_year +' '+self.course.course_code
    


class InvigilationSchedule(ExamSchedule):
    staff = models.ManyToManyField(Staff)
    
    def __str__(self):
        return 'InvigilationSchedule'+super().exam_year + ' '+ super().exam_system.year+' year '+ super().exam_system.semester+' sem'+super().course.course_code
    


    
class ThirdExaminerNotice(Notice):
    staff = models.ManyToManyField(Staff)
    course = models.ManyToManyField(Course)
    examinee_roll_no = models.CharField(max_length=500, blank=True)

    def __str__(self):
        return 'তৃতীয়_পরীক্ষক_নিয়োগ'+self.exam_year + ' '+ self.exam_system.year+' year '+ self.exam_system.semester+' sem'
    

class Tabulator(models.Model):
    tabulator = models.OneToOneField(Staff,on_delete=models.CASCADE)
    examinee_no = models.IntegerField()

class Stencil(models.Model):
    staff = models.OneToOneField(Staff, on_delete=models.CASCADE)
    stencil_no = models.IntegerField()




class ExamResponsibility(models.Model):
    exam_year = models.CharField(max_length=20)
    exam_system = models.OneToOneField(ExamSystem, on_delete=models.CASCADE)
    question_no = models.IntegerField()
    notice_ques_mod = models.ManyToManyField(NoticeQuesMod)
    staff_stencil = models.OneToOneField(Staff, on_delete=models.CASCADE, related_name='staff_stencil')
    tabulators = models.ManyToManyField(Tabulator)
   
    lab_exam_invigilator = models.ManyToManyField(InvigilationSchedule)
    examinee_no_viva = models.IntegerField()
    #chairman and members of exam committee in viva voce
    course_lab_tutorial = models.ManyToManyField(LabCourse, related_name='course_lab_tutorial')
    credit_lab_tutorial = models.ManyToManyField(LabCourse, related_name='credit_lab_tutorial')
    staff_lab_tutorial = models.ManyToManyField(Staff)
    student_no_lab_tutorial = models.IntegerField()


    def __str__(self):
        return 'Exam Responsibility '+ self.exam_system.year+' year '+self.exam_system.semester+' sem'+self.exam_year
    

class ExamBill(models.Model):
    examiner_bangla = models.OneToOneField(Staff,on_delete=models.CASCADE, related_name='examiner_bangla')
    examiner_english = models.OneToOneField(Staff,on_delete=models.CASCADE, related_name='examiner_english')
    exam_year = models.CharField(max_length=20)
    exam_system = models.ForeignKey(ExamSystem, on_delete=models.CASCADE, related_name='exam_system')
    exam_responsibility = models.ForeignKey(ExamResponsibility, on_delete=models.CASCADE, related_name='exam_responsibility')
    chairman = models.OneToOneField(Staff,on_delete=models.CASCADE, related_name='exam_committee_chairman')

    def __str__(self):
        return 'Exam Bill '+self.exam_year+' '+self.exam_system.year+' year '+ self.exam_system.semester+' sem '+self.examiner_english.first_name +' '+self.examiner_english.last_name+' '







    
