from django.contrib import admin

# Register your models here.
from .models import (TopicPoll,PollOption,UserPoll,Feedback,Settings)

allmodels = [TopicPoll,PollOption,UserPoll,Feedback,Settings]

for allmodels in allmodels:
    admin.site.register(allmodels)