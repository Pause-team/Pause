## IMDb HTTP API for searching movies.

This is a simple IMDb API which allows user to search for movies in the IMDb database.
It useses IMDbPy to perform the search.

### How to run?

#### Docker

`docker run -d --rm -p 5000:5000 anish92gupta/imdb_api:latest`

#### Normal system

```sh
pip install -r requirements.txt
export FLASK_APP=`pwd`/main.py
flask run --host 0.0.0.0
```
