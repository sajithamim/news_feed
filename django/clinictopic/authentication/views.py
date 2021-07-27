from django.http.response import HttpResponse
from django.shortcuts import render
from rest_framework import generics, status, views, permissions
from .serializers import (RegisterSerializer, SetNewPasswordSerializer,
 ResetPasswordEmailRequestSerializer, EmailVerificationSerializer, 
 LoginSerializer, LogoutSerializer,Signinserializer,AdminLoginSerializer,UserProfileSerializer,
 ProfileUpdateSerializer,UsernameChangeSerializer)
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
import jwt
from django.conf import settings
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .renderers import UserRenderer
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from .utils import Util
from django.shortcuts import redirect
from django.http import HttpResponsePermanentRedirect
import os
from dotenv import load_dotenv
from clinictopic.settings.base import BASE_DIR
import random
from rest_framework.views import APIView
from rest_framework import parsers
from rest_framework import mixins
from rest_framework import viewsets, filters
from rest_framework.decorators import action
from specialization.models import UserSpecialization
from rest_framework import pagination
from django.db.models import Q

load_dotenv(BASE_DIR+str("/.env"))

class CustomRedirect(HttpResponsePermanentRedirect):

    allowed_schemes = [os.environ.get('APP_SCHEME'), 'http', 'https']


class RegisterView(generics.GenericAPIView):

    serializer_class = RegisterSerializer
    # renderer_classes = (UserRenderer,)

    def post(self, request):
        try:
            user = request.data
            serializer = self.serializer_class(data=user)
            user['password'] = os.environ.get('SOCIAL_SECRET')
            user['otp'] = random.randrange(1000,9999)
            email_verify = User.objects.filter(email=user['email']).first()
            if email_verify:
                user_provider = email_verify.auth_provider
                status_code = status.HTTP_400_BAD_REQUEST
                response = {
                'success' : 'False',
                'status code' : status_code,
                'message': 'User with this email already exists!.Please continue your login using ' + user_provider,
                }
                return Response(response,status=status.HTTP_400_BAD_REQUEST)
            phone_verify = User.objects.filter(phone=user['phone']).first()
            if phone_verify:
                status_code = status.HTTP_400_BAD_REQUEST
                response = {
                'success' : 'False',
                'status code' : status_code,
                'message': 'User with this phone number already exists',
                }
                return Response(response,status=status.HTTP_400_BAD_REQUEST)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            user_data = serializer.data
            user = User.objects.get(email=user_data['email'])
            token = RefreshToken.for_user(user).access_token
            current_site = get_current_site(request).domain
            relativeLink = reverse('email-verify')
            absurl = 'http://'+current_site+relativeLink+"?token="+str(token)
            email_body = 'Hi '+user.username + \
                ' Use the link below to verify your email \n' + absurl
            data = {'email_body': email_body, 'to_email': user.email,
                    'email_subject': 'Verify your email'}
            Util.send_email(data)
            status_code = status.HTTP_201_CREATED
            response = {
            'success' : 'True',
            'status code' : status_code,
            'message': 'user registered',
            'data':user_data,
            # 'tokens': user.tokens()
            }
            return Response(response,status=status.HTTP_201_CREATED)
        except Exception as e:
            status_code = status.HTTP_400_BAD_REQUEST
            response = {
                'success': 'False',
                'status code': status.HTTP_400_BAD_REQUEST,
                'message': 'error',
                'error': str(e)
                }
            return Response(response, status=status_code)


class VerifyEmail(views.APIView):
    serializer_class = EmailVerificationSerializer

    token_param_config = openapi.Parameter(
        'token', in_=openapi.IN_QUERY, description='Description', type=openapi.TYPE_STRING)

    @swagger_auto_schema(manual_parameters=[token_param_config])
    def get(self, request):
        # print(request.user)
        token = request.GET.get('token')
        try:
            payload = jwt.decode(token, settings.SECRET_KEY)
            user = User.objects.get(id=payload['user_id'])
            if not user.email_verifield:
                user.email_verifield = True
                user.save()
            return Response({'email': 'Successfully activated'}, status=status.HTTP_200_OK)
        except jwt.ExpiredSignatureError as identifier:
            return Response({'error': 'Activation Expired'}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError as identifier:
            return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)


