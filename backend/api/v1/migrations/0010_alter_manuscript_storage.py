# Generated by Django 3.2 on 2021-07-29 18:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('v1', '0009_image_part_of_list'),
    ]

    operations = [
        migrations.AlterField(
            model_name='manuscript',
            name='storage',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
