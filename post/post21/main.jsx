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