import os
from django.core.exceptions import ValidationError

def allow_only_images_validator(value):
    ext = os.path.splitext(value.name)[1]
    print(ext)
    valid_extenstions = ['.png', '.jpg', '.jpeg']
    if not ext.lower() in valid_extenstions:
        raise ValidationError('Unsupported file extenstions . allow extentions:' +str(valid_extenstions))