Title: React.js Study Note (2) - Making a simple dynamic router
Author: Ruogu Qin
Date: 10/01/2015
Tag: Technology
     ReactJS
     Javascript

I am exploring ReactJS a bit further. I think the key part to understand is how data flows between compoents. The rule is "Data (props) flows from parents to children while events bubble up from children to parents. State or props change will cause compoents to refresh.". With this in mind it is easy to create a dynamic UI. Today, I am going to create a simple UI that gets all the svgs from a static folder, and give user a list of svg files so they can choose to display selected svg. This is like a very simple file server.

![Screen Shot](/home/ruogu/Pictures/Screenshot-react.png)

1. Create the backend Service

    First, we need to create a server. You can choose the technology you are mostly comfortable with. Here I am using nodeJS to server files and static contents.

    ~~~~{.javascript}
  var http = require('http');
  var url = require('url');
  var fs = require('fs');

  var server = http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type':'text/plain', 'Access-Control-Allow-Origin':'http://localhost:8000'});
    var basePath = 'svgs/';
    var query = url.parse(req.url, true).query;
    var name = query.name;

    if(name === 'all'){
      fs.readdir(basePath, function(err, files){
        console.log(files);
        res.end(JSON.stringify(files));
      });
    } else {
      var path = basePath + name;

      fs.readFile(path, 'utf8',function(err, content){
          res.end(content);
      });
    }
  });

  server.listen(1337);
  console.log('Server is running');
    ~~~~

    Several things to notice here, 1) I set 'Access-Control-Allow-Origin' to 'http://localhost:8000' because later, I need to serve react jsx file with anther static file http server. By the [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS) rule of http protocol, our server needs to return this in the http response header to make itself accessible from another http server. This is not sercure but it makes the demonstration easier. 2) I used query string, using a restful url path is actually more preferable.

    Now run the server as `node main.js`.

2. Create React jsx file

    First, I am creating different components. LeftListBox is used to display a list of files in the folder, RightSvgBox shows the svg content when an item from left is chosen. Jquery ajax is used to retrieve data from backend server.

    ~~~~{.javascript}
  (function ($) {
    var NamesList = React.createClass({
        handleClick: function (name, index) {
            this.setState({selectedIndex:index});
            this.props.onUpdate(index);
        },
        render: function () {
            var namesList = this.props.names.map(function (name, index) {
                return (
                    <li>
                        <a onClick={this.handleClick.bind(this, name, index)}>{name}</a>
                    </li>
                    );
            }.bind(this));

            return (
                <ul className="namesList">
                 {namesList}
                </ul>
                );
        }
    });

    var LeftListBox = React.createClass({
        render: function () {
            return (
                <div className="leftListBox">
                    <NamesList names={this.props.names} onUpdate={this.props.onUpdate}></NamesList>
                </div>
                );
        }
    });

    var RightSvgBox = React.createClass({
        getInitialState: function(){
            return {image:"<div>The image is empty</div>"};
        },
        componentDidMount: function(){
            this.setState({image:"<div>The image is empty</div>"})
        },
        componentWillReceiveProps: function () {
            var selectedName;
            if(this.props.names.length == 0){
                selectedName = "";
            } else {
                selectedName = this.props.names[this.props.selectedIndex];
            }
            var fullUrl = this.props.baseurl + "?name=" + selectedName;
            $.ajax({
                url: fullUrl,
                cache: true,
                success: function (svg) {

                    if(svg.length === 0){
                        this.setState({image:"<div>Choose one from the left...</div>"})
                    } else {
                        var re = /<svg/;
                        svg = svg.replace(re, '<svg viewBox="0 0 1280 768"');
                        this.setState({image: svg})
                    }
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(fullUrl, status, err.toString());
                }

            });

        },
        render: function () {
            return (
                 <div className="rightSvgBox" dangerouslySetInnerHTML={{__html: this.state.image}}>
                 </div>
                );
        },
    });


    var DisplayPage = React.createClass({
        getInitialState: function(){
            return {names:[], selectedIndex:0};
        },
        componentDidMount: function () {
            $.ajax({
                url: this.props.baseurl + '?name=all',
                dataType:'json',
                cache: true,
                success: function (names) {
                    this.setState({ names: names });
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(xhr);
                }.bind(this),
            });
        },
        onUpdate : function(selectedIndex){
            this.setState({selectedIndex:selectedIndex});
        },
        render: function() {
            return (
                <div className="row">
                    <div className="col-md-3">
                        List of Available Files:
                      <LeftListBox names={this.state.names} onUpdate={this.onUpdate}></LeftListBox>
                </div>
                    <div className="col-md-9">
                        <RightSvgBox names={this.state.names} baseurl={this.props.baseurl} selectedIndex={this.state.selectedIndex}></RightSvgBox>
                    </div>
                </div>
                );
        }
    });


    var baseurl = 'http://localhost:1337/check';
    var url = baseurl + '?name=all';
    React.render(
      <DisplayPage baseurl={baseurl}>Sample</DisplayPage>,
      document.getElementById('__reactApp')
    );


  })(jQuery);
    ~~~~
