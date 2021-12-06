# Generated by Django 3.2.4 on 2021-08-14 05:50

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('specialization', '__first__'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Ads',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('addimage', models.ImageField(blank=True, null=True, upload_to='add')),
                ('url', models.CharField(blank=True, max_length=1000, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'db_table': 'Ads',
            },
        ),
        migrations.CreateModel(
            name='AddUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('adsid', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='add_id', to='add.ads')),
                ('spec_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='add_user_spec', to='specialization.specialization')),
                ('user_id', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='add_user', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'AddUser',
            },
        ),
        migrations.CreateModel(
            name='AddSpecialization',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('adsid', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='add_specialization', to='add.ads')),
                ('spec_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='add_spec', to='specialization.specialization')),
            ],
            options={
                'db_table': 'AddSpecialization',
            },
        ),
    ]