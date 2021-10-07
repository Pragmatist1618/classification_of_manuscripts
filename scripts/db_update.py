# import os

# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'classification_of_manuscripts.settings')
# import django

# django.setup()
from backend.api.v1.models import Manuscript, Image


def main():
    manuscript1 = Manuscript.objects.filter(id=2)
    print(manuscript1.values_list())
    manuscript2 = Manuscript.objects.get(cipher="Grec. 74")
    print(manuscript2)
    manuscript_id = manuscript2.id
    images = list(Image.objects.filter(manuscript=manuscript_id))
    for img in images:
        print(img.id, img.image_name)
        img.creation_date = "1059 г."
        img.save()


if __name__ == '__main__':
    main()
