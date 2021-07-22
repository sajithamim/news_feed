from django.db import models
from django.db.models import fields
from rest_framework import serializers
from .models import AddSpecialization,Ads,AddUser
from specialization.serializers import (GetSpecialization)

class AddSpecializationSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    class Meta:
        model = AddSpecialization
        fields = ['id','spec_id']


    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['spec_id'] = GetSpecialization(instance.spec_id).data
        return response

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

class AddImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ads
        fields = ['addimage']