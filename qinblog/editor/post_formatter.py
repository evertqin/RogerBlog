#!/cygdrive/c/Python34/python

from logger import FileGenLogger
import os
import argparse
import markdown

BASE_FOLDER = "/media/ruogu/empty/post/"

def validate_input_folder(postFolder, checker):

    for file in os.listdir(postFolder):
        if file.endswith(".json"):
            if len(checker[0]) == 0:
                checker[0] = file
            else:
                logger.warn("Found another json file???")
        elif file.endswith(".md"):
            if len(checker[1]) == 0:
                checker[1] = file
            else:
                logger.warn("Found another markdown file???")

    if all(len(item) > 0 for item in checker):
        logger.info("We got all the files we need")
        return True
    else:
        logger.info("Please check you files, you need to have both json and md files")
        return False
        
        

def read_input_file(filename):
    with open(filename, 'r') as f:
        for line in f.readlines():
            yield line

def generate_doc(filenames):
    # Read the markdown file
    markdownContent = read_input_file(filenames[1])

    markdownContent = ''.join([line for line in markdownContent])
#    print(markdownContent.strip())    
    html = markdown.markdown(markdownContent);
    print(html)

    ## Read Template
            

if __name__ == "__main__":
    logger = FileGenLogger().getLogger()
    logger.info("Start generating file")

    parser = argparse.ArgumentParser(description="Process blog entry, you need to have all of the following files: post.json, post.md in the given folder")
    parser.add_argument('--post', '-p', required=True, type=str, help='The name of the post, must present in the root folder')

    args = parser.parse_args()
    postName = os.path.join(BASE_FOLDER, args.post)

    checker = ["", ""]
    if not validate_input_folder(postName, checker):
        logger.warn("Exiting")
        exit

    filenames = [os.path.join(postName, file) for file in checker]
    
    generate_doc(filenames)
    


