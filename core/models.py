from django.db import models
from teachers.models import Staff, Department
from django.core.exceptions import ValidationError

# Create your models here.



class ExamSystem(models.Model):
    YEAR_CHOICES = (
        ('1st','1st'),
        ('2nd','2nd'),
        ('3rd','3rd'),
        ('4th','4th'),
    )
    YEAR_CHOICES_in_BENGALI = (
        ('১ম','১ম'),
        ('২য়','২য়'),
        ('৩য়','৩য়'),
        ('৪র্থ','৪র্থ'),
    )
    department = models.ForeignKey(
        Department,
        to_field='shortcode', 
        on_delete=models.CASCADE, 
        related_name='department')
    year = models.CharField(max_length=10, choices=YEAR_CHOICES)
    year_in_bengali = models.CharField(max_length=4, choices=YEAR_CHOICES_in_BENGALI)
    # committee_members = models.ManyToManyField(
    #     Staff,
    #     through='ExamCommittee',
    #     related_name='committee_member'
    # )

    class Meta:
        unique_together = ('year', 'year_in_bengali')

    def __str__(self):
        return self.department.shortcode+' '+self.year+' year '


class ExamCommittee(models.Model):
   
    exam_system = models.ForeignKey(ExamSystem, on_delete=models.CASCADE)
    exam_committee_member = models.ManyToManyField(Staff, through='ExamCommitteeMember', related_name='exam_committee_member')
    exam_year = models.CharField(max_length=10)

    class Meta:
        unique_together = ('exam_system','exam_year')


    # def clean(self):
    #     # Check if the maximum number of committee members have already been assigned
    #     committee_members = ExamCommittee.objects.filter(exam_system=self.exam_system, exam_year=self.exam_year)
    #     num_chairmen = len([c for c in committee_members if c.role == 'chairman'])
    #     num_members = len([c for c in committee_members if c.role == 'member'])
    #     if self.role == 'chairman' and num_chairmen >= 1:
    #         raise ValidationError('An exam committee can only have one chairman')
    #     elif self.role == 'member' and num_members >= 2:
    #         raise ValidationError('An exam committee can have at most two members')


    def __str__(self):
        return 'Exam Committee'+ self.exam_year+'_'+self.exam_system.year+' year '
      
class ExamCommitteeMember(models.Model):
     ROLE_CHOICES = [
        ('chairman', 'Chairman'),
        ('member', 'Member'),
        ('external', 'External')
    ]
     exam_committee = models.ForeignKey(ExamCommittee, on_delete=models.CASCADE, related_name='exam_committee_for_members')
     committee_members = models.ForeignKey(Staff, on_delete=models.CASCADE, related_name='committee_members') 
     role = models.CharField(max_length=10, choices=ROLE_CHOICES)

     def __str__(self):
         return self.role+' of Exam Committee'+ self.exam_committee.exam_system.year+' year '+ self.exam_committee.exam_year


class Semester(models.Model):
    SEMESTER_CHOICES = (
        ('1st','1st'),
        ('2nd','2nd'),
    )
    SEMESTER_CHOICES_IN_BENGALI = (
        ('১ম','১ম'),
        ('২য়','২য়'),
    )
    exam_system = models.ForeignKey(ExamSystem, on_delete=models.CASCADE)
    semester = models.CharField(max_length=5, choices=SEMESTER_CHOICES)
    semester_in_bengali = models.CharField(max_length=5, choices=SEMESTER_CHOICES_IN_BENGALI)

    class Meta:
        unique_together = ('exam_system', 'semester')

    def __str__(self):
        return self.exam_system.department.shortcode+' '+self.exam_system.year+' year '+ self.semester + ' sem'
    

class Course(models.Model):
    """

Model representing a course offered in a semester.

Fields:
- semester: ForeignKey to Semester model, represents the semester to which the course belongs.
- course_code: CharField, represents the code of the course.
- course_name: CharField, represents the name of the course.
- chief: ManyToManyField to Staff model, through CourseChief model, represents the chief(s) of the course.

Methods:
- __str__: Returns the course code as string.

Related models:
- Semester: Model representing a semester in an academic year.
- Staff: Model representing a staff member of the university.
- CourseChief: Model representing the relation between Course and Staff models for the chief(s) of a course.


"""
    semester = models.ForeignKey(Semester, on_delete=models.CASCADE, related_name='semester_course')
    course_code = models.CharField(max_length=100, unique=True)
    course_name = models.CharField(max_length=200, unique=True)
    # course_chief = models.ManyToManyField(Staff, through='CourseChief', related_name='course_chief')
    


    def __str__(self):
        return self.course_code
    
