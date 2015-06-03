#!/cygdrive/c/Python34/python

from datetime import datetime
from dbloader import MongoConnector

dataList = [
    {"title": "Test1"
     , "timestamp": datetime.now()
     ,  "content": "This is a test entry"
     ,  "photo": "testdir"
     , "comments" : {
         "author" :"random User"
         , "timestamp": datetime.now()
         , "content": "This is a test comment"
         , "upvote": 3
         , "downvote": 4
     }},
    {"title": "Test2"
     , "timestamp": datetime.now()
     ,  "content": "This is a test entry 2, I will put many content herere Before we start, make sure that you have the PyMongo distribution installed. .... {u'date': datetime.datetime(2009, 11, 10, 10, 45), u'text': u'and pretty easy too!"
     ,  "photo": "testdirdsdsd"
     , "comments" : {
         "author" :"random User"
         , "timestamp": datetime.now()
         , "content": "This is a test comment"
         , "upvote": 2
         , "downvote": 0
     }},




]



mongoDB = MongoConnector("nodetest1")
posts = mongoDB.getCollection("posts")

for data in dataList:

    if  posts.find({"title": data["title"]}).count() == 0:

        posts.insert_one(data)
        
for post in posts.find():

    print(post)

