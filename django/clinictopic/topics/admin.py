from django.contrib import admin

# Register your models here.
from .models import (Categoeries,Topics,TopicSpecialization,Image)

allmodels = [Categoeries,Topics,TopicSpecialization,Image]

for allmodels in allmodels:
    admin.site.register(allmodels)