# Generated by Django 4.1.7 on 2023-04-18 07:22

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('core', '0001_initial'),
        ('teachers', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='noticequesmod',
            name='staff',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='notice',
            name='exam_system',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.examsystem'),
        ),
        migrations.AddField(
            model_name='examsystem',
            name='fk',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='teachers.department'),
        ),
    ]
