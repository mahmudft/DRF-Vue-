from django.urls import path
from api import views
from django.conf import settings
from django.conf.urls.static import static
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('book/', views.Book.as_view()),
    path('book/<int:pk>', views.Book.as_view())
    
]


