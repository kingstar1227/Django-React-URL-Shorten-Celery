from celery.decorators import task
from celery.utils.log import get_task_logger
from api.models import Record
import short_url
import time

logger = get_task_logger(__name__)

@task(name = "shorten_url_task")
def shorten_url_task(record_id):
    logger.info("shorten url")
    time.sleep(2)
    record = Record.objects.get(pk=record_id)
    record.shorten_url = short_url.encode_url(record.id)
    record.status = 'success'
    record.save()
    return "success"