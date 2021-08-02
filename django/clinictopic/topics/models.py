from django.db import models
import uuid

from django.db.models.deletion import CASCADE
from authentication.models import User
from django.dispatch import receiver
from clinictopic.settings.base import MEDIA_ROOT
from specialization.models import (Specialization)
# from django.core.files.storage import FileSystemStorage
# fs = FileSystemStorage(location='/media/categories')

import os
# from rest_framework import serializers

def get_image_path(instance, filename):
    ext = filename.split('.')[-1]
    filename = "%s.%s"%(instance.id,ext)
    return "category/{filename}".format(filename=filename)


# Create your models here.
class Categoeries(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=100)
    image = models.ImageField(blank=True,null=True,upload_to=get_image_path)

    def __str__(self):
        return self.title
    
    class Meta:
        db_table = 'Categories' 
#delete update image on delete
@receiver(models.signals.post_delete,sender=Categoeries)
def auto_delete_file_on_delete(sender,instance,**kwargs):
    if instance.image:
        if os.path.isfile(instance.image.path):
            os.remove(instance.image.path)

@receiver(models.signals.pre_save, sender=Categoeries)
def auto_delete_file_on_change(sender, instance, **kwargs):
    if not instance.pk:
        return False
    try:
        # print(instance.pk)
        old_file = Categoeries.objects.get(id=instance.pk).image
        # print("old",old_file)
        if not old_file:
            return False
    except Categoeries.DoesNotExist:
        return False

    new_file = instance.image
    if not old_file == new_file:
        if os.path.isfile(old_file.path):
                os.remove(old_file.path)

class UserCategory(models.Model):
    user_id = models.ForeignKey(User,on_delete=models.CASCADE,related_name="user_category")
    category_id = models.ForeignKey(Categoeries,on_delete=models.CASCADE,related_name="category_user_id")

    class Meta:
        db_table ="UserCategory"


def get_image_path_topic(instance, filename):
    ext = filename.split('.')[-1]
    filename = "%s.%s"%(instance.id,ext)
    return "topic/image/{filename}".format(filename=filename)



def get_pdf_path(instance,filename):
    ext = filename.split('.')[-1]
    filename = "%s.%s"%(instance.id,ext)
    return "topic/pdf/{filename}".format(filename=filename)

class Topics(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    AUDIENCE_CHOICES = (
        ('doctor', 'doctor'),
        ('general', 'general')
    )
    topic_audience = models.CharField(max_length=20,choices=AUDIENCE_CHOICES)
    FORMAT_CHOICES = (
        ('1', '1'),
        ('2', '2'),
        ('3', '3')
    )
    author = models.ForeignKey(User,on_delete=models.DO_NOTHING,blank=True,null=True,related_name="author_profile")
    format = models.CharField(max_length=2,choices=FORMAT_CHOICES)
    category_id = models.ForeignKey(Categoeries,on_delete=models.CASCADE,related_name="topic_category")
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=1000)
    TYPE_CHOICES = (
        ('pdf', 'pdf'),
        ('external', 'external')
    )
    deliverytype = models.CharField(max_length=20,choices=TYPE_CHOICES,default='external',blank=True,null=True)
    pdf = models.FileField(blank=True,null=True,upload_to=get_pdf_path)
    pdfsecond = models.FileField(blank=True,null=True,upload_to="pdfsecond")
    source_url=models.CharField(max_length=255,blank=True,null=True)
    external_url = models.CharField(max_length=255,blank=True,null=True)
    MEDIA_CHOICES =(
        ('image', 'image'),
        ('video', 'video')
    )
    media_type = models.CharField(max_length=20,choices=MEDIA_CHOICES,blank=True,null=True)
    # image = models.ImageField(blank=True,null=True,upload_to=get_image_path_topic)
    # images = models.OneToMany(Image, related_name='posts')
    video_url = models.CharField(max_length=1000,blank=True,null=True)
    publishingtime = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    
    class Meta:
        db_table = 'Topics'

class Image(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    topic_id = models.ForeignKey(Topics,on_delete=models.CASCADE,related_name="topic_image")
    # image = models.CharField(blank=True, null=True, max_length=50)
    image = models.ImageField(blank=True, null=True, upload_to=get_image_path_topic)

class TopicSpecialization(models.Model):
    spec_id = models.ForeignKey(Specialization,on_delete=models.CASCADE,related_name="Topic_specialization")
    topic_id = models.ForeignKey(Topics,on_delete=models.CASCADE,related_name="topic_topic")
    
    class Meta:
        db_table = 'TopicSpecialization'




class Favourite(models.Model):
    user_id  = models.ForeignKey(User,on_delete=models.CASCADE,related_name="favourite_user")
    topic_id = models.ForeignKey(Topics,on_delete=models.CASCADE,related_name="favourite_topic")
    
    class Meta:
        db_table = 'Favourite'


