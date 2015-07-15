from logger import Logger
from imgurpython import ImgurClient
from image_resizer import imageProcess
import os.path
import time
import image_resizer
import json

logger = Logger().getLogger()
logger.info("Start generating file")


# api.imgur.com/oauth2/authorize?client_id=b68d8e4eed40e56&response_type=pin&state=Add

class ImageUploader:
    # list of full path of image files in a single post
    imageList = None
    imageUrlList = []
    client_id = "b68d8e4eed40e56"
    client_secret = "16ff5353d62f52de67a1296267a2b23def1faf0d"
    client = ImgurClient(client_id, client_secret)
    GLOBAL_HASH = "urlhash"
    urlHash = None
    
    def __init__(self, imageList):
        '''
        First Check if we need to connect to imgur before prompting
        to enter pin. It is really tedious!
        '''
        if not os.path.isfile(self.GLOBAL_HASH):
            raise Exception("Cannot find the local path to url hash file {0}"
                            .format(self.GLOBAL_HASH))
        self.urlHash = json.load(open(self.GLOBAL_HASH))
        self.imageList = imageList
        isNeedImgurConnection = False
        for image in imageList:
            if image not in self.urlHash:
                isNeedImgurConnection = True
                break

        if isNeedImgurConnection:
            pin = None
            
            authorization_url = self.client.get_auth_url('pin')
            print("Go to the following link to obtain a pin: {0}"
                  .format(authorization_url))
            pin = input("Enter pin code: ")
            credentials = self.client.authorize(pin, 'pin')
            self.client.set_user_auth(credentials['access_token']
                                      , credentials['refresh_token'])
            logger.info("Authentication successful! Here are the details:")
            logger.info("   Access token:  {0}".format(credentials['access_token']))
            logger.info("   Refresh token: {0}".format(credentials['refresh_token']))

    def getExistingPictures(self):
        albums = self.client.get_account_album_ids("evertqin")
        for album in albums:
            print(self.client.get_album(album))
            print(self.client.get_album_images(album))

    def getAlbumId(self, albumName):
        albums = self.client.get_account_album_ids("evertqin")
        for album in albums:
            albumInfo = self.client.get_album(album)
            if albumInfo.title == albumName:
                return album
        raise Exception("Cannot find given album: {0}".format(albumName))

    
    def uploadImage(self):
        '''
        Here I am going to upload to my album
        '''
        config = {
            'album': self.getAlbumId("blog images"),
            'type': "file",
        }
        for path in self.imageList:
            if not os.path.isfile(path):
                raise Exception("The given path {0} does not exist".format(path))
            logger.info("Processing {0}".format(path))
            if path in self.urlHash:
                logger.info("Found image {0} was already uploaded as {1}".format(path, self.urlHash[path]))
                self.imageUrlList.append(self.urlHash[path])
            else:
                logger.info("shinking image before uploading")
                newpath = imageProcess(path) # update the path to use smaller image for faster uploading

                logger.info("Uploading image...")
                result = self.client.upload_from_path(newpath, config=config, anon=False)
                self.urlHash[path] = result["link"]
                self.imageUrlList.append(result["link"])
        json.dump(self.urlHash, open(self.GLOBAL_HASH, 'w'))
        logger.info("Done, processed files, {0}".format(','.join(self.imageUrlList)))

if __name__ == '__main__':
    logger.info("in main function")
    uploader = ImageUploader(["/home/ruogu/projects/RogerBlog/editor/smallImage/sample.JPG"])
    uploader.getExistingPictures()
    uploader.uploadImage()


    
    
