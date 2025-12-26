from django.urls import path
from .views import InsurancePredictionCreateView,MedicalDiseasePrediction

urlpatterns = [
    path('predict/', InsurancePredictionCreateView.as_view(), name='insurance-predict'),
    path("disese/",MedicalDiseasePrediction.as_view(),name="Disease_prediction")
]
