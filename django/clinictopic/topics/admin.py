from django.contrib import admin

# Register your models here.
from .models import (Categoeries,Topics,TopicSpecialization,Image,Favourite)

allmodels = [Categoeries,Topics,TopicSpecialization,Image,Favourite]

for allmodels in allmodels:
    admin.site.register(allmodels)