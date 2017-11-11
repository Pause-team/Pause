#!/usr/bin/env python
"""
searchFunctions.py
Will search the IMDB database with the keywords
and give the results based on parameters
"""

import sys
import json
# Import the IMDbPY package.
try:
    import imdb
except ImportError:
    print 'Install the IMDB package - check instructions.txt'
    sys.exit(1)


keywords = []


def getMovieData(data):
    keywords = data.split('&amp;')
    character = ''
    imdbFunc = imdb.IMDb()
    in_encoding = sys.stdin.encoding or sys.getdefaultencoding()
    out_encoding = sys.stdout.encoding or sys.getdefaultencoding()
    dataArray = []
    item = {}
    for i in range(0, len(keywords)):
        if 'character=' in keywords[i]:
            character = keywords[i].split('character=')[1]
            results = imdbFunc.search_movie(character)
            for imdbData in results:
                item['title'] = imdbData.summary()
                item['movieID'] = imdbData.movieID
                dataArray.append(item.copy())

        if 'title=' in keywords[i]:
            title = keywords[i].split('title=')[1]
            results = imdbFunc.search_movie(title)
            for imdbData in results:
                item['title'] = imdbData.summary()
                item['movieID'] = imdbData.movieID
                dataArray.append(item.copy())
                #print(item['title'])
    movieData = json.dumps(dataArray)
    return(movieData)


if __name__ == '__main__':
    # get the keywords separated by &amp;
    for line in sys.stdin:
        data = line
    test = getMovieData(data)
    print(test)
