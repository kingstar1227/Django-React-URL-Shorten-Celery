# Django Server Start

python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver


# Run Redis Database Server

redis-server


# Run Celery

celery -A test worker -l info