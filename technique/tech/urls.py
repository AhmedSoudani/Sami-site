from django.urls import path
from . import views

urlpatterns  = [
    path('', views.index, name="index"),
    path('Levels', views.levels, name="levels"),
    path('Levels/<int:num>', views.exercice ,name="exercice"),
    path("login", views.login_view, name="login"),
    path("register", views.register, name="register"),
    path("logout", views.logout_view, name="logout"),

    #API Routes
    path('convert/', views.base, name='base'),
]