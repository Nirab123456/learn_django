# Generated by Django 4.2.2 on 2023-08-18 03:28

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('nirab', '0046_alter_handwritten_text_model_text_handwritten'),
    ]

    operations = [
        migrations.CreateModel(
            name='MENTAL_HEALTH_PREDICTION_MODEL',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('admiration', models.CharField(max_length=200)),
                ('amusement', models.CharField(max_length=200)),
                ('anger', models.CharField(max_length=200)),
                ('annoyance', models.CharField(max_length=200)),
                ('approval', models.CharField(max_length=200)),
                ('caring', models.CharField(max_length=200)),
                ('confusion', models.CharField(max_length=200)),
                ('curiosity', models.CharField(max_length=200)),
                ('desire', models.CharField(max_length=200)),
                ('disappointment', models.CharField(max_length=200)),
                ('disapproval', models.CharField(max_length=200)),
                ('disgust', models.CharField(max_length=200)),
                ('embarrassment', models.CharField(max_length=200)),
                ('excitement', models.CharField(max_length=200)),
                ('fear', models.CharField(max_length=200)),
                ('gratitude', models.CharField(max_length=200)),
                ('grief', models.CharField(max_length=200)),
                ('joy', models.CharField(max_length=200)),
                ('love', models.CharField(max_length=200)),
                ('nervousness', models.CharField(max_length=200)),
                ('optimism', models.CharField(max_length=200)),
                ('pride', models.CharField(max_length=200)),
                ('realization', models.CharField(max_length=200)),
                ('relief', models.CharField(max_length=200)),
                ('remorse', models.CharField(max_length=200)),
                ('sadness', models.CharField(max_length=200)),
                ('surprise', models.CharField(max_length=200)),
                ('neutral', models.CharField(max_length=200)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='mental_health_prediction_model', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]