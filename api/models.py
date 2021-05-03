from django.contrib.auth import get_user_model
from django.db import models
from django.contrib.auth.models import User


class Books(models.Model):
	id = models.AutoField(primary_key=True)
	owner = models.ForeignKey(User, on_delete=models.CASCADE)
	author = models.CharField(max_length=200, blank=True)
	title = models.CharField(max_length=400)
	description = models.TextField()
	poster = models.ImageField()

	def __str__(self):
		return str(self.id)
