from django.db import models

# Create your models here.
from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager, PermissionsMixin)
from django.db import models
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.postgres.fields import ArrayField


class UserManager(BaseUserManager):

    def create_user(self, username,email,phone,otp,name,optvalid,password=None):
        if username is None:
            raise TypeError('Users should have a username')
        if email is None:
            raise TypeError('Users should have a Email')
        # if phone is None:
        #     raise TypeError('Users should have a Phone number')
        # if otp is None:
        #     raise TypeError('Users should have a otp')
        user = self.model(username=username, email=self.normalize_email(email),phone=phone,otp=otp,name=name,optvalid=optvalid)
        user.set_password(password)
        user.save()
        return user

    # def create_superuser(self, username, email, password=None):
    #     if password is None:
    #         raise TypeError('Password should not be none')

    #     user = self.model(username, email=self.normalize_email(email))
    #     user.set_password(password)
    #     user.is_superuser = True
    #     user.is_staff = True
    #     user.is_verified = True
    #     user.save()
    #     return user
    def create_superuser(self,username, email, password=None):
        if not email:
            raise ValueError("User must have an email")
        if not password:
            raise ValueError("User must have a password")


        user = self.model(
            email=self.normalize_email(email))
        user.username = username
        user.set_password(password)  # change password to hash
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.is_verified = True
        user.save(using=self._db)
        return user


AUTH_PROVIDERS = {'facebook': 'facebook', 'google': 'google',
                  'twitter': 'twitter', 'email': 'email'}


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=255, unique=True, db_index=True)
    name = models.CharField(max_length=255,blank=True,null=True)
    phone = models.CharField(max_length=255,unique=True,db_index=True,blank=True,null=True)
    email = models.EmailField(max_length=255, unique=True, db_index=True)
    first_name = models.CharField(max_length=255,blank=True,null=True)
    profilepic = models.ImageField(blank=True,null=True,upload_to="profile")
    last_name = models.CharField(max_length=255,blank=True,null=True)
    optvalid = models.DateTimeField(blank=True,null=True)
    otp = models.IntegerField(blank=True,null=True)
    is_verified = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    email_verifield = models.BooleanField(default=False)
    phone_verified = models.BooleanField(default=False)
    fb_id = models.CharField(max_length=1000,blank=True,null=True)
    g_id = models.CharField(max_length=1000,blank=True,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    auth_provider = models.CharField(
        max_length=255, blank=False,
        null=False, default=AUTH_PROVIDERS.get('email'))

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = UserManager()

    def __str__(self):
        return self.email

    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }


class Profile(models.Model):
    user_id = models.ForeignKey(User,on_delete=models.CASCADE,blank=True,null=True,related_name="profile_user")
    about = models.CharField(max_length=10000,blank=True,null=True)
    experience=models.CharField(max_length=1000,blank=True,null=True)
    EMP_CHOICES = (
        ('Full-time', 'Full-time'),
        ('Part-time', 'Part-time'),
        ('Self-employed', 'Self-employed'),
        ('Freelance', 'Freelance'),
        ('Internship', 'Internship'),
        ('Trainee', 'Trainee')
    )
    empolyment_type = models.CharField(max_length=20,choices=EMP_CHOICES,blank=True,null=True)
    company_name = models.CharField(max_length=1000,blank=True,null=True)
    location = models.CharField(max_length=1000,blank=True,null=True)
    start_date = models.DateField(blank=True,null=True)
    end_date = models.DateField(blank=True,null=True)
    current= models.BooleanField()
    industry = models.CharField(max_length=1000,blank=True,null=True)
    description = models.CharField(max_length=10000,blank=True,null=True)
    media = ArrayField(models.CharField(max_length=200), blank=True,null=True)
    website = models.CharField(max_length=2000,blank=True,null=True)
    qualifications = ArrayField(models.CharField(max_length=200), blank=True,null=True)
    class Meta:
        db_table = 'Profile'


class Qualifications(models.Model):
    name = models.CharField(max_length=255)
    class Meta:
        db_table ="Qualifications"


class Accomplishments(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,blank=True,null=True,related_name="acc_user") 
    title = models.CharField(max_length=255)
    image = models.ImageField(blank=True,null=True,upload_to="accomplishment")
    publisher = models.CharField(max_length=255,blank=True,null=True)
    publicationdate = models.DateField(blank=True,null=True)
    authors = ArrayField(models.CharField(max_length=200), blank=True,null=True)
    publication_url = models.CharField(max_length=3000,blank=True,null=True)
    description = models.TextField(blank=True,null=True)
    class Meta:
        db_table = "Accomplishments"