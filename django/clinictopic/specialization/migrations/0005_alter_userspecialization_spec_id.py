# Generated by Django 3.2.4 on 2021-06-28 09:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('specialization', '0004_alter_userspecialization_spec_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userspecialization',
            name='spec_id',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='spec_spec_id', to='specialization.specialization'),
        ),
    ]