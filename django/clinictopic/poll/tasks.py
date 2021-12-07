from django.core.management import call_command
from celery import shared_task
import glob
import os
from os.path import getmtime
from datetime import date, datetime, timedelta
from pathlib import Path
from clinictopic.settings.base import BASE_DIR

@shared_task(bind=True)
def  db_backup(self):
	try:
		list_of_files = glob.iglob(BASE_DIR+'/backup'+'\*')
		latest_file =max(list_of_files,key=os.path.getctime)
		lfile =os.listdir(BASE_DIR+'/backup')
		for  i  in  Path(BASE_DIR+'/backup').iterdir():
		    if (date.today()-timedelta(days=5)>datetime.fromtimestamp(os.path.getmtime(i)).date()):
				os.remove(i)		       
		call_command('dbbackup')
		return "Done"
	except:
		return "failed"
		# pass
		