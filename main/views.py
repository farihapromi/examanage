
from django.shortcuts import render

def index(request):
    return render(request, 'index.html')

def react_page(request):
    return render(request, 'react_page.html')
