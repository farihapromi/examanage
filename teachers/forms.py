# from django import forms
# from django.contrib.auth.forms import AuthenticationForm
# from .models import Staff


# class StaffLoginForm(AuthenticationForm):
#     username = forms.CharField(max_length=254, widget=forms.TextInput(attrs={'autofocus': True}))

#     class Meta:
#         model = Staff
#         fields = ('username', 'password')

# from django.contrib.auth.forms import AuthenticationForm
# from teachers.models import Staff

# class CustomAuthenticationForm(AuthenticationForm):
#     class Meta:
#         model = Staff
#         fields=('username','password')

from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm


class UserAdminCreationForm(UserCreationForm):
    """
    A Custom form for creating new users.
    """

    class Meta:
        model = get_user_model()
        fields = ['email']