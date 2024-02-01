from django.shortcuts import render, HttpResponse, HttpResponseRedirect
from django.http import JsonResponse
from django.urls import reverse


# Create your views here.
def base(request):
    return render(request, "tech/layout.html")
