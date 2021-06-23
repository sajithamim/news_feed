from django.http.response import HttpResponse
from django.shortcuts import render
from rest_framework import generics, status, views, permissions
from .serializers import RegisterSerializer, SetNewPasswordSerializer, ResetPasswordEmailRequestSerializer, EmailVerificationSerializer, LoginSerializer, LogoutSerializer
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
                status_code = status.HTTP_400_BAD_REQUEST
                response = {
                'success' : 'False',
                'status code' : status_code,
                'message': 'User with this email already exists',
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
            'tokens': user.tokens()
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
        print(request.user)
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
        return Response(serializer.data, status=status.HTTP_200_OK)


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

        return Response(status=status.HTTP_204_NO_CONTENT)


from .otp import send_opt
def sendmessage(self,request):
    if request.method =="GET":
        send_opt('9895203267','1234')
        return HttpResponse("sent")


class OtpAPIView(generics.GenericAPIView):
    def get(self, request):
        send_opt('9895203267','1234')
        return HttpResponse("sent")


# import http.client

# conn = http.client.HTTPSConnection("api.msg91.com")

# payload = "{\"Value1\":\"Param1\",\"Value2\":\"Param2\",\"Value3\":\"Param3\"}"

# headers = { 'content-type': "application/json" }

# conn.request("GET", "/api/v5/otp?template_id=60cc993e650f4d3cf74e7e9e&mobile=919847846110&authkey=362791AzG86a8K60cc822eP1&otp=1234", payload, headers)

# res = conn.getresponse()
# data = res.read()

# print(data.decode("utf-8"))

# class Verifyotp(generics):
#     def otp(request):
#         mobile = request.session['mobile']
#         context = {'mobile':mobile}
#         if request.method == 'POST':
#             otp = request.POST.get('otp')
#             profile = User.objects.filter(mobile=mobile).first()
            
#             if otp == profile.otp:
#                 return redirect('cart')
#             else:
#                 print('Wrong')
                
#                 context = {'message' : 'Wrong OTP' , 'class' : 'danger','mobile':mobile }
#                 return render(request,'otp.html' , context)
                
            
#         return render(request,'otp.html' , context)