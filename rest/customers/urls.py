from django.urls import path
from accounts import views as AccountViews
from . import views

urlpatterns = [
    path('', AccountViews.custdashboard, name='custdashboard'),
    path('profile/', views.cprofile, name='cprofile')
]
