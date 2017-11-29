from flask import Flask, redirect, request, jsonify
import imdb

IA = imdb.IMDb()

app = Flask(__name__)


@app.route("/")
def index():
    return redirect("https://trixster.xyz", code=302)


@app.route("/search", methods=["GET"])
def search_by_movie():
    movie = request.args.get("movie", None)
    if movie is not None:
        list_of_movies = IA.search_movie(movie)
        response = []
        for each in list_of_movies:
            data = each.data
            data['id'] = each.movieID
            data['link'] = "http://www.imdb.com/title/tt%s/" % each.movieID
            response.append(data)
        return jsonify(response), 200
    return "Not Found", 404
