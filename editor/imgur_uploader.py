from logger import FileGenLogger
from imgurpython import ImgurClient
import os.path, time

logger = FileGenLogger().getLogger()
logger.info("Start generating file")

AUTH_TEMP_FILE = "auth.temp"
PIN_EXP_THRES = 3600
client_id = "b68d8e4eed40e56"
client_secret = "16ff5353d62f52de67a1296267a2b23def1faf0d"
client = ImgurClient(client_id, client_secret)

#api.imgur.com/oauth2/authorize?client_id=b68d8e4eed40e56&response_type=pin&state=Add
def init():
    if checkAuthenticationStatus():
        authorization_url = client.get_auth_url('pin')
        print("Go to the following link to obtain a pin: {0}".format(authorization_url))
        pin = input("Enter pin code: ")
        credentials = client.authorize(pin, 'pin')
        client.set_user_auth(credentials['access_token'], credentials['refresh_token'])
        logger.info("Authentication successful! Here are the details:")
        logger.info("   Access token:  {0}".format(credentials['access_token']))
        logger.info("   Refresh token: {0}".format(credentials['refresh_token']))
        logger.info("   Generating pin expiration indicator...")
        open(AUTH_TEMP_FILE, 'w').close() # do not consider racing

def checkAuthenticationStatus():
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
    
    
    
        

def getExistingPictures():
    albums = client.get_account_album_ids("evertqin")
    for album in albums:
        print(client.get_album(album).title)
        images = client.get_album_images(album)
        print(images)

def uploadImage(path):
    if not os.path.isfile(path):
        raise "The given path {0} does not exist".format(path)
            
    


if __name__ == '__main__':
    logger.info("in main function")
    init()
    getExistingPictures()


    
    
