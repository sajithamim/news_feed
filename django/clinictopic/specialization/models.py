from django.db import models
from django.db.models.base import ModelState
from django.db.models.manager import ManagerDescriptor
from authentication.models import User

# Create your models here.
class Specialization(models.Model):
    name = models.CharField(max_length=255)
    icon = models.ImageField(blank=True,null=True,upload_to="specializaion")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'Specialization'

class SubSpecialization(models.Model):
    spec_id = models.ForeignKey(Specialization,on_delete=models.CASCADE,related_name='specialization_id')
    name = models.CharField(max_length=255)
    icon = models.ImageField(blank=True,null=True,upload_to="subspecialization")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
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
