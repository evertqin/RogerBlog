#!/cygdrive/c/Python34/python

from logger import FileGenLogger
import os
import argparse


BASE_FOLDER = "/media/ruogu/empty/post/"

def validate_input_folder(postFolder):
    checker = [False, False]
    for file in os.listdir(postFolder):
        if file.endswith(".json"):
            checker[0] = True
        elif file.endswith(".md"):
            checker[1] = True

    if all(item == True for item in checker):
        logger.info("We got all the files we need")
        return True
    else:
        logger.info("Please check you files, you need to have both json and md files")
        return False
        
        

def read_input_file(filename):
    pass

    
            

if __name__ == "__main__":
    logger = FileGenLogger().getLogger()
    logger.info("Start generating file")

    parser = argparse.ArgumentParser(description="Process blog entry, you need to have all of the following files: post.json, post.md in the given folder")
    parser.add_argument('--post', '-p', required=True, type=str, help='The name of the post, must present in the root folder')

    args = parser.parse_args()
    postName = os.path.join(BASE_FOLDER, args.post)
    
    validate_input_folder(postName)


