from rest_framework import serializers
from .models import (Categoeries)

class CategorySerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    image = serializers.ImageField(max_length=None, use_url=True, allow_null=False, required=True)
    class Meta:
        model = Categoeries
        fields = ['id','title','image']