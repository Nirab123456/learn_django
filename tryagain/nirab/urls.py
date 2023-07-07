from django.urls import path,include
from . import views

urlpatterns = [
    path('',views.home,name='home'),
    path('<int:year>/<str:month>',views.event,name='event'),
    path('login/',views.login_user,name='login_user'),
    path('profile',views.profile,name='profile'),
    path('real/',views.real, name='real'),
    path('logout/',views.logout_user,name='logout_user'),
    path('register/',views.register_user,name='register'),
    path('record',views.view_record,name='record'),
    path('delete_record',views.delete_record,name='delete_record'),
    path('update_record',views.update_record,name='update_record'),
    path('add_record',views.add_record,name='add_record'),
    path('add_event',views.add_event,name='add_event'),
    path('join_event/<int:event_id>', views.join_event, name='join_event'),
    path('leave_event/<int:event_id>', views.leave_event, name='leave_event'),
    path('BN_OCR',views.BN_OCR,name='BN_OCR'),
    path('ENG_OCR',views.ENG_OCR,name='ENG_OCR'),
    path('bangla_ocr',views.bangla_ocr,name='bangla_ocr'),
    path('download_text/<path:text_path>/', views.download_text, name='download_text'),
    path('index/', views.index, name='index'),
    path('save_mail_form/', views.save_mail_form, name='save_mail_form'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('profile_picture/', views.profile_picture, name='profile_picture'),
    path('apps/', views.apps, name='apps'),
    path('ENG_OCR_HANDWRITTEN', views.ENG_OCR_HANDWRITTEN, name='ENG_OCR_HANDWRITTEN'),
]
