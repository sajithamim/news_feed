# Generated by Django 3.2.4 on 2021-09-16 13:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('poll', '0004_alter_contactus_phone'),
    ]

    operations = [
        migrations.CreateModel(
            name='AddSetting',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('addaftertopic', models.IntegerField()),
            ],
        ),
    ]
