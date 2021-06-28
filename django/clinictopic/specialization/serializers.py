from django.db import models
from django.db.models import fields
from rest_framework import serializers
from .models import (Specialization,SubSpecialization,Audience,UserType,UserSpecialization,UserSubSpecialization)
from rest_framework import  status

class GetSubspecializationSerializer(serializers.ModelSerializer):

    class Meta: 
        model = SubSpecialization
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
    id = serializers.ReadOnlyField()
    created_at = serializers.ReadOnlyField()
    updated_at = serializers.ReadOnlyField()
    user_spec_id = serializers.ReadOnlyField()
    class Meta:
        model = UserSubSpecialization
        fields = ['id','user_spec_id','sub_spec_id','created_at','updated_at']

class UserSpecializationSerializer(serializers.ModelSerializer):
    sub_userspec_id = UserSubSpecializationSerializer(many=True)
    id = serializers.ReadOnlyField()
    user_id=serializers.HiddenField(default=serializers.CurrentUserDefault())
    created_at = serializers.ReadOnlyField()
    updated_at = serializers.ReadOnlyField()
    class Meta:
        model = UserSpecialization
        fields = ['id','user_id', 'spec_id','created_at','updated_at','sub_userspec_id']

    def create(self, validated_data):
        subspec = validated_data.pop('sub_userspec_id')
        userspec = UserSpecialization.objects.create(**validated_data)
        for subspec in subspec:
            UserSubSpecialization.objects.create(user_spec_id=userspec, **subspec)
        return userspec

class UserSpecgetserializer(serializers.ModelSerializer):

    class Meta:
        model = UserSubSpecialization
        fields = '__all__'
        depth = 2
        level= 2