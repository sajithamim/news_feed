# from typing_extensions import Required
from django.db import models
from django.db.models import fields
from rest_framework import serializers
from .models import Accomplishments, User,Profile,Qualifications
from django.contrib import auth
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from specialization.models import UserSpecialization
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from clinictopic.settings.base import BASE_DIR
from dotenv import load_dotenv
import os
from topics.models import (UserCategory)
from .utils import Util
import requests
import datetime
import random
from .emails import send_email_from_app_otp


load_dotenv(BASE_DIR+str("/.env"))


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        max_length=68, min_length=6, write_only=True)

    default_error_messages = {
        'phone': 'The phone should only contain numeric characters'}

    class Meta:
        model = User
        fields = ['email', 'username', 'password','phone','otp','name']

    def validate(self, attrs):
        email = attrs.get('email', '')
        username = attrs.get('username', '')
        phone = attrs.get('phone', '')
        name = attrs.get('name', '')
        # print(name)

        # if not phone.isnumeric():
        #     raise serializers.ValidationError(
        #         self.default_error_messages)
        return attrs

    def create(self, validated_data):
        now = datetime.datetime.now()
        now_plus= now + datetime.timedelta(minutes = 5)
        if User.objects.filter(phone=validated_data['phone'],phone_verified=False,auth_provider='email').exists():
            userdel=User.objects.filter(phone=validated_data['phone'],phone_verified=False,auth_provider='email').delete()
        return User.objects.create_user(**validated_data,optvalid=now_plus)


class EmailVerificationSerializer(serializers.ModelSerializer):
    token = serializers.CharField(max_length=555)

    class Meta:
        model = User
        fields = ['token']


class Signinserializer(serializers.ModelSerializer):
    phone = serializers.CharField(required=False,allow_null=True,allow_blank=True)
    email = serializers.EmailField(required=False,allow_null=True,allow_blank=True)
    otp = serializers.CharField(read_only =True,max_length = 10)
    default_error_messages = {
        'phone': 'The phone should only contain numeric characters'}
    
    class Meta:
        model = User
        fields = ['phone','otp','email']

    def validate(self, attrs):
        if attrs.get('phone', ''):
            phone = attrs.get('phone', '')
            # if not phone.isnumeric():
            #     raise serializers.ValidationError(
            #         self.default_error_messages)
            phone_verify = User.objects.filter(phone=phone).first()
            otp = random.randrange(1000,9999)
            phone_verify.otp = otp
            now = datetime.datetime.now()
            now_plus= now + datetime.timedelta(minutes = 5)
            phone_verify.optvalid=now_plus
            phone_verify.save()
            smsphone  = str(phone)
            if smsphone.split("-")[0]=='91':
                smsnumber = smsphone.replace("-","")
                api_key = os.environ.get('SMS_API_KEY')
                sid = os.environ.get('SMS_SENDER_ID')
                route = os.environ.get('SMS_ROUTE')
                eid= os.environ.get('SMS_ENTITY_ID')
                tid= os.environ.get('SMS_TEMPLATE_ID')
                mno= smsnumber
                msg=str(otp)+' is your account verification code PROMEDICA HEALTH COMMUNICATION PRIVATE LIMITED'
                url='https://www.smsgatewayhub.com/api/mt/SendSMS?APIKey='+api_key+'&senderid='+sid+'&channel=2&DCS=0&flashsms=1&number='+mno+'&text='+msg+'&route='+route+'&EntityId='+eid+'&dlttemplateid='+tid
                # url='https://www.smsgatewayhub.com/api/mt/SendSMS?APIKey=c93f7373-3ae8-4079-92d1-78c91c23e939&senderid=PROMDH&channel=2&DCS=0&flashsms=1&number='+smsnumber+'&text='+str(user['otp'])+' is your account verification code PROMEDICA HEALTH COMMUNICATION PRIVATE LIMITED&route=31&EntityId=1301162608442932167&dlttemplateid=1307162669392280167'
                r = requests.get(url)
            else :
                smsnumber = smsphone.replace("-","")
                api_key =os.environ.get('INTERNATION_API_KEY')
                sid = 'SMSHUB'
                route = os.environ.get('SMS_ROUTE')
                eid= os.environ.get('SMS_ENTITY_ID')
                tid= os.environ.get('SMS_TEMPLATE_ID')
                mno= smsnumber
                # 'https://www.smsgatewayhub.com/api/mt/SendSMS?APIKey=yourapicode&senderid=SMSHUB&channel=INT&DCS=0&flashsms=0&number=12093158246&text=test message&route=16'
                msg=str(otp)+' is your account verification code PROMEDICA HEALTH COMMUNICATION PRIVATE LIMITED'
                url='https://www.smsgatewayhub.com/api/mt/SendSMS?APIKey='+api_key+'&senderid='+sid+'&channel=INT&DCS=0&flashsms=1&number='+mno+'&text='+msg+'&route=16'
                # print()
                # url='https://www.smsgatewayhub.com/api/mt/SendSMS?APIKey='+api_key+'&senderid='+sid+'&channel=2&DCS=0&flashsms=1&number='+mno+'&text='+msg+'&route='+route+'&EntityId='+eid+'&dlttemplateid='+tid
                r = requests.get(url)
            # smsnumber = smsphone.replace("-","")
            # # url='https://www.smsgatewayhub.com/api/mt/SendSMS?APIKey=c93f7373-3ae8-4079-92d1-78c91c23e939&senderid=PROMDH&channel=2&DCS=0&flashsms=1&number='+smsnumber+'&text='+str(otp)+' is your account verification code PROMEDICA HEALTH COMMUNICATION PRIVATE LIMITED&route=31&EntityId=1301162608442932167&dlttemplateid=1307162669392280167'
            # # r = requests.get(url)
            # api_key = os.environ.get('SMS_API_KEY')
            # sid = os.environ.get('SMS_SENDER_ID')
            # route = os.environ.get('SMS_ROUTE')
            # eid= os.environ.get('SMS_ENTITY_ID')
            # tid= os.environ.get('SMS_TEMPLATE_ID')
            # mno= smsnumber
            # msg=str(otp)+' is your account verification code PROMEDICA HEALTH COMMUNICATION PRIVATE LIMITED'
            # url='https://www.smsgatewayhub.com/api/mt/SendSMS?APIKey='+api_key+'&senderid='+sid+'&channel=2&DCS=0&flashsms=1&number='+mno+'&text='+msg+'&route='+route+'&EntityId='+eid+'&dlttemplateid='+tid
            # # url='https://www.smsgatewayhub.com/api/mt/SendSMS?APIKey=c93f7373-3ae8-4079-92d1-78c91c23e939&senderid=PROMDH&channel=2&DCS=0&flashsms=1&number='+smsnumber+'&text='+str(user['otp'])+' is your account verification code PROMEDICA HEALTH COMMUNICATION PRIVATE LIMITED&route=31&EntityId=1301162608442932167&dlttemplateid=1307162669392280167'
            # r = requests.get(url)
        if attrs.get('email',''):
            email = attrs.get('email', '')
            phone_verify = User.objects.filter(email=email).first()
            if phone_verify.auth_provider !="email":
                raise AuthenticationFailed(
                    detail='Please continue your login using ' +phone_verify.auth_provider)
            otp = random.randrange(1000,9999)
            phone_verify.otp = otp
            now = datetime.datetime.now()
            now_plus= now + datetime.timedelta(minutes = 3)
            phone_verify.optvalid=now_plus
            phone_verify.save()
            email_body = "Dear "+email+" , Your OTP is " +str(otp) + ". Use this Passcode to complete your Login into ClinicTopics. Thank you."
            data = {'email_body': email_body, 'to_email': email,
                    'email_subject': 'Login otp'}
            # Util.send_email(data)
            send_email_from_app_otp(to=email,otp=str(otp))
        # return attrs
        return {
            'email': phone_verify.email,
            'username': phone_verify.username,
            'phone':phone_verify.phone,
            'otp':phone_verify.otp
        }
        return super().validate(attrs)