class LabCourse(Course):
    credit = models.IntegerField()

    def __str__(self):
        return self.course_code
    
# Create course_chief model 

# class CourseChief(models.Model):
#     course = models.ForeignKey(Course, on_delete=models.CASCADE)
#     chief = models.ForeignKey(Staff, on_delete=models.CASCADE)
#     exam_year = models.CharField(max_length=4)

#     class Meta:
#         unique_together = ('course', 'exam_year',)

#     def __str__(self):
#         return self.course.course_code + '_chief_'+ self.chief.first_name+' '+self.chief.last_name


class Notice(models.Model):
    """
    A model to represent a notice for a specific semester and exam year.

    Attributes:
        memorial_no (str): The memorial number of the notice.
        sem (Semester): The semester associated with the notice.
        exam_year (str): The year of the exam.
        date (date): The date the notice was created.
    """
    memorial_no = models.CharField(max_length=100)
    sem = models.ForeignKey(Semester, on_delete=models.CASCADE)
    exam_year = models.CharField(max_length=4)
    date = models.DateField(auto_now_add=True)
    #fk = models.ForeignKey(Staff, on_delete=models.SET_NULL)

    def __str__(self):
        return 'notice' + self.sem.exam_system.year + ' year '+self.sem.semester + ' sem '+self.exam_year
    


    #examiner list model has to be created
class ExaminerList(models.Model):
    """
    Model Name: ExaminerList

Description:
    This model represents a list of examiners for a given semester. 
    It defines a one-to-one relationship with the `Semester` model and 
    a many-to-many relationship with the `Course` model through the `CourseExaminer` intermediate model.

Fields:
    - sem (OneToOneField): A foreign key to the `Semester` model representing the semester this examiner list belongs to.
    - course (ManyToManyField): A many-to-many relationship with the `Course` model through the `CourseExaminer` intermediate model.
    This field represents the list of courses for which examiners are assigned in this semester.
    
    
    """
    sem = models.ForeignKey(Semester, on_delete=models.CASCADE)
    exam_year = models.CharField(max_length=4)
    course = models.ManyToManyField(Course, through='CourseExaminer', related_name='course_examiner_list')

    def __str__(self):
        return f"Examiner list for {self.sem} ({self.course.count()} courses)"


