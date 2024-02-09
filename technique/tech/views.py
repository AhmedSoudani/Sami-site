from django.shortcuts import render, HttpResponse, HttpResponseRedirect
from django.http import JsonResponse
from django.urls import reverse
from django.db import IntegrityError
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from .models import User, Exercice



# Create your views here.
def base(request):
    return render(request, "tech/layout.html")


def index(request):
    return render(request, "tech/index.html")

def levels(request):
    return render(request, "tech/levels.html")

@csrf_exempt
def exercice(request, num):
    x = None
    if request.method == 'GET':
        if 1 <= num <= 3:
            ex = Exercice.objects.filter(level = num).order_by('?').first()
            x = ex.response
            return JsonResponse(ex.serialize())
        else:
            return JsonResponse({
                "message" : "indefined level"
            })
    elif request.method == 'POST':
        if x is not None:
            return JsonResponse({
                "ex" : x
            })
        else:
            return JsonResponse({
                "error" : "There's no exercice here!"
            })


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))

def login_view(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "tech/login.html", {"message": "Invalid email and/or password!"})

    else:
        return render(request, "tech/login.html")
    

def register(request):
    if request.method == "POST":
         
        username = request.POST["username"]
        email = request.POST["email"]
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]

        if password != confirmation:
            return render(request, "tech/register.html", {
                "message": "Password must match the confiramtion"
            })
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError as e:
            print(e)
            return render(request, "tech/register.html", {
                "message": "User already exists!"
            })
        
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    
    else:
        return render(request, "tech/register.html")