from django.db import models
# from rest_framework import serializers


# Create your models here.
class Categoeries(models.Model):
    title = models.CharField(max_length=100)
    image = models.ImageField(blank=True,null=True)

    def __str__(self):
        return self.title
    
    class Meta:
        db_table = 'Categories' 
    