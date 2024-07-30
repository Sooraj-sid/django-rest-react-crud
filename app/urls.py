from django.urls import path
from . import views

urlpatterns = [
    path('allbook', views.book_list, name='all_book'),
    path('book/<int:book_id>', views.book_by_id, name='book_by_id'),
    path('delete/<int:book_id>',views.delete_book_by_id, name='delete_book_by_id'),
    path('addbook', views.add_book,name='add_book'),
    path('update/<int:book_id>', views.update_book, name='update_book'),
]
