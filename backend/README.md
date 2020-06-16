# Capstone Backend

## Requirements

- Python > 3.6.

## About

- REST API server written with the Django framework in Python.
- Packages handled by pip in a virtual environment.

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

## Python

- Package versioning is handled by pip exporting and importing to `requirements.txt`.
  - This will not work properly unless a virtual environment is used and `pip freeze > requirements.txt` is done when new packages are added.
  - Virtual environment uses full file paths so it must be generated fresh for each new user.
- The code is inside `project\api`.

## Django

- Django REST framework is used to handle AJAX requests.
- Django does not serve any webpages itself.
- To enable Cross Origin Resource Sharing (CORS), the `django-cors-headers` middleware is used to attach the CORS header to each response.
  - If a cross origin error comes up, check the CORS spec to make sure that the response is compliant.
  - Read more here: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS.
- URLs going to `\api` are all passed to the url handler in `project\api\urls.py`, where the routes are bound to specified function calls.
- Django uses a Model View Controller (MVC) but as long as we do not want to use the Django database handler, we are not stuck with using this.
  - Since we use Django for backend only, we only need the View and (potentially) Model.
  - Basically, Views receive and respond to requests, using function calls to a Model.
  - Models interact with the database / other data sources.
