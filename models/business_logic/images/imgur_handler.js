var handler = require('./image_handler');


var sampleAlbumName = 'YDlhJ';


handler.name = "imgur handler";

handler.getImageUrls = function() {
  return this.sampleImages;
};

module.exports = handler;
