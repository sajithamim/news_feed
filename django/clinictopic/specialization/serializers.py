from django.db import models
from django.db.models import fields
from rest_framework import serializers
from .models import (Specialization,SubSpecialization,Audience,UserType,UserSpecialization,UserSubSpecialization)
from rest_framework import  status
from drf_writable_nested.serializers import WritableNestedModelSerializer
from authentication.models import User
# import json
from rest_framework import generics, status

class GetSubspecializationSerializer(serializers.ModelSerializer):

    class Meta: 
        model = SubSpecialization
        fields = '__all__'

class GetSpecializationseriallizer(serializers.ModelSerializer):
    class Meta:
        model = Specialization
        fields = '__all__'

class GetSpecialization(serializers.ModelSerializer):
    id =  serializers.ReadOnlyField()
    specialization_id = GetSubspecializationSerializer(many=True)
    created_at =  serializers.ReadOnlyField()
    updated_at =  serializers.ReadOnlyField()
    class Meta:
        model = Specialization
        fields = ['id','name','icon','created_at','updated_at','specialization_id']


class GetAudienceSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    class Meta:
        model = Audience
        fields = ['id','name']


class userTypeSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()

    # user_id = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())
    user_id=serializers.HiddenField(default=serializers.CurrentUserDefault())
    created_at =  serializers.ReadOnlyField()
    updated_at =  serializers.ReadOnlyField()

    class Meta:
        model = UserType
        fields = ['id','user_id','aud_id','mci','created_at','updated_at']
    
    def validate(self,attrs):
        mci = attrs.get('mci','')
        aud_id = attrs.get('aud_id','')
        if mci =="":
            raise serializers.ValidationError("mci is required")
        if not aud_id:
            raise serializers.ValidationError("Audience  is required")
        return attrs

    def create(self, validated_data):
        return UserType.objects.create(**validated_data)
        # userdata = UserType.objects.create(**validated_data)
        # status_code = status.HTTP_200_OK

        # # print(str(**validated_data))
        # return {
        #     'success' : 'True',
        #     'status code' : status_code,
        #     'message': 'user type created',
        #     'data':{
        #             "id": userdata.id,
        #             "aud_id": userdata.aud_id.id,
        #             "mci": userdata.mci,
        #             "created_at": userdata.created_at,
        #             "updated_at": userdata.updated_at
        #             }
        #     }
class UserSubSpecializationSerializer(serializers.ModelSerializer):
    # id = serializers.ReadOnlyField()
    # created_at = serializers.ReadOnlyField()
    # updated_at = serializers.ReadOnlyField()
    # user_spec_id = serializers.ReadOnlyField()
    # user_spec_id = serializers.PrimaryKeyRelatedField(
    #     queryset=UserSpecialization.objects.all()
    # )

    class Meta:
        model = UserSubSpecialization
        fields = ['sub_spec_id']
        write_only_fields = ('sub_spec_id')

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['sub_spec_id'] = GetSpecializationseriallizer(instance.sub_spec_id).data
        return response


# class SubspecField(serializers.PrimaryKeyRelatedField):
#     def to_representation(self, value):
#         pk = super(SubspecField, self).to_representation(value)
#         try:
#            item = SubSpecialization.objects.get(pk=pk)
#            serializer = UserSubSpecializationSerializer(item)
#            return serializer.data
#         except SubSpecialization.DoesNotExist:
#            return None

#     def get_choices(self, cutoff=None):
#         queryset = self.get_queryset()
#         if queryset is None:
#             return {}

#         return OrderedDict([(item.id, str(item)) for item in queryset])
   


class UserSpecializationSerializer(serializers.ModelSerializer):
    sub_userspec_id = UserSubSpecializationSerializer(many=True)
    # id = serializers.ReadOnlyField()
    user_id=serializers.HiddenField(default=serializers.CurrentUserDefault())

    # user_id = serializers.IntegerField()
    # user_id = serializers.
    # spec_id = serializers.IntegerField()
    # user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(),
    #                                               many=False) 
    # created_at = serializers.ReadOnlyField()
    # updated_at = serializers.ReadOnlyField()
    class Meta:
        model = UserSpecialization
        fields = ['user_id','spec_id','sub_userspec_id']
        write_only_fields = ('user_id','spec_id','sub_userspec_id')


    # def validate(self,attrs):
    #     user_id = self.context["user_id"]
    #     print(user_id)
    #     return attrs
    # def get_user_id(self, obj):
    #     # return (now() - obj.date_joined).days
    #     print(self.context["user_id"])
    #     return self.context["user_id"]

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['spec_id'] = GetSpecializationseriallizer(instance.spec_id).data
        return response
    def create(self, validated_data):
            subspec = validated_data.pop('sub_userspec_id')
            userspec = UserSpecialization.objects.create(**validated_data)
            usersubarray=[]
            for subspec in subspec:
                usersub=UserSubSpecialization.objects.create(user_spec_id=userspec, **subspec)
            # print(usersubarray)
            # spec_id = {}
            return userspec
    # def to_representation(self, instance):
    #     data = super(UserSpecializationSerializer, self).to_representation(instance)
    #     data['spec_id'] = GetSpecializationseriallizer(instance.spec_id).data
    #     return data

# class SpecField(serializers.PrimaryKeyRelatedField):
#     def to_representation(self, value):
#         pk = super(SpecField, self).to_representation(value)
#         try:
#            item = Specialization.objects.get(pk=pk)
#            serializer = UserSpecializationSerializer(item)
#            return serializer.data
#         except Specialization.DoesNotExist:
#            return None

#     def get_choices(self, cutoff=None):
#         queryset = self.get_queryset()
#         print(queryset)
#         if queryset is None:
#             return {}

#         return OrderedDict([(item.id, str(item)) for item in queryset])
class UserSpecgetserializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UserSubSpecialization
        fields = '__all__'
        depth = 2