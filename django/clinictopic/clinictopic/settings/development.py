from .base import *

DEBUG = True

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'clinicdb',
        'USER': 'ajith',
        'PASSWORD': '123456',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}