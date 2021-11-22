from django.core.management import call_command
from celery import shared_task

@shared_task(bind=True)
def  db_backup(self):
	try:
		print("1")
		call_command('dbbackup')
		return "Done"
	except:
		# return "failed"
		pass
		