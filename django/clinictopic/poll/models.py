from django.db import models
from django.db.models.base import Model
from topics.models import Topics
from authentication.models import User
# Create your models here.

class TopicPoll(models.Model):
    topic_id = models.ForeignKey(Topics,on_delete=models.CASCADE,related_name="poll_topic")
    question = models.CharField(max_length=1000)
    number_of_options = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "TopicPoll"

class PollOption(models.Model):
    topic_poll_id = models.ForeignKey(TopicPoll,on_delete=models.CASCADE,related_name="poll_option")
    answer = models.CharField(max_length=1000)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "PollOption"

class UserPoll(models.Model):
    user_id = models.ForeignKey(User,on_delete=models.CASCADE,related_name="poll_user")
    poll_option_id = models.ForeignKey(PollOption,on_delete=models.CASCADE,related_name="polloption")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table ="UserPoll"


class Feedback(models.Model):
    user_id = models.ForeignKey(User,on_delete=models.CASCADE,related_name="feedback_user")
    feedback = models.CharField(max_length=2000)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    class Meta:
        db_table = "Feedback"
