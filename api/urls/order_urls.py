from django.urls import path
from api.views import order_views

urlpatterns = [
    path('', order_views.get_orders, name="get_orders"),

    path('add/', order_views.create_order, name="create_order"),
    path('myorders/', order_views.get_my_orders, name="get_my_orders"),
    
    path('<str:pk>/', order_views.get_order, name="get_order"),
    path('<str:pk>/pay/', order_views.update_order_to_paid, name="update_order_to_paid"),
    path('<str:pk>/deliver/', order_views.update_order_to_delivered, name="order-update_order_to_delivered"),



]