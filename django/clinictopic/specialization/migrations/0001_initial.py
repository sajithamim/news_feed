# Generated by Django 3.2.4 on 2021-08-14 05:50

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Audience',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
            ],
            options={
                'db_table': 'Audience',
            },
        ),
        migrations.CreateModel(
            name='Specialization',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('icon', models.ImageField(blank=True, null=True, upload_to='specializaion')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'db_table': 'Specialization',
            },
        ),
        migrations.CreateModel(
            name='SubSpecialization',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('icon', models.ImageField(blank=True, null=True, upload_to='subspecialization')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('spec_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='specialization_id', to='specialization.specialization')),
            ],
            options={
                'db_table': 'SubSpecialization',
            },
        ),
        migrations.CreateModel(
            name='UserSpecialization',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('spec_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='spec_spec_id', to='specialization.specialization')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='spec_user_id', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'UserSpecialization',
            },
        ),
        migrations.CreateModel(
            name='UserType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mci', models.CharField(max_length=255)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('aud_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_aud_id', to='specialization.audience')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='type_user_id', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'UserType',
            },
        ),
        migrations.CreateModel(
            name='UserSubSpecialization',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('sub_spec_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sub_subspec_id', to='specialization.subspecialization')),
                ('user_spec_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sub_userspec_id', to='specialization.userspecialization')),
            ],
            options={
                'db_table': 'UserSubSpecialization',
            },
        ),
    ]
