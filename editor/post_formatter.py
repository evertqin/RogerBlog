#!/usr/bin/local/python3.4
from logger import FileGenLogger
import os
import argparse
import markdown
import pprint
import re
from datetime import datetime
import platform

logger = FileGenLogger().getLogger()
logger.info("Start generating file")

PLATFORM = platform.system()
BASE_FOLDER = ""
if PLATFORM == 'Darwin':
    BASE_FOLDER =  "/Users/ruoguqin/projects/RogerBlog/post/"
elif PLATFORM == 'Linux':
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
def dataFormatter(postName, id: 'You can either specify id if None, system will assign a new id for you' = 5):
    def getDocsFromInputFolder(postFolder):
        logger.info("Validating input folder")
        mdFileList = []
        for file in os.listdir(postFolder):
            if file.endswith(".md"):
                mdFileList.append(file)

        if len(mdFileList) == 1:
            logger.info("We got all the files we need")
            return mdFileList[0]
        else:
            raise Exception("Please check you files, only one md file is allowed under a post folder")

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


    def convertImageToImgur(filename):
        pass
        
                
    def generate_doc(filename, id, folder_name):
        # Read the markdown file
        markdownContent = ''.join([line for line in read_input_file(filename)])
        md = markdown.Markdown(extensions = ['markdown.extensions.meta','markdown.extensions.extra'])
        html = md.convert(markdownContent)
        validate_meta_data(md.Meta)

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

    def process():
        nonlocal id
        if id is None:
            id = getID(postName)
        fileFolder = os.path.join(EXTRA_DATA_FOLDER, postName)
        postFolder = os.path.join(BASE_FOLDER, postName)
        mdFile = getDocsFromInputFolder(postFolder)

        filename = os.path.join(postFolder, mdFile)

        return generate_doc(filename, id, fileFolder)


    return process()

########################################################
########################################################
########################################################
if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Process blog entry, you need to have all of the following files: post.json, post.md in the given folder")
    parser.add_argument('--post', '-p', required=True, type=str, help='The name of the post, must present in the root folder')
    parser.add_argument('--id', type=str, help='The id of the post, if not specified, a global id will be assigned.')
    args = parser.parse_args()
    pprint.PrettyPrinter(indent=4).pprint(dataFormatter(args.post, args.id))


