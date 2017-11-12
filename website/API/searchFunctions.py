#!/usr/bin/env python
"""
Search Functions
This script uses the IMDbPY (https://imdbpy.sourceforge.io/) library to get the data from
IMDB.
"""

import sys
import json
# Import the IMDbPY package.
try:
    import imdb
except ImportError:
    print 'Install the IMDB package - check instructions.txt'
    sys.exit(1)




def getMovieData(data):
    #empty list to filter out the keywords
    keywords = []
    # split the data passed delimited by '&amp;'
    keywords = data.split('&amp;')
    # assign the IMDb function to the variable imdbFunc
    imdbFunc = imdb.IMDb()
    # in_encoding = sys.stdin.encoding or sys.getdefaultencoding()
    # out_encoding = sys.stdout.encoding or sys.getdefaultencoding()
    # a blank array for appending the dictionaries
    dataArray = []
    # a blank dictionary to save the key:value pairs
    item = {}
    # loop through all the keywords
    for i in range(0, len(keywords)):
        # if the keyword has character
        if 'character=' in keywords[i]:
            # split the character name and save it in a variable - character
            character = keywords[i].split('character=')[1]
            # search in the database for the character
            results = imdbFunc.search_movie(character)
            # iterate through each object found
            for imdbData in results:
                # save the values in a dictionary
                # summary contains a short movie title
                item['title'] = imdbData.summary()
                # save the movie ID, can use this to fetch other descriptive results
                item['movieID'] = imdbData.movieID
                # append this data to the list
                dataArray.append(item.copy())

        # if the keyword has title
        if 'title=' in keywords[i]:

            # split the title and save it in a varable - title
            title = keywords[i].split('title=')[1]
            # search in the database for the title
            results = imdbFunc.search_movie(title)
            # iterate through each object found
            for imdbData in results:
                # save the values in a dictionary
                # summary contains a short movie title
                item['title'] = imdbData.summary()
                # save the movie ID, can use this to fetch other descriptive results
                item['movieID'] = imdbData.movieID
                dataArray.append(item.copy())
                # append this data to the list
    # create a json object from the list and return it
    movieData = json.dumps(dataArray)
    return(movieData)


if __name__ == '__main__':
    # get the keywords separated by &amp;
    for line in sys.stdin:
        data = line
    test = getMovieData(data)
    print(test)
