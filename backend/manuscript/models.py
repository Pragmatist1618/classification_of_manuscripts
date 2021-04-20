from django.contrib.auth.models import User
from django.db import models


# модель рукописи
class Manuscript(models.Model):
    # название (шифр рукописи)
    # (unique=True) - Наименование должно быть уникально
    title = models.CharField(max_length=255, unique=True)
    # автор
    # (null=True) - Поле может хранить null
    # (blank=True) - проверка формы позволит ввести пустое значение
    author = models.CharField(max_length=255, null=True, blank=True)
    # место хранения
    storage = models.CharField(max_length=255, null=True, blank=True)
    # дата создания
    # используем чар, так как тип даты не имеет строгого формата (может быть указан период)
    # но для поиска по дате, придется придерживаться однообразного стиля
    # TODO: придумать формат стиля
    creation_date = models.CharField(max_length=255, default='Неизвестно')
    # TODO: Создать разделение на Евангелия и Лекционарий (?) category
    # Указатель на Евангелия
    GOSPEL_CHOICES = [
        ('Matthew', 'Матфея'),
        ('Luke', 'Луки'),
        ('Mark', 'Марка'),
        ('John', 'Иоанна')
    ]
    # (choices=GOSPEL_CHOICES) - варианты поля
    gospel = models.CharField(max_length=7, choices=GOSPEL_CHOICES, null=True, blank=True)
    # Лекционарий (является ли таковым)
    lectionary = models.BooleanField(default=False)
    # Набор описания Лекционария
    lectionary_description = models.JSONField(null=True, blank=True)
    # Общие отличительные характеричтики
    description = models.JSONField(null=True, blank=True)

    def __str__(self):
        return self.title


# Создаем отдельную модель для изображений, чтобы иметь возможность к одной записи
# добавлять сразу несколько изображений
class Image(models.Model):
    # путь к изображению
    image = models.ImageField()
    # к какой рукописи относится
    # Каскадное удаление. Django эмулирует поведение SQL правила ON DELETE CASCADE
    # и так же удаляет объекты, связанные через ForeignKey
    manuscript = models.ForeignKey(Manuscript, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.id)