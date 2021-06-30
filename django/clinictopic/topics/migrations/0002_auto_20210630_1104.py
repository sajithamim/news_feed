# Generated by Django 3.2.4 on 2021-06-30 05:34

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('topics', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='categoeries',
            name='id',
            field=models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='categoeries',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='get_image_path'),
        ),
    ]
