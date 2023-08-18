# Generated by Django 4.2.2 on 2023-08-18 03:38

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('nirab', '0047_mental_health_prediction_model'),
    ]

    operations = [
        migrations.CreateModel(
            name='PERSONAL_DIARY',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.TextField(max_length=200)),
                ('content', models.TextField(blank=True, max_length=2000, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='personal_diary', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
