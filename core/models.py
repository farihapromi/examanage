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
    course_chief = models.ManyToManyField(Staff, through='CourseChief', related_name='course_chief')
    


    def __str__(self):
        return self.course_code
    
# Create course_chief model 

class CourseChief(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    chief = models.ForeignKey(Staff, on_delete=models.CASCADE)
    exam_year = models.CharField(max_length=4)

    class Meta:
        unique_together = ('course', 'exam_year',)

    def __str__(self):
        return self.course.course_code + '_chief_'+ self.chief.first_name+' '+self.chief.last_name


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
    sem = models.OneToOneField(Semester, on_delete=models.CASCADE)
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
        return f"Examiner list for {self.sem.exam_system.year} year {self.sem} semester ({self.course.count()} courses)"


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
    
    external_examiner = models.OneToOneField(Staff, 
                                            on_delete=models.CASCADE, 
                                            limit_choices_to={'is_external': True},
                                            related_name='external_examiner')
    exam_committee = models.ForeignKey(ExamCommittee, on_delete=models.CASCADE)
                                                    
    date = models.DateField()
    day = models.CharField(max_length=20)
    time = models.CharField(max_length=20)
    exam_year = models.CharField(max_length=10)
    sem = models.OneToOneField(Semester,
                               on_delete=models.CASCADE)


    def __str__(self):
        return 'NoticeQuesmod '+self.exam_year+'' + self.sem.exam_system.year +' year '+self.sem.semester + ' sem'
    

class ExamSchedule(models.Model):
    sem = models.ForeignKey(Semester, on_delete=models.CASCADE)
    date_generation = models.DateField(auto_now_add=True)
    exam_year = models.CharField(max_length=10)  
    exam_date = models.DateField()
    course = models.OneToOneField(Course,on_delete=models.CASCADE, limit_choices_to={'semester': sem})
    time = models.CharField(max_length=50)
    
    def __str__(self):
        return 'ExamSchedule'+self.exam_year +' '+self.course.course_code+self.sem.exam_system.year +' year '+self.sem.semester + ' sem'
    
    
class ModerationReport(models.Model):
    exam_schedule = models.ForeignKey(ExamSchedule, on_delete=models.CASCADE)
    # notice_question_moderation = models.OneToOneField(NoticeQuestionModeration ,on_delete=models.CASCADE)
    # present_members = models.ManyToManyField(Staff, through='QuestionModMember')
    present_members = models.ManyToManyField(Staff)


    def __str__(self):
        return 'Moderation report '+self.exam_schedule.sem.exam_system.year+' year '+self.exam_schedule.sem.semester+' semester'   

# class QuestionModMember(models.Model):
#     moderation_report = models.ForeignKey(ModerationReport, on_delete=models.CASCADE)
#     staff = models.ForeignKey(Staff, on_delete=models.CASCADE)
#     # exam_committee_member = models.ForeignKey(ExamCommittee,on_delete=models.CASCADE)
#     exam_committee_member_and_external = models.ForeignKey(NoticeQuestionModeration, on_delete=models.CASCADE)


# class NoticeQuestionModerationCommitteeMembers(models.Model):
#     # exam_responsibility = models.ForeignKey(ExamResponsibility, on_delete=models.CASCADE)
#     notice_question_moderation = models.ForeignKey(NoticeQuestionModeration, on_delete=models.CASCADE)
#     members = models.ForeignKey(ExamCommittee, on_delete=models.CASCADE, limit_choices_to={'role': 'member'})


#     def __str__(self):
#         return 'Question Moderation_Exam Committee members' + self.members.exam_year




# REdundant model
# class CourseChief(models.Model):
#     course = models.ForeignKey(Course, on_delete=models.CASCADE)
#     chief = models.ForeignKey(Staff, on_delete=models.CASCADE)
#     exam_year = models.CharField(max_length=4)

#     def __str__(self):
#         return self.course.course_code + '_chief_'+ self.chief.first_name+' '+self.chief.last_name
    

class LabCourse(Course):
    credit = models.IntegerField()

    def __str__(self):
        return self.course_code

    




class InvigilationSchedule(ExamSchedule):
    invigilators = models.ManyToManyField(Staff, through='Invigilator', related_name='invigilators')
    
    def __str__(self):
        return 'InvigilationSchedule'+super().exam_year + ' '+super().course.course_code
    

    




class LabExamInvigilationSchedule(InvigilationSchedule):
    ROLL_CHOICES = (
        ('O', 'Odd Roll'),
        ('E', 'Even Roll'),
    )
    roll_type = models.CharField(max_length=1, choices= ROLL_CHOICES)

    def __str__(self):
        return 'LabExam Invigilation Schedule'+ self.exam_year+' '+self.sem.exam_system.year+' year'+self.sem.semester+' sem'

    
class ThirdExaminerNotice(Notice):
    examiner = models.ManyToManyField(Staff, through='ThirdExaminer', related_name='third_examiner')

    def __str__(self):
        return 'তৃতীয়_পরীক্ষক_নিয়োগ'+self.exam_year 
    


class ThirdExaminer(models.Model):
    notice = models.ForeignKey(ThirdExaminerNotice, on_delete=models.CASCADE)
    staff = models.ForeignKey(Staff, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    examinee_roll = models.CharField(max_length=500, blank=True)

    def __str__(self):
        return 'Third_Examiner_List'+ self.notice.exam_year
    
class Tabulator(models.Model):
    # exam_responsibility = models.ForeignKey(ExamResponsibility, on_delete=models.CASCADE)
    tabulator = models.ForeignKey(ExamCommittee, on_delete=models.CASCADE, limit_choices_to={'role': 'member'})
    examinee_no = models.IntegerField()


class ExamResponsibility(models.Model):
    exam_year = models.CharField(max_length=20)
    sem = models.OneToOneField(Semester, on_delete=models.CASCADE)
    question_no = models.IntegerField()
    # notice_ques_mod = models.ManyToManyField(NoticeQuestionModeration, through='NoticeQuestionModerationCommitteeMembers')
    staff_stencil = models.ManyToManyField(Staff,through='Stencil', related_name='staff_stencil')
    tabulators = models.ForeignKey(Tabulator, on_delete=models.CASCADE,related_name= 'tabulators')
   
    lab_exam_invigilator = models.ManyToManyField(LabExamInvigilationSchedule, through='Invigilator')
    examinee_no_viva = models.IntegerField()
    #chairman and members of exam committee in viva voce
    course_lab_tutorial = models.ManyToManyField(LabCourse, related_name='course_lab_tutorial')
    credit_lab_tutorial = models.ManyToManyField(LabCourse, related_name='credit_lab_tutorial')
    staff_lab_tutorial = models.ManyToManyField(Staff)
    student_no_lab_tutorial = models.IntegerField()


    def __str__(self):
        return 'Exam Responsibility '+ self.sem.exam_system.year+' year '+self.sem.semester+' sem'+self.exam_year
    
class Invigilator(models.Model):
    lab_exam = models.ForeignKey(LabExamInvigilationSchedule, on_delete=models.CASCADE, related_name='lab_exam_invigilation')
    exam_responsibility = models.ForeignKey(ExamResponsibility, on_delete=models.CASCADE)
    invigilation = models.ForeignKey(InvigilationSchedule, on_delete=models.CASCADE, related_name='invigilationa_schedule')
    invigilator = models.ForeignKey(Staff, on_delete=models.CASCADE)

    def __str__(self):
        return 'Invigilator_exam_' +self.invigilation.course.course_code +'_'+ self.invigilator.first_name+'_'+self.invigilator.last_name   
    

class NoticeQuestionModerationCommitteeMembers(models.Model):
    # exam_responsibility = models.ForeignKey(ExamResponsibility, on_delete=models.CASCADE)
    notice_question_moderation = models.ForeignKey(NoticeQuestionModeration, on_delete=models.CASCADE)
    members = models.ForeignKey(ExamCommittee, on_delete=models.CASCADE, limit_choices_to={'role': 'member'})


    def __str__(self):
        return 'Question Moderation_Exam Committee members' + self.members.exam_year
    



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
    chairman = models.OneToOneField(ExamCommittee,on_delete=models.CASCADE, related_name='exam_committee_chairman')

    def __str__(self):
        return 'Exam Bill '+self.exam_year+' '+self.sem.exam_system.year+' year '+ self.sem.semester+' sem '+self.examiner_english.first_name +' '+self.examiner_english.last_name+' '







    
