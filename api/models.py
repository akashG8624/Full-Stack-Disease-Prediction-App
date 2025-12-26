from django.db import models

class InsurancePrediction(models.Model):
    age = models.IntegerField()
    sex = models.IntegerField()       
    bmi = models.FloatField()
    smoker = models.IntegerField()   

    predicted_cost = models.FloatField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Prediction - {self.predicted_cost}"


from django.db import models

class DiseasePrediction(models.Model):
    age = models.IntegerField()
    sex = models.IntegerField()              
    chest_pain = models.IntegerField()       
    bp = models.IntegerField()
    cholesterol = models.IntegerField()

    prediction = models.IntegerField(null=True, blank=True) 
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Disease Prediction - {self.prediction}"

