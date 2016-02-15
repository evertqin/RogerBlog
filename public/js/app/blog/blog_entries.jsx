  var $ = require('jquery');
  $(function() {
    "use strict";

    var React = require('react');
    var ReactDOM = require('react-dom');

    var ItemWrapper = React.createClass({
      render: function() {
        return (<li><div className='link-container'><a href={'/blog/post/item/' + this.props.data.id}>{this.props.data.title}</a></div></li>);
      }
    });

    var ListItemWrapper = React.createClass({
      render: function() {
        return (<li><input type="checkbox" id={"cb" + this.props.keyval}/><label htmlFor={"cb" + this.props.keyval}>{this.props.keyval}</label>
          <ul className='secondLevel'>
            {this.props.data.map(function(value, index){
              return <ItemWrapper key={value.title} data={value} />
            }.bind(this))}
          </ul>
        </li>);
      }
    });

    var BlogEntriesList = React.createClass({
      getInitialState: function() {
        return {
          data: {}
        };
      },
      componentDidMount: function() {
        $.ajax({
          url: this.props.url,
          dateType: 'json',
          cache: true,
          success: function(data) {
            this.setState({
              data: data
            });
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
      },

      render: function() {
        return (
          <ul className='firstLevel'>
            {Object.keys(this.state.data).map(function(key, index){
              return <ListItemWrapper key={key} keyval = {key} data={this.state.data[key]} />}.bind(this))}
            </ul>
        );
      }
    });

    var url = '/blog/all_entries/organized/time';
    ReactDOM.render(
      <BlogEntriesList url={url}/>,
      document.getElementById('entries-list')
    );
  });