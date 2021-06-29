from django.contrib import admin

# Register your models here.
from .models import (Categoeries)

allmodels = [Categoeries]

for allmodels in allmodels:
    admin.site.register(allmodels)