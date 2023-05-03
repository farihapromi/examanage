from django.core.management.base import BaseCommand
from teachers.permissions import create_groups_and_permissions


class Command(BaseCommand):
    help = 'Creates groups and permissions'

    def handle(self, *args, **options):
        create_groups_and_permissions()
        self.stdout.write(self.style.SUCCESS('Groups and permissions created successfully'))
