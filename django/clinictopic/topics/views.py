from django.shortcuts import render
from .serializers import(CategorySerializer)
from rest_framework.parsers import FileUploadParser
from rest_framework import generics

from .models import (Categoeries)
# Create your views here.
class CategoryFileUploadView(generics.ListAPIView):
    parser_class = (FileUploadParser,)
    serializer_class = CategorySerializer

    def get_queryset(self):
        queryset = Categoeries.objects.all()
        return queryset

    def post(self, request, *args, **kwargs):
        # print(request.data)
        file_serializer = CategorySerializer(data=request.data)
        # print(file_serializer)
        if file_serializer.is_valid():
            file_serializer.save()
            return Response(
                file_serializer.data,
                status=status.HTTP_201_CREATED
            )
        else:
            return Response(
                file_serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

    def put(self, request):
        imageid = self.request.POST.get('id')
        f_obj = Categoeries.objects.filter(id=imageid) #File is my model name
        file_serializer = CategorySerializer(f_obj, data=request.data)
        if file_serializer.is_valid():
            file_serializer.save()
            return Response(
                file_serializer.data,
                status=status.HTTP_201_CREATED
            )
        else:
            return Response(
                file_serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

    def delete(self, request):
        imageid = self.request.POST.get('id')
        f_obj = Categoeries.objects.filter(id=imageid) #File is my model name
        if f_obj.exists():
            f_obj.delete()
            return Response(
                {
                    "Status": True,
                    "Message": "image deleted"
                }
            )