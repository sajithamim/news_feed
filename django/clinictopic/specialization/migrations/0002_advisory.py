# Generated by Django 3.2.4 on 2021-08-14 06:42

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('specialization', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Advisory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('spec_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='advisory_spec_id', to='specialization.specialization')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='advisory_user_id', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'Advisory',
            },
        ),
    ]
