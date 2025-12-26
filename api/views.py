
import os
import joblib
import numpy as np
from django.conf import settings
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status

from .models import InsurancePrediction,DiseasePrediction
from .serializers import InsurancePredictionSerializer,DiseasePredictionSerializer


model = joblib.load('insurance.pkl')
scaler = joblib.load('scaler.pkl')


class InsurancePredictionCreateView(generics.ListCreateAPIView):
    queryset = InsurancePrediction.objects.all()
    serializer_class = InsurancePredictionSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        age = serializer.validated_data['age']
        sex = serializer.validated_data['sex']
        bmi = serializer.validated_data['bmi']
        smoker = serializer.validated_data['smoker']

        # Scale input (same order as training)
        input_data = scaler.transform([[age, sex, bmi, smoker]])

        # Predict
        predicted_cost = model.predict(input_data)[0]

        # Save to DB
        instance = serializer.save(predicted_cost=predicted_cost)

        return Response(
            {
                "age": age,
                "sex": sex,
                "bmi": bmi,
                "smoker": smoker,
                "predicted_medical_cost": round(predicted_cost, 2)
            },
            status=status.HTTP_201_CREATED
        )
        
        
model1 = joblib.load('disease.pkl')
scaler1 = joblib.load('scaler1.pkl')

class MedicalDiseasePrediction(generics.ListCreateAPIView):
    queryset = DiseasePrediction.objects.all()
    serializer_class = DiseasePredictionSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        age = serializer.validated_data['age']
        sex = serializer.validated_data['sex']
        chest_pain = serializer.validated_data['chest_pain']
        bp = serializer.validated_data['bp']
        cholesterol = serializer.validated_data['cholesterol']

        # Scale input (same order as training)
        input_data = scaler1.transform([[age, sex, chest_pain, bp, cholesterol]])

        # Logistic Regression Prediction → 0 or 1
        prediction = int(model1.predict(input_data)[0])

        # Save to DB
        serializer.save(prediction=prediction)

        return Response(
            {
                "age": age,
                "sex": sex,
                "chest_pain": chest_pain,
                "bp": bp,
                "cholesterol": cholesterol,
                "prediction": "Yes" if prediction == 1 else "No"
            },
            status=status.HTTP_201_CREATED
        )