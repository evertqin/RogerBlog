define([
  'jquery', 'react', 'reactDom', 'constants'
], function($, React, ReactDOM, constants) {
  var TagList = React.createClass({
    getInitialState: function() {
        return {tagList: {}};
    },

    componentDidMount: function() {
        $.ajax({
          url:'/blog/tag_list',
          data: {
            format: 'json'
          },
          success: function(data){
            this.setState({tagList: data.tag_list});
          }.bind(this),
          error: function(){
            console.error("Something is wrong");
          }
        });
    },

    render: function() {
      var tags = (function(tagList){
          var ret = [];

          for(var key in tagList){
            ret.push(
              <li><a href= {'/blog/page/' + key.toLowerCase() + '/1'}>{key}</a></li>
              );
          }
          return ret;
      })(this.state.tagList);

console.log(tags);
      return (
          <ul>
            <li>
              <a href='/blog/page/1'>All</a>
            </li>
            {tags}

          </ul>
      );
    }
  });

  ReactDOM.render(<TagList />, document.getElementById('category-list'));
});
