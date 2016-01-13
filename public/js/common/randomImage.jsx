 /*jslint node:true, esnext: true, browser: true */
 'use strict';

 var React = require('react');
 var $ = require('jquery');
 var constants = require('../constants/constants');

 class RandomImage extends React.Component {
 	constructor(props) {
 		super(props);
 		this._updateProgressBar = this._updateProgressBar.bind(this);
 	}

 	_updateProgressBar() {
 		var url = this.getImage(constants.staticImageUrls);
 		var $progressbar, $bar, $elem, tick, percentTime;
 		var time = 7;
 		var that = this;

 		function buildProgressbar() {
 			$progressbar = $("<div>", {
 				id: "progressbar"
 			});
 			$bar = $("<div>", {
 				id: "bar"
 			});
 			$progressbar.append($bar).prependTo($elem);
 		}

 		function start() {
 			percentTime = 0;
 			tick = window.setInterval(interval, 10);
 		}

 		function interval() {
 			percentTime += 1 / time;
 			$bar.css({
 				width: percentTime + '%'
 			});

 			if (percentTime >= 100) {
 				percentTime = 0;

 				url = that.getImage(constants.staticImageUrls);
 				element.css({
 					'background-image': 'url(' + url + ')',
 				});
 			}

 		}
 	}

 	getImage(imageUrls) {
 		var selectedImageIdx = Math.floor(Math.random() * imageUrls.length);
 		return imageUrls[selectedImageIdx];
 	}

 	componentDidMount() {
 		console.log("Calling Random Image");

 	}

 	render (){
 		return (
 			<div> Test</div>
 			);
 	}
 }

 module.exports = RandomImage;