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

DB_CONNECTION_STRING = '