class LoginSerializer(serializers.ModelSerializer):
    phone = serializers.CharField(max_length=20,min_length=10)
    otp = serializers.CharField(max_length=20)
    tokens = serializers.SerializerMethodField()
    speccount = serializers.SerializerMethodField()
    categorycount = serializers.SerializerMethodField()

    def get_categorycount(self,obj):
        userobj = User.objects.get(phone = obj['phone'])
        userid = userobj.id
        return UserCategory.objects.filter(user_id=userid).count()


    def get_speccount(self,obj):
        userobj = User.objects.get(phone = obj['phone'])
        userid = userobj.id
        return UserSpecialization.objects.filter(user_id=userid).count()
    def get_tokens(self, obj):
        user = User.objects.get(phone=obj['phone'])

        return {
            'refresh': user.tokens()['refresh'],
            'access': user.tokens()['access']
        }

    class Meta:
        model = User
        fields = ['tokens','phone','otp','speccount','categorycount']

    def validate(self, attrs):
        # email = attrs.get('email', '')
        phone = attrs.get('phone','')
        otp = attrs.get('otp','')
        password = os.environ.get('SOCIAL_SECRET')
        filtered_user_by_email = User.objects.filter(phone=phone)
        if not filtered_user_by_email:
            raise AuthenticationFailed('user not found!')
        for filtered_user_by_email in filtered_user_by_email:
            email  = filtered_user_by_email.email
            user_otp = filtered_user_by_email.otp
        if int(otp) != int(user_otp):
            raise AuthenticationFailed('Invalid otp, try again')
        userobj = User.objects.get(phone = phone)
        userobj.phone_verified = True
        userobj.is_verified = True
        userobj.save()
        # print(user_otp)
        # print(otp)
        user = auth.authenticate(email=email, password=password)
        # otp = random.randrange(1000,9999)
        # if not phone.isnumeric():
        #     raise AuthenticationFailed('Invalid phone number!')

        # if filtered_user_by_email.exists() and filtered_user_by_email[0].auth_provider != 'email':
        #     raise AuthenticationFailed(
        #         detail='Please continue your login using ' + filtered_user_by_email[0].auth_provider)

        if not email:
            raise AuthenticationFailed('Invalid credentials, try again')
        if not user:
            raise AuthenticationFailed('Invalid credentials, try again')
        if not user.is_active:
            raise AuthenticationFailed('Account disabled, contact admin')
        if not user.is_verified:
            raise AuthenticationFailed('user not verified')
        if not user.phone_verified:
            raise AuthenticationFailed('User not verified')

        return {
            'email': user.email,
            'username': user.username,
            'tokens': user.tokens,
            'phone':user.phone,
            'otp':user.otp
        }

        return super().validate(attrs)


class ResetPasswordEmailRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(min_length=2)

    redirect_url = serializers.CharField(max_length=500, required=False)

    class Meta:
        fields = ['email']

class VerifyPhoneSerializer(serializers.Serializer):
    otp = serializers.CharField(read_only =True,max_length = 10)
    class Meta:
        fields = ['otp']
        # model = User


class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(
        min_length=6, max_length=68, write_only=True)
    token = serializers.CharField(
        min_length=1, write_only=True)
    uidb64 = serializers.CharField(
        min_length=1, write_only=True)

    class Meta:
        fields = ['password', 'token', 'uidb64']

    def validate(self, attrs):
        try:
            password = attrs.get('password')
            token = attrs.get('token')
            uidb64 = attrs.get('uidb64')

            id = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed('The reset link is invalid', 401)

            user.set_password(password)
            user.save()

            return (user)
        except Exception as e:
            raise AuthenticationFailed('The reset link is invalid', 401)
        return super().validate(attrs)


class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    default_error_message = {
        'bad_token': ('Token is expired or invalid')
    }

    def validate(self, attrs):
        self.token = attrs['refresh']
        return attrs

    def save(self, **kwargs):

        try:
            RefreshToken(self.token).blacklist()

        except TokenError:
            self.fail('bad_token')




class AdminLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255, min_length=3)
    password = serializers.CharField(
        max_length=68, min_length=4, write_only=True)
    tokens = serializers.SerializerMethodField()
    def get_tokens(self, obj):
        user = User.objects.get(email=obj['email'])

        return {
            'refresh': user.tokens()['refresh'],
            'access': user.tokens()['access']
        }

    class Meta:
        model = User
        fields = ['tokens','email','password']
        write_only_fields = ('password')


    def validate(self, attrs):
        email = attrs.get('email', '')
        password = attrs.get('password','')
        user = auth.authenticate(email=email, password=password)
        if not user:
            raise AuthenticationFailed('Invalid credentials, try again')

        return {
            'email': user.email,
            'username': user.username,
            'tokens': user.tokens,
            'phone':user.phone,
            'otp':user.otp
        }

        return super().validate(attrs)



class ProfileUpdateSerializer(serializers.ModelSerializer):
    profilepic = serializers.ImageField(max_length=None, use_url=True, allow_null=True, required=False)
    class Meta:
        model = User
        fields = ['profilepic']

class PhoneUpdateSerializer(serializers.ModelSerializer):

    default_error_messages = {
        'phone': 'The phone should only contain numeric characters'}

    class Meta:
        model = User
        fields = ['phone']
    def validate(self, attrs):
        phone = attrs.get('phone', '')
        # if not phone.isnumeric():
        #     raise serializers.ValidationError(
        #         self.default_error_messages)
        return attrs

class UsernameChangeSerializer(serializers.ModelSerializer):
    class Meta:
        model =User
        fields = ['name']
class Userqualifaicationserializer(serializers.ModelSerializer):
    qualifications =serializers.ListField(child=serializers.CharField())
    class Meta:
        model =Profile
        fields =['qualifications']

class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField()
    id = serializers.ReadOnlyField()
    email = serializers.ReadOnlyField()
    phone = serializers.ReadOnlyField()
    qualifications = serializers.SerializerMethodField()
    # qualifications = Userqualifaicationserializer()
    # profilepic = serializers.ReadOnlyField()
    profilepic = serializers.ImageField(max_length=None, use_url=True, allow_null=True, required=False)
    class Meta:
        model = User
        fields = ['id','username','email','phone','profilepic','name','email_verifield','phone_verified','qualifications']
    def get_qualifications(self,obj):
        try:
            qual = Profile.objects.get(user_id__id= obj.id)
            return qual.qualifications
        except Profile.DoesNotExist:
            return ""

class ProfileSerializer(serializers.ModelSerializer):
    media = serializers.ListField(child=serializers.CharField())
    qualifications =serializers.ListField(child=serializers.CharField())
    class Meta:
        model = Profile
        fields = '__all__'
    def create(self, validated_data):
        # print(str(**validated_data))
        return Profile.objects.create(**validated_data)

class AccomplishmentSerializer(serializers.ModelSerializer):
    authors = serializers.ListField(child=serializers.CharField())
    image = serializers.ImageField(max_length=None, use_url=True, allow_null=True, required=False)
    class Meta:
        model =Accomplishments
        fields='__all__'
class AccomplishmentImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Accomplishments
        fields =['image']

class QualificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Qualifications
        fields= '__all__'

