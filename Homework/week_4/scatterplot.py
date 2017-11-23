# Week 4 
# Name: Paulien Tensen
# Student number: 10811559
# Course: Data processing
#
# This program gives a JSONfile as output, and reads in a csv file.

import json
import csv 

# Open KNMI csv.
csvfile = open("dataset.csv", 'r')

# Set fieldnames. 
fieldnames =("Region", "MortalityRate", "Deaths")

# Open json file.
jsonfile = open('file.json', 'w')

# Make empty list.
data = [];

# Read csv as dictionary. 
reader = csv.DictReader(csvfile, fieldnames)
for row in reader:
	
	# Append rows to list.
	data.append(row)

# Dump json data in jsonfile.
json.dump(data, jsonfile, indent=4)	