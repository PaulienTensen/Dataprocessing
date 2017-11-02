#!/usr/bin/env python

# Name: Paulien Tensen
# Student number: 10811559
# Class: Dataprocessing(Scraping).
# 
# This program scraps information from IMDb puts it in a csv file.  

import csv
import os, sys; sys.path.insert(0, os.path.join(os.path.dirname(__file__), \
"..", ".."))

from pattern.web import URL, DOM, plaintext 
from pattern.web import NODE, TEXT, COMMENT, ELEMENT, DOCUMENT

TARGET_URL = "http://www.imdb.com/search/title?num_votes=5000,&sort=user_rating,desc&title_type=tv_series"
BACKUP_HTML = 'tvseries.html'
OUTPUT_CSV = 'tvseries.csv'

# Make global variable films containing an empty list.
films = []

def extract_tvseries(dom):
    
    # Extract data of 50 films from IMDb. 
    for film in dom.by_tag("div.lister-item-content")[:50]: 
        # Make a empty list for every single film.
        single_film = []
		
        # Scrap first <a class="title"> in entry.
        for Title in film.by_tag("h3.lister-item-header")[:1]: 
            for text_title in Title.by_tag("a"):
                
                # If no text in title, print ' ' 
                if plaintext(text_title.content) == '':
                    
                    #Print "missing" is text is empty.  
                    single_film.append("missing")
                else:
			
                # Use plaintext and only keep text using content.
                # Encode ascii and ignore ascii charcters which csv can 
				# not write.
                    text_title = plaintext(text_title.content.encode('ascii',\
				    'ignore').decode('ascii'))
                
                    # Add title of movie to single film list. 
                    single_film.append(text_title)
  
        # Scrap rating of IMDb.   
        for Rating in film.by_tag("div.inline-block ratings-imdb-rating"):
            for text_rate in Rating.by_tag("strong"):
                if plaintext(text_rate.content) == '':
                    single_film.append("missing")
                else: 					
                    single_film.append(plaintext(text_rate.content))
         
        # Scrap genre from IMDb. 		 
        for Genre in film.by_tag("p.text-muted"):  
            for text_genre in Genre.by_tag("span.genre"):
                if plaintext(text_genre.content) == '':
                    single_film.append("missing")
                else:     				    
                    text_genre = plaintext(text_genre.content.encode('ascii', \
				    'ignore').decode('ascii'))
              
                    single_film.append(text_genre)
				
        # Make empty list for actors, scrap actors from IMDb. 
        s= []
        for Actors in film.by_tag("p"):
            for text_stars in Actors.by_tag("a"):
                if plaintext(text_stars.content) == '': 
                    singe_film.append("missing")
                else: 
                    text_stars = plaintext(text_stars.content.encode('ascii', \
				    'ignore').decode('ascii'))
                    s.append(text_stars)	
        
        # Use join(s) to join lists in s together. Append to single film.		
        single_film.append(', '.join(s))
  
        # Scrap runtime from IMDb. 
        for Runtime in film.by_tag("p.text-muted"):
            for text_runtime in Runtime.by_tag("span.runtime"):
                if plaintext(text_runtime.content) == '':
				   single_film.append("missing")
                else:   
                    single_film.append(plaintext(text_runtime.content)) 
        		
        # Add single films to list of all films.
        films.append(single_film)
        
    # Return films.
    return [films]
   
	  
def save_csv(f, tvseries):
    
    # Write name of columns outputting a CSV file. 
    writer = csv.writer(f)
    writer.writerow(['Title', 'Rating', 'Genre', 'Actors', 'Runtime'])
    
    # Write films to csv file.
    writer.writerows(films)

if __name__ == '__main__':
    # Download the HTML file.
    url = URL(TARGET_URL)
    html = url.download(cached=True)
    dom = DOM(html)	
	   
    # Save a copy to disk in the current directory, this serves as an backup
    # of the original HTML, will be used in grading.
    with open(BACKUP_HTML, 'wb') as f:
        f.write(html)

    # Parse the HTML file into a DOM representation.
    dom = DOM(html)

    # Extract the tv series (using the function you implemented).
    tvseries = extract_tvseries(dom)

    # Write the CSV file to disk (including a header).
    with open(OUTPUT_CSV, 'wb') as output_file:
        save_csv(output_file, tvseries)