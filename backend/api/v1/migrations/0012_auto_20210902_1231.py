# Generated by Django 3.1.7 on 2021-09-02 12:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('v1', '0011_auto_20210827_1827'),
    ]

    operations = [
        migrations.RenameField(
            model_name='image',
            old_name='list_number',
            new_name='folio_number',
        ),
        migrations.RenameField(
            model_name='image',
            old_name='part_of_list',
            new_name='part_of_folio',
        ),
    ]
