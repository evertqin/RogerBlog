#!/usr/local/bin/python3.4

import os
import cloudinary
import cloudinary.uploader
import cloudinary.api
from PIL import Image

HORIZONTAL_RESULTION = 1280

class CloudinaryLoader:
    def __init__(self, baseURL):
        self.baseURL = baseURL
        cloudinary.config(
            cloud_name='evertqin',
            api_key='134222639559228',
            api_secret='Uh9t8SpeCbTtBwBEVUssZiZQWGc'
        )

    def readImage(self, filename):
        if not os.path.isfile(filename):
            raise Exception("The given path: {0} does not contain a valid file".format(filename))
        return Image.open(filename)

    def upload(self, filename):
        im = self.readImage(filename)
        newResolution = im.size

        if im.size[0] > HORIZONTAL_RESULTION:
            newResolution = [HORIZONTAL_RESULTION,
                             int(HORIZONTAL_RESULTION / im.size[0] * im.size[1])]
        newResolution.sort()
        public_id = os.path.basename(filename).replace(' ', '_').lower()[:-4]
        cloudinary.uploader.upload("""/media/ruogu/2CDE7306DE72C81A/Users/evert/Pictures/2015-09-30 Grand_canyon_Bryce_Zion/Grand_canyon_Bryce_Zion 001.JPG""", public_id=public_id, width=newResolution[0], height=newResolution[1])


uploader = CloudinaryLoader("""/media/ruogu/2CDE7306DE72C81A/Users/evert/Pictures/2015-09-30 Grand_canyon_Bryce_Zion/selected""")
uploader.upload("""/media/ruogu/2CDE7306DE72C81A/Users/evert/Pictures/2015-09-30 Grand_canyon_Bryce_Zion/Grand_canyon_Bryce_Zion 001.JPG""")
