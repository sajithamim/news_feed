from os import read, write
from django.db import models
from django.db.models import fields
from rest_framework import serializers
from .models import AddSpecialization,Ads,AddUser,AllUserAdd
from specialization.serializers import (GetSpecialization)
from authentication.models import User
from authentication.serializers import UserProfileSerializer

class AddSpecializationSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    class Meta:
        model = AddSpecialization
        fields = ['id','spec_id']


    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['spec_id'] = GetSpecialization(instance.spec_id).data
        return response

class AllUserAddSerializer(serializers.ModelSerializer):
    addimage = serializers.ImageField(max_length=None, use_url=True, allow_null=True, required=False)
    class Meta:
        model=AllUserAdd
        fields ='__all__'


class AllUseraddImage(serializers.ModelSerializer):
    class Meta:
        model = AllUserAdd
        fields = ['addimage']


class AddSerializer(serializers.ModelSerializer):
    addimage = serializers.ImageField(max_length=None, use_url=True, allow_null=True, required=False)
    add_specialization = AddSpecializationSerializer(many=True)
    class Meta:
        model = Ads
        fields = '__all__'

    def create(self, validated_data):
        add_spec = validated_data.pop('add_specialization')
        ads = Ads.objects.create(**validated_data)
        for data in add_spec:
            addspecialization = AddSpecialization.objects.create(adsid=ads, **data)
        return ads

    def update(self, instance, validated_data):
        if 'title' in validated_data:
            instance.title = validated_data.get('title', instance.title)
        if 'url' in validated_data:
            instance.url = validated_data.get('url', instance.url)
        instance.save()
        adddelete = AddSpecialization.objects.filter(adsid=instance).delete()
        add_spec = validated_data.pop('add_specialization')
        for data in add_spec:
            addspecialization = AddSpecialization.objects.create(adsid=instance, **data)
        return instance



class AddImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ads
        fields = ['addimage']


class AddUserSerializer(serializers.ModelSerializer):
    # email = serializers.EmailField(required=False,allow_null=False,allow_blank=False)
    class Meta:
        model = AddUser
        fields = ['adsid','spec_id','user_id']
        write_only_fields = ('user_id')

    # def create(self, validated_data):
    #     print (validated_data)
    #     # user = User.objects.get(email=validated_data['email'])
    #     # del validated_data['email']
    #     for data in validated_data:
    #         # print(data)
    #         add = AddUser.objects.create(**data)
    #     return add

class AddUserSelectedSerializer(serializers.ModelSerializer):
    user_id = UserProfileSerializer()
    class Meta:
        model = AddUser
        fields = ['user_id']

class SelectedBannerSerializer(serializers.ModelSerializer):
    banner=AddSerializer(many=True,read_only=True)
    #banner=serializers.StringRelatedField(many=True,read_only=True)
    class Meta:
        model=AddUser
        fields=['adsid','banner']
        depth=1
        level=1