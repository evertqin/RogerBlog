from logger import Logger
from imgurpython import ImgurClient
import os.path, time
import image_resizer
import urllib.request

logger = Logger().getLogger()
logger.info("Start generating file")

AUTH_TEMP_FILE = "auth.temp"
PIN_EXP_THRES = 3600
client_id = "b68d8e4eed40e56"
client_secret = "16ff5353d62f52de67a1296267a2b23def1faf0d"
client = ImgurClient(client_id, client_secret)

#api.imgur.com/oauth2/authorize?client_id=b68d8e4eed40e56&response_type=pin&state=Add

class ImageUploader:
    imageList = None #list of full path of image files in a single post
    imageUrlList = []

    def __init__(self, imageList):
        pin = None

        authorization_url = client.get_auth_url('pin')
        print("Go to the following link to obtain a pin: {0}".format(authorization_url))
        pin = input("Enter pin code: ")
        credentials = client.authorize(pin, 'pin')
        client.set_user_auth(credentials['access_token'], credentials['refresh_token'])
        logger.info("Authentication successful! Here are the details:")
        logger.info("   Access token:  {0}".format(credentials['access_token']))
        logger.info("   Refresh token: {0}".format(credentials['refresh_token']))
        logger.info("   Generating pin expiration indicator...")
       # with open(AUTH_TEMP_FILE, 'w') as f: # do not consider racing
       #     f.write(pin)

                
        self.imageList = imageList

    def checkAuthenticationStatus(self):
        isGettingNewPin = False
        if os.path.isfile(AUTH_TEMP_FILE):
            creationTime = os.path.getctime(AUTH_TEMP_FILE)
            currentTime = int(time.time())
            delta = currentTime - creationTime
            if delta >= PIN_EXP_THRES:
                return True
        else:
           return True
       
        return False

    def getExistingPictures(self):
        albums = client.get_account_album_ids("evertqin")
        for album in albums:
            print(client.get_album(album))
            print(client.get_album_images(album))

    def getAlbumId(self, albumName):
        albums = client.get_account_album_ids("evertqin")
        for album in albums:
            albumInfo = client.get_album(album)
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
            logger.info("Uploading image...")
            result = client.upload_from_path(path, config=config, anon=False)

            self.imageUrlList.append(result)
            logger.info("Done")
        print(self.imageUrlList)
           


if __name__ == '__main__':
    logger.info("in main function")
    uploader = ImageUploader(["/home/ruogu/projects/RogerBlog/editor/smallImage/sample.JPG"])

   # uploader.getExistingPictures()
    #uploader.uploadImage()


    
    