class LoginAPIView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        status_code = status.HTTP_200_OK
        response = {
        'success' : 'True',
        'status code' : status_code,
        'message': 'user logged in',
        'data':serializer.data
            # 'tokens': user.tokens()
        }
        return Response(response, status=status.HTTP_200_OK)


class RequestPasswordResetEmail(generics.GenericAPIView):
    serializer_class = ResetPasswordEmailRequestSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        email = request.data.get('email', '')

        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            current_site = get_current_site(
                request=request).domain
            relativeLink = reverse(
                'password-reset-confirm', kwargs={'uidb64': uidb64, 'token': token})

            redirect_url = request.data.get('redirect_url', '')
            absurl = 'http://'+current_site + relativeLink
            email_body = 'Hello, \n Use link below to reset your password  \n' + \
                absurl+"?redirect_url="+redirect_url
            data = {'email_body': email_body, 'to_email': user.email,
                    'email_subject': 'Reset your passsword'}
            Util.send_email(data)
        return Response({'success': 'We have sent you a link to reset your password'}, status=status.HTTP_200_OK)


class PasswordTokenCheckAPI(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer

    def get(self, request, uidb64, token):

        redirect_url = request.GET.get('redirect_url')

        try:
            id = smart_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                if len(redirect_url) > 3:
                    return CustomRedirect(redirect_url+'?token_valid=False')
                else:
                    return CustomRedirect(os.environ.get('FRONTEND_URL', '')+'?token_valid=False')

            if redirect_url and len(redirect_url) > 3:
                return CustomRedirect(redirect_url+'?token_valid=True&message=Credentials Valid&uidb64='+uidb64+'&token='+token)
            else:
                return CustomRedirect(os.environ.get('FRONTEND_URL', '')+'?token_valid=False')

        except DjangoUnicodeDecodeError as identifier:
            try:
                if not PasswordResetTokenGenerator().check_token(user):
                    return CustomRedirect(redirect_url+'?token_valid=False')
                    
            except UnboundLocalError as e:
                return Response({'error': 'Token is not valid, please request a new one'}, status=status.HTTP_400_BAD_REQUEST)



class SetNewPasswordAPIView(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer

    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({'success': True, 'message': 'Password reset success'}, status=status.HTTP_200_OK)


class LogoutAPIView(generics.GenericAPIView):
    serializer_class = LogoutSerializer
    permission_classes = (permissions.IsAuthenticated,)
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        status_code=status.HTTP_204_NO_CONTENT
        response = {
        'success' : 'True',
        'status code' : status_code,
        'message': 'user logged out',
        }
        return Response(response,status=status.HTTP_204_NO_CONTENT)


class SignInOtpview(generics.GenericAPIView):
    serializer_class = Signinserializer
    def post(self,request):
        try:
            if 'phone' in request.data:
                phone_verify = User.objects.filter(phone=request.data['phone']).first()
            if 'email' in request.data:
                phone_verify = User.objects.filter(email=request.data['email']).first()
            if not phone_verify:
                status_code = status.HTTP_400_BAD_REQUEST
                response = {
                'success' : 'False',
                'status code' : status_code,
                'message': 'user not found with this credential!',
                }
                return Response(response,status=status.HTTP_400_BAD_REQUEST)
            serializer = self.serializer_class(data=request.data)

            serializer.is_valid(raise_exception=True)
            # return HttpResponse("hi")
            return Response(serializer.data, status=status.HTTP_200_OK)
            # otp = random.randrange(1000,9999)
            # phone_verify.otp = otp
            # phone_verify.save()
        except Exception as e:
            status_code = status.HTTP_400_BAD_REQUEST
            response = {
                'success': 'False',
                'status code': status.HTTP_400_BAD_REQUEST,
                'message': 'error',
                'error': str(e)
                }
            return Response(response, status=status_code)
        

class AdminLoginAPIView(generics.GenericAPIView):
    serializer_class = AdminLoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        status_code = status.HTTP_200_OK
        response = {
        'success' : 'True',
        'status code' : status_code,
        'message': 'user logged in',
        'data':serializer.data
            # 'tokens': user.tokens()
        }
        return Response(response, status=status.HTTP_200_OK)



class UserProfile(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request, *args, **kwargs):
        try:
            user =User.objects.get(email=request.user)
            serializers = UserProfileSerializer(user)
            response={
                "success":"True",
                "message":"user Profile",
                "status":status.HTTP_200_OK,
                "data":serializers.data
            }
            return Response(response,status=status.HTTP_200_OK)
        except Exception as e:
            response={
                "success":"False",
                "message":"not found",
                "status": status.HTTP_400_BAD_REQUEST,
                "error":str(e)
            }
            return Response(response,status=status.HTTP_400_BAD_REQUEST)


class UserProfilepicView(viewsets.ModelViewSet):
        queryset = User.objects.filter()
        serializer_class = ProfileUpdateSerializer
        permission_classes = (permissions.IsAuthenticated,)
        http_method_names = ['get','put','delete']

        def list(self, request):
            pic  =User.objects.get(email=request.user)
            # print(pic.profilepic)
            serializer = self.serializer_class(pic)
            return Response(serializer.data)
        def update(self, request, pk=None):
            return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
        def destroy(self, request, pk=None):
            return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
        @action(detail=False,methods=['PUT'],serializer_class=ProfileUpdateSerializer,parser_classes=[parsers.MultiPartParser],)
        def profilepicadd(self, request):
            obj = User.objects.get(email=request.user)
            serializer = self.serializer_class(obj, data=request.data,
                                            partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors,
                                 status.HTTP_400_BAD_REQUEST)
        @action(detail=False,methods=['PUT'])
        def profilepicremove(self, request):
            obj = User.objects.get(email=request.user)
            obj.profilepic = None
            obj.save()
            response={
                "success":"True",
                "message":"profile deleted",
                "status":status.HTTP_200_OK,
            }
            return Response(response,
                                 status=status.HTTP_200_OK)


class Userlist(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request, *args, **kwargs):
        try:
            user =User.objects.filter(is_superuser=False).order_by('email')
            serializers = UserProfileSerializer(user,many=True)
            response={
                "success":"True",
                "message":"user Profile",
                "status":status.HTTP_200_OK,
                "data":serializers.data
            }
            return Response(response,status=status.HTTP_200_OK)
        except Exception as e:
            response={
                "success":"False",
                "message":"not found",
                "status": status.HTTP_400_BAD_REQUEST,
                "error":str(e)
            }
            return Response(response,status=status.HTTP_400_BAD_REQUEST)


class UserDetailApiview(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request,email, *args, **kwargs):
        try:
            user =User.objects.get(email=email)
            serializers = UserProfileSerializer(user)
            response={
                "success":"True",
                "message":"user Profile",
                "status":status.HTTP_200_OK,
                "data":serializers.data
            }
            return Response(response,status=status.HTTP_200_OK)
        except Exception as e:
            response={
                "success":"False",
                "message":"not found",
                "status": status.HTTP_400_BAD_REQUEST,
                "error":str(e)
            }
            return Response(response,status=status.HTTP_400_BAD_REQUEST)


class UsernameAddview(generics.CreateAPIView):
    serializer_class = UsernameChangeSerializer
    pagination_class = None
    permission_classes = (permissions.IsAuthenticated,)
    def get_serializer(self, *args, **kwargs):
        """ if an array is passed, set serializer to many """
        if isinstance(kwargs.get('data', {}), list):
            kwargs['many'] = True
        return super(UsernameAddview, self).get_serializer(*args, **kwargs)
    # @csrf_exempt
    def perform_create(self, serializer):
        serializer.save()

class TwentyPagination(pagination.PageNumberPagination):       
       page_size = 20


class UserSpecializationApiView(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    pagination_class = TwentyPagination 
    def list(self,request,pk, *args, **kwargs):
        queryset =  User.objects.filter(spec_user_id__spec_id__id = pk)
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = UserProfileSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)



class UserProfileSearchView(APIView):
    # permission_classes = (permissions.IsAuthenticated,)
    def get(self, request,pk, *args, **kwargs):
        try:
            user =User.objects.filter(Q(email__icontains=pk) | Q(name__icontains=pk))[:10]
            serializers = UserProfileSerializer(user,many=True)
            response={
                "success":"True",
                "message":"user Profile",
                "status":status.HTTP_200_OK,
                "data":serializers.data
            }
            return Response(response,status=status.HTTP_200_OK)
        except Exception as e:
            response={
                "success":"False",
                "message":"not found",
                "status": status.HTTP_400_BAD_REQUEST,
                "error":str(e)
            }
            return Response(response,status=status.HTTP_400_BAD_REQUEST)