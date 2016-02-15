  /*jslint esnext:true */

  var $ = require('jquery');
  $(function() {
    "use strict";

    var React = require('react');
    var ReactDOM = require('react-dom');

    const NUMS = 4;
    var ImagesDisplay = React.createClass({
      getInitialState: function() {
        return {
          images: []
        };
      },

      componentDidMount: function() {
        $.ajax({
          url: '/photography/access_token',
          type: 'GET',
          success: function(items) {
            this.setState({
              images: items
            });
          }.bind(this),
          error: function(xhr) {
            console.error(xhr);
          }
        });
      },

      render: function() {
        var images = this.state.images;
        var count = images.length;

        var ItemList = [];
        var row = [];
        for (var i = 0; i < images.length; ++i) {
          var image = images[i];
          if (i % NUMS === 0) {
            if (row.length > 0) {
              ItemList.push((
                <row key={i}>
                 {row}
               </row>
              ));
            }
            row = [];
          }
          row.push((
            <div className='col-sm-4 col-md-4' key={i}>
              <img src={image.src}  alt={image.name} />
              <div className="img-text-overlay-hidden">{image.name}</div>
            </div>
          ));
        }

        return (
          <div>
          {ItemList}
      </div>
        );
      }
    });

    ReactDOM.render(
      <ImagesDisplay/>, document.getElementById('imageDisplay'));
  });