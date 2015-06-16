#!/usr/bin/local/python3.4
from post_formatter import *
from dbloader import MongoConnector
from logger import FileGenLogger
import os
import argparse
from datetime import datetime

logger = FileGenLogger().getLogger()
logger.info("Start generating file")

mongoDB = MongoConnector("nodetest1")
posts = mongoDB.getCollection("posts")

def insert_into_db(data):
    
    if  posts.find({"title": data["title"]}).count() == 0 and posts.find({"id": data["id"]}).count() == 0:
        posts.insert_one(data)
        logger.info("Just inserted data\n" + str(data))
        updateGID()
    else:
        posts.update({"id": data["id"]}, data)
        logger.info("Just updated data\n" + str(data))


def update_db_content(id, data):
    if posts.find({"id": data["id"]}).count() != 0:
        posts.update({"id": data["id"]}, data)
    else:
        logger.warn("Cannot file post id: " + str(id) + ". Do you mean to insert?")

def show_db_content():
    for post in posts.find():
        # posts.remove(post);
        print("Showing post " + str(post["id"]) + "\n")
        print(post)

def remove_db_entry(id):
    logger.info("deleting " + str(id))
    posts.remove({"id" : id})

def remove_all_db_entries():
    logger.warn("Are you show you want to do this")
    confirm = input("Enter y/N: ")
    if confirm is not None and confirm == "y":
        posts.remove({})
    else:
        logger.info("Cancel...")
        



if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Process blog entry, you need to have all of the following files: post.json, post.md in the given folder")
    parser.add_argument('--post', '-p', type=str, help='The name of the post, must present in the root folder')
    parser.add_argument('--update','-u', help="Flag to indicate that this will update the correspoing entry, need to enter the id as argument. You must specify post to use this option")
    parser.add_argument('--show', '-s', action='store_true', help="Show all the entries currently in the db")
    parser.add_argument('--delete', '-d', type=int, help="Delete one entry")
    parser.add_argument('--deleteALL', action='store_true', help="Delete ALL entries(USE CAUTION!)")
    
    args = parser.parse_args()
    if args.show:
        show_db_content()
        
        
    if args.post is not None:
        data = process(args.post)
        if args.update is not None:
            update_db_content(args.update, data)
        else:
            insert_into_db(data)

    if args.delete is not None:
        remove_db_entry(args.delete)

    if args.deleteALL is True:
        remove_all_db_entries()
    
