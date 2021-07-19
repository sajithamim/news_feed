from django.contrib import admin

# Register your models here.
from .models import (TopicPoll,PollOption,UserPoll,Feedback)

allmodels = [TopicPoll,PollOption,UserPoll,Feedback]

for allmodels in allmodels:
    admin.site.register(allmodels)