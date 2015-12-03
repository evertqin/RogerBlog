define([
  'jquery', 'react', 'reactDom', 'constants'
], function($, React, ReactDOM, constants) {
  "use strict";

  var RandomImage = React.createClass({
    getInitialState: function() {
      return {imageUrl: '/images/background.png'};
    },

    componentDidMount: function() {
      function getImage(imageUrls) {
        var selectedImageIdx = Math.floor(Math.random() * imageUrls.length);
        return imageUrls[selectedImageIdx];
      }

      this.setState({imageUrl: getImage(constants.staticImageUrls)});
    },

    render: function() {
      return (
        <img src={this.state.imageUrl}></img>
      );
    }
  });

  var imageHolders = document.getElementsByClassName('post-image');
  if (imageHolders.length > 0) {
    for (var i = 0; i < imageHolders.length; ++i) {
      ReactDOM.render(
        <RandomImage/>, imageHolders[i]
        );
    }
  }
});
