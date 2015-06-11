###!/cygdrive/c/Python34/python
#!/usr/bin/local/python3.4

from datetime import datetime
from dbloader import MongoConnector

dataList = [
    {"title": "SVG File Manipulation"
     , "timestamp": datetime.now()
     ,  "content": """


<p>These days, I have been working on manipulating svg files throw d3.js and jQuery. The goal I have been trying to achieve is: given a svg file with point clouds, I need to be able to show label when mouse move close to any point.</p>

<object data="http://localhost:8000/Clouds.svg" type="image/svg+xml"></object>
<script src="https://gist.github.com/evertqin/e65786facf796ed6366e.js"></script>
"""
     ,  "photo": "http://localhost:8000/Clouds.svg"
     , "comments" : {
         "author" :"random User"
         , "timestamp": datetime.now()
         , "content": "This is a test comment"
         , "upvote": 3
         , "downvote": 4
     }}
    # {"title": "Test2"
    #  , "timestamp": datetime.now()
    #  ,  "content": "This is a test entry 2, I will put many content herere Before we start, make sure that you have the PyMongo distribution installed. .... {u'date': datetime.datetime(2009, 11, 10, 10, 45), u'text': u'and pretty easy too!"
    #  ,  "photo": "testdirdsdsd"
    #  , "comments" : {
    #      "author" :"random User"
    #      , "timestamp": datetime.now()
    #      , "content": "This is a test comment"
    #      , "upvote": 2
    #      , "downvote": 0
    #  }},




]



mongoDB = MongoConnector("nodetest1")
posts = mongoDB.getCollection("posts")

for data in dataList:

    if  posts.find({"title": data["title"]}).count() == 0:

        posts.insert_one(data)
    else:
        posts.update({"title": data["title"]}, data)
    
       # posts.remove(data);
       # pass
#posts.remove({});

for post in posts.find():
   # posts.remove(post);
    print(post)

