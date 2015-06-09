#!/cygdrive/c/Python34/python

from logger import FileGenLogger

class BlogFormatter:
    content = ''
    
    def __init__(self):
        pass

    def read_input_file(self, filename):
        with open filename as f:
            self.content = f.readlines()
            

            



logger = FileGenLogger().getLogger()
logger.info("Start generating file")

