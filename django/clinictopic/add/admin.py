from django.contrib import admin

# Register your models here.
from .models import (AddSpecialization,AddUser,Ads,AllUserAdd)

allmodels = [AddSpecialization,AddUser,Ads,AllUserAdd]

for allmodels in allmodels:
    admin.site.register(allmodels)