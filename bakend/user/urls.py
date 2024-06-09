from django.urls import path
from .views import RegisterView, LoginView, LogoutView, UserDetailView, UpdatePasswordView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('profile/', UserDetailView.as_view(), name='user-detail'),
    path('profile/change-password/', UpdatePasswordView.as_view(), name='change-password'),
]
