from django.urls import path
from django.conf.urls import url, include
from .views import (RegisterView, LogoutAPIView, SetNewPasswordAPIView, 
VerifyEmail, LoginAPIView, PasswordTokenCheckAPI, RequestPasswordResetEmail,
SignInOtpview,AdminLoginAPIView,UserProfile,UserProfilepicView,Userlist,
UserDetailApiview,UsernameAddview,UserSpecializationApiView,UserProfileSearchView)
# from rest_framework_jwt.views import refresh_jwt_token
from rest_framework_simplejwt import views as jwt_views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('profilepic', UserProfilepicView, 'images')

# from rest_framework_simplejwt.views import (
#     TokenRefreshView,
# )


urlpatterns = [
    path('register/', RegisterView.as_view(), name="register"),
    path('login/', LoginAPIView.as_view(), name="login"),
    path('logout/', LogoutAPIView.as_view(), name="logout"),
    path('email-verify/', VerifyEmail.as_view(), name="email-verify"),
    path('token/refresh/',  jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('request-reset-email/', RequestPasswordResetEmail.as_view(),
         name="request-reset-email"),
    path('password-reset/<uidb64>/<token>/',
         PasswordTokenCheckAPI.as_view(), name='password-reset-confirm'),
    path('password-reset-complete/', SetNewPasswordAPIView.as_view(),name='password-reset-complete'),
    # path('otp/',OtpAPIView.as_view(),name="sendmessage"),
    path('signinotp/',SignInOtpview.as_view(),name="signinotp"),
    path('adminlogin/',AdminLoginAPIView.as_view(),name="adminlogin"),
    path('profile/',UserProfile.as_view(),name="userprofile"),
    path('userlist/',Userlist.as_view(),name="userlist"),
    path('userdetail/<str:email>/',UserDetailApiview.as_view(),name="singleuserdetail"),
    path('addname/',UsernameAddview.as_view(),name="nameupdate"),
    path('userlistspecialization/<int:pk>/',UserSpecializationApiView.as_view(),name="userlist"),
    path('usersearck/<str:pk>/',UserProfileSearchView.as_view(),name="usersearch"),
    url(r'^', include(router.urls)),

#     path('profilepic/',UserProfilepicView.as_view(),name="profilepic"),

]
