from django.contrib import admin

# Register your models here.
from .models import (Categoeries,Topics,TopicSpecialization,Image,Favourite,UserCategory,TopicSubSpecialization)

allmodels = [Categoeries,Topics,TopicSpecialization,Image,Favourite,UserCategory,TopicSubSpecialization]

for allmodels in allmodels:
    admin.site.register(allmodels)