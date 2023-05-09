from django.core.management.base import BaseCommand
from teachers.permissions import create_groups_and_permissions_for_department_chairman, create_groups_and_permissions_for_exam_committee_chairman



class Command(BaseCommand):
    help = 'Creates groups and permissions'

    def handle(self, *args, **options):
        create_groups_and_permissions_for_department_chairman()
        create_groups_and_permissions_for_exam_committee_chairman()
        self.stdout.write(self.style.SUCCESS('Groups and permissions created successfully'))
