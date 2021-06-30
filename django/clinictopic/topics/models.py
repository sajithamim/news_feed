from django.db import models
import uuid
from django.dispatch import receiver
from clinictopic.settings.base import MEDIA_ROOT
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
        old_file = Categoeries.objects.get(pk=instance.pk).image
    except Categoeries.DoesNotExist:
        return False

    new_file = instance.image
    if not old_file == new_file:
        if os.path.isfile(old_file.path):
                os.remove(old_file.path)
