from django.contrib.auth import authenticate
from authentication.models import User
import os
import random
from rest_framework.exceptions import AuthenticationFailed
from dotenv import load_dotenv
from clinictopic.settings.base import BASE_DIR
from specialization.models import (UserSpecialization)
from topics.models import (UserCategory)
from rest_framework import status
import datetime

load_dotenv(BASE_DIR+str("/.env"))

def generate_username(name):

    username = "".join(name.split(' ')).lower()
    if not User.objects.filter(username=username).exists():
        return username
    else:
        random_username = username + str(random.randint(0, 1000))
        return generate_username(random_username)


def register_social_user(provider, user_id, email, name):
    filtered_user_by_email = User.objects.filter(email=email)
    if filtered_user_by_email.exists():
        user_iddata = User.objects.get(email=email)
        if user_iddata.is_superuser:
        	raise AuthenticationFailed(
                detail = 'You are a super user! use different email..')
        if user_iddata.auth_provider == 'email' and user_iddata.phone_verified:
        	raise AuthenticationFailed(
                detail = 'User with this email already exists in otp login!.Please use another email..')
        userid = user_iddata.id
        # print(filtered_user_by_email[0].auth_provider)
        count = UserSpecialization.objects.filter(user_id=userid).count()
        categorycount  = UserCategory.objects.filter(user_id=userid).count()
        if provider == filtered_user_by_email[0].auth_provider:
            registered_user = authenticate(
                email=email, password=os.environ.get('SOCIAL_SECRET'))
            status_code = status.HTTP_200_OK

            # print()
            return {
                'success' : 'True',
                'status code' : status_code,
                'username': registered_user.username,
                'email': registered_user.email,
                'speccount':count,
                'categorycount':categorycount,
                'tokens': registered_user.tokens()}

        else:
            raise AuthenticationFailed(
                # detail='Please continue your login using ' + filtered_user_by_email[0].auth_provider)
                detail = 'User with this email already exists in otp login!.Please use another email..')

    else:
        user = {
            'username': generate_username(name), 'email': email,'phone':None,'otp':None,
            'password': os.environ.get('SOCIAL_SECRET'),
            'name':'',
            'optvalid':datetime.datetime.now()}
        user = User.objects.create_user(**user)
        user.is_verified = True
        user.email_verifield=True
        user.auth_provider = provider
        user.save()
        new_user = authenticate(
            email=email, password=os.environ.get('SOCIAL_SECRET'))
        status_code = status.HTTP_200_OK

        
        return {
            'success' : 'True',
            'status code' : status_code,
            'email': new_user.email,
            'username': new_user.username,
            'tokens': new_user.tokens(),
            'speccount':0,
            'categorycount':0,
        }
