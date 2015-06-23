#!/usr/bin/local/python3.4
from logger import FileGenLogger
import os
import argparse
import markdown
import pprint
import re
from datetime import datetime

logger = FileGenLogger().getLogger()
logger.info("Start generating file")

BASE_FOLDER = "/home/ruogu/projects/RogerBlog/post/"
EXTRA_DATA_FOLDER = "../post/"
GLOBAL_FILENAME = 'gId';
GLOBAL_TEMPLATE = """
// json
{
    "ID": "%(id)s"
    , "title": "%(title)s"
    , "author": "%(author)s"
    , "date" : "%(date)s"
    , "timestamp": "%(timestamp)s"
    , "content": "%(content)s"
    , "read": []
    , "comments" : []
}
"""

# def getGID():
#     if not os.path.isfile(GLOBAL_FILENAME):
#         with open(GLOBAL_FILENAME, 'w') as f:
#             f.write('0')
            
#     with open(GLOBAL_FILENAME, 'r') as f:
#         value = f.readline()
#         print(value)
#         if value=="":
#             return 0
        
#         return f.readline()
    
# def updateGID():
#     gid = getGID()
#     with open(GLOBAL_FILENAME, 'w') as f:
#         gid = gid + 1
#         f.write(str(gid))


def validate_input_folder(postFolder, checker):
    logger.info("Validating input folder")
    for file in os.listdir(postFolder):
 #       if file.endswith(".json"):
 #           if len(checker[0]) == 0:
 #               checker[0] = file
 #           else:
 #               logger.warn("Found another json file???")
        if file.endswith(".md"):
            if len(checker[0]) == 0:
                checker[0] = file
            else:
                logger.warn("Found another markdown file???")

    if all(len(item) > 0 for item in checker):
        logger.info("We got all the files we need")
        return True
    else:
        logger.info("Please check you files, you need to have both json and md files")
        return False

    
def validate_meta_data(meta):
    logger.info("Validating metadata generated from markdown")
    if "title" not in meta:
        raise Exception("Cannot find key: Title in the document meta")

    if "author" not in meta:
        logger.info("Did not specify the authod, defaulting to myself")
        meta['author'] = ["Ruogu Qin"]

    if "date" not in meta:
        logger.warn("Did you specify the date, using the current date")
        meta["date"] = [datetime.now().date()]
        
        

def read_input_file(filename):
    with open(filename, 'r') as f:
        for line in f.readlines():
            yield line



def generate_doc(filenames, id, folder_name):
    # Read the markdown file
    markdownContent = read_input_file(filenames[0])
    markdownContent = ''.join([line for line in markdownContent])
    md = markdown.Markdown(extensions = ['markdown.extensions.meta'])
    html = md.convert(markdownContent)
    validate_meta_data(md.Meta)

    ## Read Template
#    if filenames[0] != "":
#        template = read_input_file(filenames[0])
#    else:
#        template = GLOBAL_TEMPLATE
#    result = ''.join([line for line in template])
    #print(result)
    print(md.Meta)
    dict = {
        "id": id
        , "title": md.Meta["title"][0]
        , "author": md.Meta["author"][0]
        , "date" : md.Meta["date"][0]
        , "timestamp" : datetime.now()
        , "folder_name": folder_name
        , "content" : html
        , "tag": [tag for tag in md.Meta["tag"]]
        , "read": []
        , "comments" : []
    }

    return dict

def getID(postName):
    regex = re.compile(r"(?<=post)\d.*")
    m = regex.search(postName)
    if m is not None:
        return int(m.group(0))
    else:
        raise Exception("Cannot parse id from post name, are you should your post name is correct?")
    

def process(postName, id=None):
    if id is None:
        id = getID(postName)
    fileFolder = os.path.join(EXTRA_DATA_FOLDER, postName)
    postName = os.path.join(BASE_FOLDER, postName)
    checker = [""]
    if not validate_input_folder(postName, checker):
        logger.warn("Exiting")
        exit

    filenames = [os.path.join(postName, file) for file in checker]
    
    return generate_doc(filenames, id, fileFolder)
    


    
########################################################
########################################################
########################################################
if __name__ == "__main__":


    parser = argparse.ArgumentParser(description="Process blog entry, you need to have all of the following files: post.json, post.md in the given folder")
    parser.add_argument('--post', '-p', required=True, type=str, help='The name of the post, must present in the root folder')
    parser.add_argument('--id', type=str, help='The id of the post, if not specified, a global id will be assigned.')
    args = parser.parse_args()
    pprint.PrettyPrinter(indent=4).pprint(process(args.post, args.id))


