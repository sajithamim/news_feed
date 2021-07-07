from django.contrib import admin

# Register your models here.
from .models import (TopicPoll,PollOption,UserPoll)

allmodels = [TopicPoll,PollOption,UserPoll]

for allmodels in allmodels:
    admin.site.register(allmodels)