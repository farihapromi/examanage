from django.db import models
from core.models import ExamSystem
from teachers.models import Staff

# Create your models here.

"""
class ExamCommittee(models.Model):
      exam_system = models.ForeignKey(ExamSystem, to_field='year' , on_delete=models.CASCADE)
      chairman = models.ForeignKey(Staff, on_delete=models.CASCADE, related_name='chairman')
      member_1 = models.ForeignKey(Staff, on_delete=models.CASCADE, related_name='member_1')
      member_2 = models.ForeignKey(Staff, on_delete=models.CASCADE, related_name='member_2')
      exam_year = models.CharField(max_length=10)

      class Meta:
            unique_together = ('exam_system','exam_year',)

      def __str__(self):
            return 'Exam Committee '+self.exam_year+ self.exam_system.year + ' year '
      

"""