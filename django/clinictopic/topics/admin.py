from django.contrib import admin

# Register your models here.
from .models import (Categoeries,Topics,TopicSpecialization)

allmodels = [Categoeries,Topics,TopicSpecialization]

for allmodels in allmodels:
    admin.site.register(allmodels)