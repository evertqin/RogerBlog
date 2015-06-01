#!/cygdrive/c/Python34/python

# the purpose of this script is to help loading blog entries into the mongodb
# will support following actions
# 1) insert blog entries
# 2) retrive certain entries
# 3) update certain entry
# 4) delete certain entry
# blog entry structure
"""
{
_id:  ObjectId("5568865df9296085b5dcbf8d"),
author: "Roger",
comments: {
  author: "Someone",
  timestamp:"343535",
  content: "string",
  upvote: 3,
  downvote: 4,
},

content:"string"
photo:"User path to the file system",


}
"""

from pymongo import MongoClient
import logging 

class MongoLogger:
    FORMAT = '%(asctime)-15s %(levelname)s: %(message)s'
    _logger = None
    
    def __init__(self):
        logging.basicConfig(format = self.FORMAT)

        self._logger = logging.getLogger('MongoLogger')
        self._logger.setLevel(20)

    def getLogger(self):
        return self._logger;

class MongoConnector:
    _client = None
    _db = None
    
    def __init__(self, dbname):
        try:
            logger.info("Connecting to mongo client")
            self._client = MongoClient('mongodb://localhost:27017/')
            logger.info("Successfully conntect to mongodb")
        except e:
            print(e)
        logger.info("Connecting to db")
        self._db = self._client[dbname]
        logger.info("Successfully connected to " + dbname)
    def listAllDBCollection(self):
        print(self._db.collection_names(include_system_collections=False))

        
logger = MongoLogger().getLogger()
logger.info("Program started")

mongodb = MongoConnector("nodetest1")
mongodb.listAllDBCollection()



