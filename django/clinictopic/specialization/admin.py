from django.contrib import admin

# Register your models here.
from .models import (SubSpecialization,UserSubSpecialization,Audience,
Specialization,UserSpecialization, UserType)

allmodels = [SubSpecialization,UserSubSpecialization,Audience,
Specialization,UserSpecialization, UserType]

for allmodels in allmodels:
    admin.site.register(allmodels)