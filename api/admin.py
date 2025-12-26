from django.contrib import admin

from .models import InsurancePrediction,DiseasePrediction

admin.site.register(InsurancePrediction)
admin.site.register(DiseasePrediction)