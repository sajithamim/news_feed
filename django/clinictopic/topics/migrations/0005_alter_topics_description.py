# Generated by Django 3.2.4 on 2022-03-23 11:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('topics', '0004_remove_topics_author'),
    ]

    operations = [
        migrations.AlterField(
            model_name='topics',
            name='description',
            field=models.CharField(max_length=10000),
        ),
    ]
