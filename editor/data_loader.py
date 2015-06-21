#!/usr/bin/local/python3.4
from post_formatter import *
from dbloader import MongoConnector
from logger import FileGenLogger
import sys
import os
import argparse
import pprint
from datetime import datetime

logger = FileGenLogger().getLogger()
logger.info("Start generating file")

mongoDB = MongoConnector("blog")
posts = mongoDB.getCollection("posts")

def get_largest_post_id():
    result = posts.find().sort("id", -1)
    if result is not None and result.count() > 0:
        return(result[0]["id"])
    else:
        return 0

def insert_into_db(data):
    cursor = posts.find({"id": data["id"]})
    if cursor.count() == 0:
        cursor = posts.find({"title": data["title"], "date" : data["date"]})

    if cursor.count == 0:
        posts.insert_one(data)
        logger.info("Just inserted data\n" + str(data))
    elif cursor.count() > 1:
        raise Exception("Got more than one existing entries, did you submit two blogs with same content in the same day?")
    else:
        logger.warn("The given post was already in the db")
        result = cursor[0]
        confirm = input("Are you sure you want to override the current content? id: " + str(result["id"]) +": y/N")
        data["id"] = result["id"] # reset the id
        if confirm == 'y':
            posts.update({"id": result["id"]}, data)
            logger.info("Just updated data\n" + str(data))
        else:
            logger.info("Canceling...")


def update_db_content(data):
    if posts.find({"id": data["id"]}).count() != 0:
        posts.update({"id": data["id"]}, data)
    else:
        logger.error("Cannot fild post id: " + data["id"] + ". Do you mean to insert?")

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
    parser.add_argument('--id', type=int, help='The id of the post, if not specified, a global id will be assigned.')
    parser.add_argument('--update','-u', action='store_true', help="Flag to indicate that this will update the correspoing entry, need to enter the id as argument. You must specify post to use this option")
    parser.add_argument('--show', '-s', action='store_true', help="Show all the entries currently in the db")
    parser.add_argument('--preview', '-v', action='store_true', help="Flag to indicate that we want to see the parsed json")
    parser.add_argument('--delete', '-d', type=int, help="Delete one entry")
    parser.add_argument('--deleteALL', action='store_true', help="Delete ALL entries(USE CAUTION!)")
    
    args = parser.parse_args()
    if len(sys.argv) == 1:
        print("No argument specified, printing help")
        parser.print_help()
        sys.exit(1)

    if args.show:
        show_db_content()
        
    if args.post is not None:
        if args.update is True:
            data = process(args.post)
        else:
            id = None
            if args.id is None:
                logger.warn("going to use the largest id in the db plus 1")
                id = get_largest_post_id() + 1
            else:
                id = args.id
            data = process(args.post, id)
            
        if args.preview is True:
            pprint.PrettyPrinter(indent=4).pprint(data)
            exit(1)

        if args.update is True:
            update_db_content(data)
        else:
            insert_into_db(data)
            
    if args.delete is not None:
        remove_db_entry(args.delete)

    if args.deleteALL is True:
        remove_all_db_entries()



