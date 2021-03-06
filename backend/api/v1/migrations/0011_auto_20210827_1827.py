# Generated by Django 3.1.7 on 2021-08-27 18:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('v1', '0010_alter_manuscript_storage'),
    ]

    operations = [
        migrations.AddField(
            model_name='image',
            name='creation_date',
            field=models.CharField(blank=True, default='Неизвестно', max_length=25, null=True),
        ),
        migrations.AddField(
            model_name='image',
            name='creation_date_bgn',
            field=models.CharField(blank=True, max_length=25, null=True),
        ),
        migrations.AddField(
            model_name='image',
            name='creation_date_end',
            field=models.CharField(blank=True, max_length=25, null=True),
        ),
        migrations.AddField(
            model_name='manuscript',
            name='creation_date_bgn',
            field=models.CharField(blank=True, max_length=25, null=True),
        ),
        migrations.AddField(
            model_name='manuscript',
            name='creation_date_end',
            field=models.CharField(blank=True, max_length=25, null=True),
        ),
        migrations.AlterField(
            model_name='image',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='manuscript',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]
