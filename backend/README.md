# Capstone Backend

## Specs

- Written in Python.
- Packages handled by venv.
- Based on the Django REST framework.
- Only serves REST requests.
- CORS enabled via django-cors-headers middleware.

## Getting Started

1. (If first time) Create a virtual environment with `python -m venv env`.
2. Start the virtual environment with the appropriate script in `env\Scripts\activate.*`.
3. Install the packages with `pip install -r requirements.txt`.
   - When you add another package, use `pip freeze > requirements.txt` to export the package list.
   - If the IDE complains about unresolved imports, change the python interpreter to `\env\Scripts\python.exe`.
4. Run the webserver on port 8000 with `python project\manage.py runserver`.

Superuser account (http://localhost:8000/admin/):
- User:  admin
- Pass:  adm1n
