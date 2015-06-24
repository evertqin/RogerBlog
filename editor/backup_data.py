
from dbloader import MongoConnector
from logger import FileGenLogger

logger = FileGenLogger().getLogger()
logger.info("Starting backing up data")

mongoDB = MongoConnector("blog")
posts = mongoDB.getCollection("posts")


if __name__ == '__main__':
    result = posts.find().sort("id", -1)
    
    logger.info("In main")
    logger.info(DB_CONNECTION_STRING)
