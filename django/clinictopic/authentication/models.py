from django.db import models

# Create your models here.
from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager, PermissionsMixin)

from django.db import models
from rest_framework_simplejwt.tokens import RefreshToken


class UserManager(BaseUserManager):

    def create_user(self, username, email,phone,otp,password=None):
        if username is None:
            raise TypeError('Users should have a username')
        if email is None:
            raise TypeError('Users should have a Email')
        # if phone is None:
        #     raise TypeError('Users should have a Phone number')
        # if otp is None:
        #     raise TypeError('Users should have a otp')
        user = self.model(username=username, email=self.normalize_email(email),phone=phone,otp=otp)
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

