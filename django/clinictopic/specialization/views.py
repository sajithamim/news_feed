from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from .models import (Specialization)
from .serializers import (GetSpecialization)
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
# Create your views here.


class GetSpecializations(APIView):
    @csrf_exempt
    def get(self,request):
        try:
            spec = Specialization.objects.all()
            serializers = GetSpecialization(spec,many=True)
            status_code = status.HTTP_200_OK
            response = {
            'success' : 'True',
            'status code' : status_code,
            'message': 'Specialization details',
            'data':serializers.data
            }
            return Response(response,status=status.HTTP_200_OK)
        except Exception as e:
            status_code = status.HTTP_400_BAD_REQUEST
            response = {
                'success': 'false',
                'status code': status.HTTP_400_BAD_REQUEST,
                'message': 'not found',
                'error': str(e)
                }
            return Response(response, status=status_code)