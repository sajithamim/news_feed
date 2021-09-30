from django.db import models
from django.db.models import fields
from rest_framework import serializers
from .models import (Specialization,SubSpecialization,Audience,UserType,UserSpecialization,
UserSubSpecialization,Advisory,Quiz)
from rest_framework import  status
from drf_writable_nested.serializers import WritableNestedModelSerializer
from authentication.models import User
from authentication.serializers import UserProfileSerializer
# import json
from rest_framework import generics, status



class GetSubspecializationArraySerializer(serializers.ModelSerializer):
    subspeccount = serializers.SerializerMethodField()
    class Meta: 
        model = SubSpecialization
        fields = '__all__'

    def get_subspeccount(self, obj):
        # print(self.context)
        user_id =self.context['request'].user
        # print(user_id)
        return UserSubSpecialization.objects.filter(user_spec_id__user_id=user_id,sub_spec_id=obj.id).count()

class GetSpecializationseriallizer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    class Meta:
        model = Specialization
        fields = '__all__'

class GetSubspecializationSerializer(serializers.ModelSerializer):
    class Meta: 
        model = SubSpecialization
        fields = '__all__'


class GetSpecialization(serializers.ModelSerializer):
    id =  serializers.ReadOnlyField()
    specialization_id = GetSubspecializationSerializer(many=True)
    created_at =  serializers.ReadOnlyField()
    updated_at =  serializers.ReadOnlyField()
    # speccount = serializers.SerializerMethodField()
    # categorycount = serializers.SerializerMethodField()
    class Meta:
        model = Specialization
        fields = ['id','name','icon','created_at','updated_at','specialization_id']

    # def get_speccount(self, obj):
    #     print(self.context)
    #     user_id =self.context['request'].user
    #     # print(user_id)
    #     return UserSpecialization.objects.filter(user_id=user_id,spec_id=obj.id).count()


class GetSpecializationandsub(serializers.ModelSerializer):
    id =  serializers.ReadOnlyField()
    specialization_id = GetSubspecializationArraySerializer(many=True)
    created_at =  serializers.ReadOnlyField()
    updated_at =  serializers.ReadOnlyField()
    speccount = serializers.SerializerMethodField()
    # categorycount = serializers.SerializerMethodField()
    class Meta:
        model = Specialization
        fields = ['id','name','icon','created_at','updated_at','specialization_id','speccount']

    def get_speccount(self, obj):
        # print(self.context)
        user_id =self.context['request'].user
        # print(user_id)
        return UserSpecialization.objects.filter(user_id=user_id,spec_id=obj.id).count()
    
    # def get_categorycount(self,obj):
    #     user_id =self.context['request'].user
    #     # print(user_id)
    #     return UserCategory.objects.filter(user_id=user_id).count()


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
    class Meta:
        model = UserSubSpecialization
        fields = ['sub_spec_id']
        write_only_fields = ('sub_spec_id')

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['sub_spec_id'] = GetSpecializationseriallizer(instance.sub_spec_id).data
        return response


class UserSpecializationSerializer(serializers.ModelSerializer):
    sub_userspec_id = UserSubSpecializationSerializer(many=True)

    user_id=serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = UserSpecialization
        fields = ['user_id','spec_id','sub_userspec_id']
        write_only_fields = ('user_id','spec_id','sub_userspec_id')


    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['spec_id'] = GetSpecializationseriallizer(instance.spec_id).data
        return response
    def create(self, validated_data):
            sub = False
            if 'sub_userspec_id' in  validated_data: 
                sub =True    
                subspec = validated_data.pop('sub_userspec_id')
            userspec = UserSpecialization.objects.create(**validated_data)
            usersubarray=[]
            if sub:
                for subspec in subspec:
                    usersub=UserSubSpecialization.objects.create(user_spec_id=userspec, **subspec)
                # print(usersubarray)
                # spec_id = {}
            return userspec


class SpecializationpicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Specialization
        fields = ['icon']

class SubSpecializationpicSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubSpecialization
        fields = ['icon']


class AdvisorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Advisory
        fields = '__all__'
    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user_id'] = UserProfileSerializer(instance.user_id).data
        return response

class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = '__all__'

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['sub_spec_id'] = GetSubspecializationSerializer(instance.sub_spec_id).data
        return response