from logger import Logger
from PIL import Image
import os.path


logger = Logger().getLogger()
TEMP_DIR = "smallImage"
HORIZONTAL_RESULTION = 820


def imageProcess(sourceFile):
    orgFilePath = os.path.dirname(sourceFile)
    destFilePath = os.path.join(orgFilePath, TEMP_DIR)
    if not os.path.exists(destFilePath):
        logger.warn("The specified directory {0} is not found, creating..".format(destFilePath))
        os.makedirs(destFilePath)

    def readImage():
        if not os.path.isfile(sourceFile):
            raise Exception("The given path: {0} does not contain a valid file".format(source))
        return Image.open(sourceFile)

    def resizeImage(im):
        newResolution = (HORIZONTAL_RESULTION, int(HORIZONTAL_RESULTION / im.size[0] * im.size[1]))
        logger.info("Resizing image to resultion {0}.".format(newResolution))
        resizedImg = im.resize(newResolution, Image.BILINEAR)
        logger.info("Image Resizing done. New Size {0}".format(resizedImg.size))
        return resizedImg

    def saveImage(im):
        logger.info("Saving Image")
        targetFile = os.path.join(destFilePath, os.path.basename(sourceFile))
        im.save(targetFile)
        logger.info("{0} saved.".format(targetFile))
        return targetFile

    def process():
        im = readImage()
        im = resizeImage(im)
        return saveImage(im)
    return process()


if __name__ == "__main__":
    logger.info("In main")
    samplePath = "/home/ruogu/projects/RogerBlog/editor/sample.JPG"
    imageProcess(samplePath)
