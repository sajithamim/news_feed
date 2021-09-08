from django.contrib import admin

# Register your models here.
from .models import (TopicPoll,PollOption,UserPoll,Feedback,Settings,ContactUs)

allmodels = [TopicPoll,PollOption,UserPoll,Feedback,Settings,ContactUs]

for allmodels in allmodels:
    admin.site.register(allmodels)