class CourseExaminer(models.Model):
    """
    The CourseExaminer model represents the relationship between a course and 
    an examiner in an ExaminerList for a specific semester. The fields of the model are:

    - examiner_list: A foreign key to an ExaminerList object, representing the examiner list for a specific semester.
    - course: A foreign key to a Course object, representing the course being examined.
    - full_marks: An integer field representing the full marks of the course.
    - duration: A character field representing the duration of the course.
    - examiner: A many-to-many field with Staff model through Examiner model, representing the examiners for the course.

    This model allows for multiple examiners to be assigned to a course, 
    and their details (such as name and designation) can be stored through the Staff model.
    
    """
    examiner_list = models.ForeignKey(ExaminerList, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    full_marks = models.IntegerField()
    duration = models.CharField(max_length=20)
    examiners = models.ManyToManyField(Staff, through='Examiner', related_name='examiners')

    def __str__(self):
        return f"{self.course.course_code} - {self.examiner_list.sem} - {self.full_marks}"


class Examiner(models.Model):
    """
    Model representing an examiner for a course.

    Fields:

    course: ForeignKey to CourseExaminer model, represents the course for which the examiner is appointed.
    order: CharField, represents the order of the examiner.
    examiner: ForeignKey to Staff model, represents the examiner appointed for the course.

    Meta options:

    unique_together: tuple of two fields 'order' and 'examiner', enforces that no two examiners can have the same order for a course.

    Related models:

    CourseExaminer: Model representing the details of the examiners appointed for a course.
    Staff: Model representing a staff member of the university.
    
    """
    course_examiner = models.ForeignKey(CourseExaminer, on_delete=models.CASCADE)
    order = models.CharField(max_length=5)
    examiner = models.ForeignKey(Staff, on_delete=models.CASCADE)


    class Meta:
        unique_together = ('order', 'examiner',)
    


class NoticeQuestionModeration(models.Model):
    exam_committee = models.ForeignKey(ExamCommittee, on_delete=models.CASCADE)       
    date = models.DateField()
    day = models.CharField(max_length=20)
    time = models.CharField(max_length=20)
    exam_year = models.CharField(max_length=10)
    sem = models.ForeignKey(Semester,on_delete=models.CASCADE)

    def __str__(self):
        return 'NoticeQuesmod '+self.exam_year+'' + self.sem.exam_system.year +' year '+self.sem.semester + ' sem'


class ExamSchedule(models.Model):
    sem = models.ForeignKey(Semester, on_delete=models.CASCADE)
    date_generation = models.DateField(auto_now_add=True)
    exam_year = models.CharField(max_length=10)  
    course_schedule = models.ManyToManyField(Course, through='CourseSchedule')
    def __str__(self):
        return 'ExamSchedule '+self.exam_year +' '+self.sem.exam_system.year +' year '+self.sem.semester + ' sem'
    

class CourseSchedule(models.Model):
    exam_schedule = models.ForeignKey(ExamSchedule, on_delete=models.CASCADE)
    exam_date = models.DateField()
    course_code = models.ForeignKey(Course,on_delete=models.CASCADE)
    time = models.CharField(max_length=50)
    invigilator = models.ManyToManyField(Staff, through='Invigilator', related_name='course_invigilator')

    def __str__(self):
        return ' CourseSchedule for '+ self.course_code.course_code+' '+self.exam_schedule.exam_year
    
    @property
    def invigilator_names(self):
        return ', '.join([invigilator.first_name + ' ' + invigilator.last_name for invigilator in self.invigilator.all()])



class Invigilator(models.Model):
    # lab_exam = models.ForeignKey(LabExamInvigilationSchedule, on_delete=models.CASCADE, related_name='lab_exam_invigilation')
    # exam_responsibility = models.ForeignKey(ExamResponsibility, on_delete=models.CASCADE)
    course_schedule = models.ForeignKey(CourseSchedule, on_delete=models.CASCADE, related_name='course')
    invigilator = models.ForeignKey(Staff, on_delete=models.CASCADE)

    def __str__(self):
        return 'Invigilator_exam_'+self.course_schedule.course_code.course_code +' '+ self.course_schedule.exam_schedule.sem.exam_system.year+' year '+self.course_schedule.exam_schedule.sem.semester+' semester' + self.course_schedule.exam_schedule.exam_year
       

class LabExamInvigilationSchedule(ExamSchedule):
    ROLE_CHOICES = [
        ('O', 'Odd Roll'),
        ('E', 'Even Roll')
    ]
    roll_type = models.CharField(max_length=1, choices=ROLE_CHOICES)
    lab_course_schedule = models.ManyToManyField(LabCourse, through='LabCourseSchedule')

    def __str__(self):
        return 'Lab Exam Invigilation Schedule '+self.exam_year+' '+self.sem.exam_system.year+' year '+self.sem.semester+' sem'

class LabCourseSchedule(models.Model):
    lab_exam_schedule = models.ForeignKey(LabExamInvigilationSchedule, on_delete=models.CASCADE)
    exam_date = models.DateField()
    course_code = models.ForeignKey(LabCourse, on_delete=models.CASCADE)
    time = models.CharField(max_length=50)
    invigilator = models.ManyToManyField(Staff, through='LabExamInvigilator', related_name='lab_course_invigilator')

    def __str__(self):
        return 'Lab Course Schedule for '+ self.course_code.course_code+' '+self.lab_exam_schedule.exam_year    

class LabExamInvigilator(models.Model):
    lab_course_schedule = models.ForeignKey(LabCourseSchedule, on_delete=models.CASCADE, related_name='course')
    # chief = models.ForeignKey(CourseChief, on_delete=models.CASCADE)
    invigilator= models.ForeignKey(Staff, on_delete=models.CASCADE)

    def __str__(self):
        return 'Lab Exam Invigilator '+self.lab_course_schedule.course_code.course_code+' '+self.lab_course_schedule.lab_exam_schedule.sem.exam_system.year + ' year ' +self.lab_course_schedule.lab_exam_schedule.sem.semester+ ' semester '+self.lab_course_schedule.lab_exam_schedule.exam_year






class ModerationReport(models.Model):
    notice_question_moderation = models.ForeignKey(NoticeQuestionModeration, on_delete=models.CASCADE, related_name='notice_question_moderation')
    # notice_question_moderation = models.OneToOneField(NoticeQuestionModeration ,on_delete=models.CASCADE)
    # present_members = models.ManyToManyField(Staff, through='QuestionModMember')
    present_members = models.ManyToManyField(Staff, related_name='present_members')


    def __str__(self):
        return 'Moderation report '+self.notice_question_moderation.sem.exam_system.year+' year '+self.notice_question_moderation.sem.semester+' semester'   

    
class ThirdExaminerNotice(Notice):
    examiner = models.ManyToManyField(Staff, through='ThirdExaminer', related_name='third_examiner')

    def __str__(self):
        return 'তৃতীয়_পরীক্ষক_নিয়োগ '+self.exam_year 
    


class ThirdExaminer(models.Model):
    notice = models.ForeignKey(ThirdExaminerNotice, on_delete=models.CASCADE)
    staff = models.ForeignKey(Staff, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    examinee_roll = models.CharField(max_length=500, blank=True)

    def __str__(self):
        return 'Third_Examiner_List'+ self.notice.exam_year 
    
class Stencil(models.Model):
    sem = models.ForeignKey(Semester, on_delete=models.CASCADE)
    exam_year = models.CharField(max_length=4)
    staff = models.ForeignKey(Staff, on_delete=models.CASCADE)
    stencil_no = models.IntegerField()

    def __str__(self):
        return 'Stencil '+ self.sem.exam_system.year +' year '+ self.sem.semester + ' sem '+ self.exam_year

class Tabulator(models.Model):
    # exam_responsibility = models.ForeignKey(ExamResponsibility, on_delete=models.CASCADE)
    exam_committee = models.ForeignKey(ExamCommittee, on_delete=models.CASCADE, related_name='exam_committee')
    sem = models.ForeignKey(Semester, on_delete=models.CASCADE)
    tabulator = models.ForeignKey(Staff, on_delete=models.CASCADE, related_name='tabulator')
    examinee_no = models.IntegerField()

    def __str__(self):
        return 'Tabulator '+ self.exam_committee.exam_system.year +' year '+ self.sem.semester+' sem '+ self.exam_committee.exam_year 

class LabInvigilator(models.Model):
    lab_invigilator = models.ForeignKey(LabCourseSchedule, on_delete=models.CASCADE)
    invigilation_day = models.IntegerField()
    def __str__(self):
        return 'Lab invigilator '+self.lab_invigilator.course_code+' '+self.lab_invigilator.lab_exam_schedule.exam_year

class LabTutorial(models.Model):
    lab_course = models.ForeignKey(LabCourse, on_delete=models.CASCADE)
    lab_chief = models.ForeignKey(Staff,on_delete=models.CASCADE)
    student_no = models.IntegerField()
    exam_year = models.CharField(max_length=4)
    def __str__(self):
        return 'Lab tutorial '+ self.lab_course.course_code+ self.exam_year

class ExamResponsibility(models.Model):
    exam_year = models.CharField(max_length=20)
    sem = models.ForeignKey(Semester, on_delete=models.CASCADE)
    moderation_question_no = models.IntegerField()
    moderation_report = models.ForeignKey(ModerationReport, on_delete=models.CASCADE)
    staff_stencil = models.ForeignKey(Stencil, on_delete=models.CASCADE, related_name='staff_stencil')
    tabulators = models.ForeignKey(Tabulator, on_delete=models.CASCADE,related_name= 'tabulators')
    exam_committee = models.ForeignKey(ExamCommittee, on_delete=models.CASCADE)
    examinee_no_viva = models.IntegerField()
    course_lab_tutorial = models.ForeignKey(LabTutorial, on_delete=models.CASCADE ,related_name='course_lab_tutorial')

    def __str__(self):
        return 'Exam Responsibility '+ self.sem.exam_system.year+' year '+self.sem.semester+' sem'+self.exam_year
    



# class ExamBill(models.Model):
#     examiner_bangla = models.OneToOneField(Staff,on_delete=models.CASCADE, related_name='examiner_bangla')
#     examiner_english = models.OneToOneField(Staff,on_delete=models.CASCADE, related_name='examiner_english')
#     exam_year = models.CharField(max_length=20)
#     sem = models.ForeignKey(Semester, on_delete=models.CASCADE, related_name='sem')
#     exam_responsibility = models.ForeignKey(ExamResponsibility, on_delete=models.CASCADE, related_name='exam_responsibility')
#     chairman = models.OneToOneField(ExamCommittee,on_delete=models.CASCADE, related_name='exam_committee_chairman')

#     def __str__(self):
#         return 'Exam Bill '+self.exam_year+' '+self.sem.exam_system.year+' year '+ self.sem.semester+' sem '+self.examiner_english.first_name +' '+self.examiner_english.last_name+' '







    
