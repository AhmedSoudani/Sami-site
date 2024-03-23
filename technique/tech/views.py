from django.shortcuts import render, HttpResponse, HttpResponseRedirect
from django.http import JsonResponse
from django.urls import reverse
from django.db import IntegrityError
from random import randint
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from .models import User, Exercice, Books



# Create your views here.
def base(request):
    return render(request, "tech/convert.html")


def levels(request):
    return render(request, "tech/levels.html")

@csrf_exempt
def exercice(request, num):
    # Fetching exercises for the specified level
    exercises = Exercice.objects.filter(level=num)

    # Handling case when there are no exercises for the specified level
    if not exercises.exists():
        return JsonResponse({"message": "No exercises found for the specified level"}, status=404)

    # Selecting a random exercise from the fetched exercises
    random_exercise = exercises.order_by('?').first()

    if request.method == 'GET':
        print("GET REQUEST")
        if random_exercise:
            print(random_exercise)
        else:
            print("No exercise found for the specified level")
        return JsonResponse(random_exercise.serialize())
            
    elif request.method == 'POST':
        print("POST REQUEST")
        if random_exercise:
            print(random_exercise.response)
        else:
            print("No exercise found for the specified level")
        return JsonResponse(random_exercise.serialize())


def index(request):
    bks = Books.objects.all()

    return render(request, "tech/index.html", {
        "books" : bks
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