from django.db import models
from specialization.models import Specialization
from authentication.models import User
from PIL import Image
from io import BytesIO
from django.core.files.base import ContentFile

# Create your models here.
class Ads(models.Model):
    title = models.CharField(max_length=1000)
    addimage  = models.ImageField(blank=True,null=True,upload_to='add')
    url =  models.CharField(max_length=1000,blank=True,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def save(self, *args, **kwargs):
      if self.addimage:
        filename = "%s.jpg" % self.addimage.name.split('.')[0]

        im = Image.open(self.addimage)
        new_width  = 320
        new_height = 480
        image = im.resize((new_width, new_height), Image.ANTIALIAS)
         # for PNG images discarding the alpha channel and fill it with some color
        if image.mode in ('RGBA', 'LA'):
            background = Image.new(image.mode[:-1], image.size, '#fff')
            background.paste(image, image.split()[-1])
            image = background
        image_io = BytesIO()
        image.save(image_io, format='JPEG', quality=100)

         # change the image field value to be the newly modified image value
        self.addimage.save(filename, ContentFile(image_io.getvalue()), save=False)

      super(Ads, self).save(*args, **kwargs)
    
    class Meta:
        db_table = 'Ads'

class AddSpecialization(models.Model):
    adsid = models.ForeignKey(Ads,on_delete=models.CASCADE,related_name='add_specialization')
    spec_id = models.ForeignKey(Specialization,on_delete=models.CASCADE,related_name='add_spec')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'AddSpecialization'


class AddUser(models.Model):
    adsid = models.ForeignKey(Ads,on_delete=models.CASCADE,related_name='add_id')
    user_id = models.ForeignKey(User,on_delete=models.CASCADE,related_name='add_user',blank=True,null=True)
    spec_id = models.ForeignKey(Specialization,on_delete=models.CASCADE,related_name='add_user_spec')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'AddUser'


class AllUserAdd(models.Model):
    title = models.CharField(max_length=1000)
    addimage  = models.ImageField(blank=True,null=True,upload_to='alladd')
    url =  models.CharField(max_length=1000,blank=True,null=True)
    active = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def save(self, *args, **kwargs):
      if self.addimage:
        filename = "%s.jpg" % self.addimage.name.split('.')[0]

        im = Image.open(self.addimage)
        new_width  = 320
        new_height = 200
        image = im.resize((new_width, new_height), Image.ANTIALIAS)
         # for PNG images discarding the alpha channel and fill it with some color
        if image.mode in ('RGBA', 'LA'):
            background = Image.new(image.mode[:-1], image.size, '#fff')
            background.paste(image, image.split()[-1])
            image = background
        image_io = BytesIO()
        image.save(image_io, format='JPEG', quality=100)

         # change the image field value to be the newly modified image value
        self.addimage.save(filename, ContentFile(image_io.getvalue()), save=False)

      super(AllUserAdd, self).save(*args, **kwargs)
    
    class Meta:
        db_table = 'AllUserAdd'



