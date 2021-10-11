from django.urls import path
from api.views import user_views

urlpatterns = [
    path('login/', user_views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', user_views.register_user, name='register_user'),
    path('profile/', user_views.get_user_profile, name='get_user_profile'),
    path('profile/update/', user_views.update_user_profile, name='update_user_profile'),
    path('delete/<str:pk>/', user_views.delete_user, name='delete_user'),
    path('update/<str:pk>/', user_views.update_user, name='update_user'),
    path('<str:pk>/', user_views.get_user, name='get_user'),
    path('', user_views.get_users, name='get_users'),

]