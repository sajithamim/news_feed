from django.db import models
from specialization.models import Specialization
from authentication.models import User
# Create your models here.
class Ads(models.Model):
    title = models.CharField(max_length=100)
    addimage  = models.ImageField(blank=True,null=True,upload_to='add')
    url =  models.CharField(max_length=1000,blank=True,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
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
    # spec_id = models.ForeignKey(Specialization,on_delete=models.CASCADE,related_name='add_user_spec')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'AddUser'





