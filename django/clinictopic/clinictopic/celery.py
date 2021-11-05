from __future__ import absolute_import,unicode_literals
import os
from celery import Celery
from django.conf import settings
from celery.schedules import crontab

os.environ.setdefault('DJANGO_SETTINGS_MODULE','clinictopic.settings.base')

app = Celery('clinictopic')

# Celery Beat Settings
app.conf.beat_schedule = {
    'backup-every-day': {
        'task': 'poll.tasks.db_backup',
        'schedule': crontab(hour=21,minute=21),
    } 
}

# Celery Schedules - https://docs.celeryproject.org/en/stable/reference/celery.schedules.html
app.conf.enable_utc = False

app.conf.update(timezone ='Asia/Kolkata')

app.config_from_object(settings,namespace='CELERY')

app.autodiscover_tasks()

@app.task(bind=True)
def debug_task(self):
    print('Request: {0!r}'.format(self.request))

