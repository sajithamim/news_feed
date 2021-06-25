from django.db import models
from django.db.models import fields
from rest_framework import serializers
from .models import (Specialization,SubSpecialization,Audience,UserType)

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
    user_id = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())
    created_at =  serializers.ReadOnlyField()
    updated_at =  serializers.ReadOnlyField()

    class Meta:
        model = UserType
        fields = ['id','user_id','mci','created_at','updated_at']
