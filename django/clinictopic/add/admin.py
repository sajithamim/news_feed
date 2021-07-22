from django.contrib import admin

# Register your models here.
from .models import (AddSpecialization,AddUser,Ads)

allmodels = [AddSpecialization,AddUser,Ads]

for allmodels in allmodels:
    admin.site.register(allmodels)