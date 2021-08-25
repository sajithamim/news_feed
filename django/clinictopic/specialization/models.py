from django.db import models
from django.db.models.base import ModelState
from django.db.models.manager import ManagerDescriptor
from authentication.models import User
from PIL import Image
from io import BytesIO
from django.core.files import File
from django.core.files.base import ContentFile
from django.dispatch import receiver

# Create your models here.
class Specialization(models.Model):
    name = models.CharField(max_length=255)
    icon = models.ImageField(blank=True,null=True,upload_to="specializaion")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def save(self, *args, **kwargs):
      if self.icon:
        filename = "%s.jpg" % self.icon.name.split('.')[0]

        im = Image.open(self.icon)
        new_width  = 250
        new_height = 210
        image = im.resize((new_width, new_height), Image.ANTIALIAS)
         # for PNG images discarding the alpha channel and fill it with some color
        if image.mode in ('RGBA', 'LA'):
            background = Image.new(image.mode[:-1], image.size, '#fff')
            background.paste(image, image.split()[-1])
            image = background
        image_io = BytesIO()
        image.save(image_io, format='JPEG', quality=100)

         # change the image field value to be the newly modified image value
        self.icon.save(filename, ContentFile(image_io.getvalue()), save=False)

      super(Specialization, self).save(*args, **kwargs)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'Specialization'
#delete update image on delete
# @receiver(models.signals.post_delete,sender=Specialization)
# def auto_delete_file_on_delete(sender,instance,**kwargs):
#     if instance.icon:
#         if os.path.isfile(instance.icon.path):
#             os.remove(instance.icon.path)

# @receiver(models.signals.pre_save, sender=Specialization)
# def auto_delete_file_on_change(sender, instance, **kwargs):
#     if not instance.pk:
#         return False
#     try:
#         # print(instance.pk)
#         old_file = Specialization.objects.get(id=instance.pk).icon
#         # print("old",old_file)
#         if not old_file:
#             return False
#     except Specialization.DoesNotExist:
#         return False

#     new_file = instance.icon
#     if not old_file == new_file:
#         if os.path.isfile(old_file.path):
#                 os.remove(old_file.path)

class SubSpecialization(models.Model):
    spec_id = models.ForeignKey(Specialization,on_delete=models.CASCADE,related_name='specialization_id')
    name = models.CharField(max_length=255)
    icon = models.ImageField(blank=True,null=True,upload_to="subspecialization")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def save(self, *args, **kwargs):
      if self.icon:
        filename = "%s.jpg" % self.icon.name.split('.')[0]

        im = Image.open(self.icon)
        new_width  = 250
        new_height = 210
        image = im.resize((new_width, new_height), Image.ANTIALIAS)
         # for PNG images discarding the alpha channel and fill it with some color
        if image.mode in ('RGBA', 'LA'):
            background = Image.new(image.mode[:-1], image.size, '#fff')
            background.paste(image, image.split()[-1])
            image = background
        image_io = BytesIO()
        image.save(image_io, format='JPEG', quality=100)

         # change the image field value to be the newly modified image value
        self.icon.save(filename, ContentFile(image_io.getvalue()), save=False)

      super(SubSpecialization, self).save(*args, **kwargs)
    def __str__(self):
        return self.name
    class Meta:
        db_table = 'SubSpecialization'

class Audience(models.Model):
    name = models.CharField(max_length=50)
    def __str__(self):
        return self.name

    class Meta:
        db_table = 'Audience'


class UserSpecialization(models.Model):
    user_id = models.ForeignKey(User,on_delete=models.CASCADE,related_name='spec_user_id')
    spec_id = models.ForeignKey(Specialization,on_delete=models.CASCADE,related_name='spec_spec_id')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'UserSpecialization'

class UserSubSpecialization(models.Model):
    user_spec_id = models.ForeignKey(UserSpecialization,on_delete=models.CASCADE,related_name='sub_userspec_id')
    sub_spec_id = models.ForeignKey(SubSpecialization,on_delete=models.CASCADE,related_name="sub_subspec_id")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'UserSubSpecialization'

class UserType(models.Model):
    aud_id = models.ForeignKey(Audience,on_delete=models.CASCADE,related_name='user_aud_id')
    user_id = models.ForeignKey(User,on_delete=models.CASCADE,related_name='type_user_id')
    mci = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'UserType' 


class Advisory(models.Model):
    spec_id = models.ForeignKey(Specialization,on_delete=models.CASCADE,related_name='advisory_spec_id')
    user_id = models.ForeignKey(User,on_delete=models.CASCADE,related_name='advisory_user_id')
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        db_table ='Advisory'
