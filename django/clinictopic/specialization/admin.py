from django.contrib import admin

# Register your models here.
from .models import (SubSpecialization,UserSubSpecialization,Audience,
Specialization,UserSpecialization, UserType,Advisory)

allmodels = [SubSpecialization,UserSubSpecialization,Audience,
Specialization,UserSpecialization, UserType,Advisory]

for allmodels in allmodels:
    admin.site.register(allmodels)