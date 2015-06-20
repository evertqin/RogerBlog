#!/cygdrive/c/Python34/python

import logging 


class Logger:
    FORMAT = '%(asctime)-15s %(name)s %(levelname)s: %(message)s'
    _logger = None
    
    def __init__(self):
        logging.basicConfig(format = self.FORMAT)
        self._logger = logging.getLogger(self.__class__.__name__)
        self._logger.setLevel(20)


    def setName(self):
        return "Logger"
    def getLogger(self):
        return self._logger;

class MongoLogger(Logger):
    pass


class FileGenLogger(Logger):
    pass


