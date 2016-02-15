#!/usr/local/bin/python3.4

# the purpose of this script is to help loading blog entries into the mongodb
# will support following actions
# 1) insert blog entries
# 2) retrive certain entries
# 3) update certain entry
# 4) delete certain entry
# blog entry structure
from pymongo import MongoClient
from bson.objectid import ObjectId
from logger import MongoLogger

logger = MongoLogger().getLogger()
logger.info("Program started")

DB_CONNECTION_STRING = 'mongodb://evertqin:QG3VGLyZlRWm@ds047632.mongolab.com:47632/blog'

class MongoConnector:
    _client = None
    _db = None
    _posts = None

    def __init__(self, dbname):
        try:
            logger.info("Connecting to mongo client")
            self._client = MongoClient(DB_CONNECTION_STRING)
            logger.info("Successfully conntect to mongodb")
        except e:
            print(e)
        logger.info("Connecting to db")
        self._db = self._client[dbname]
        logger.info("Successfully connected to " + dbname)
        self._posts = self._db.posts

    def listAllDBCollection(self):
        print(self._db.collection_names(include_system_collections=False))

    def listAllDBEntries(self):
        for post in self._posts.find():
            yield

    def getCollection(self, name):
        return self._db[name]




if __name__ == "__main__":
    mongodb = MongoConnector("blog")
    mongodb.listAllDBCollection()
#mongodb.listAllDBEntries()





