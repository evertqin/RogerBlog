import os
from pymongo import MongoClient

DB_CONNECTION_STRING = 'mongodb://evertqin:QG3VGLyZlRWm@ds047632.mongolab.com:47632/blog'

client = MongoClient(DB_CONNECTION_STRING)
db = client['blog']

db.visitor_stats.remove({"ip" :{"$regex":"127.*"}})
#for ip in db.visitor_stats.find({"ip" :{"$regex":"10.+"}}):

