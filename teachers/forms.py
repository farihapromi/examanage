from django import forms
from django.contrib.auth.forms import AuthenticationForm
from .models import Staff


class StaffLoginForm(AuthenticationForm):
    username = forms.CharField(max_length=254, widget=forms.TextInput(attrs={'autofocus': True}))

    class Meta:
        model = Staff
        fields = ('username', 'password')