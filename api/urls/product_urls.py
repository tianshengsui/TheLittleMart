from django.urls import path
from api.views import product_views 

urlpatterns = [
    path('', product_views.get_products, name="get_products"),
    path('create/', product_views.create_product, name="create_product"),
    path('upload/', product_views.upload_image, name="upload_image"),


    path('<str:pk>/', product_views.get_product, name="get_product"),   
    path('<str:pk>/review/', product_views.create_review, name="create_review"),   
    path('update/<str:pk>/', product_views.update_product, name="update-product"),
    path('delete/<str:pk>/', product_views.delete_product, name="delete_product"),
    

    
]