from rest_framework import serializers
from .models import InsurancePrediction,DiseasePrediction

class InsurancePredictionSerializer(serializers.ModelSerializer):
    class Meta:
        model = InsurancePrediction
        fields = '__all__'
        read_only_fields = ['predicted_cost', 'created_at']




class DiseasePredictionSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiseasePrediction
        fields = '__all__'
        read_only_fields = ['prediction', 'create_at']
