//This is a really complete answer. I'd only add that it's better to avoid using jQuery in conjunction SVG, as it asumes all content is HTML and this will sometimes fail. IE9+ supports DOM 3's addEventListener which solves some of the major headaches of cross-browser development. Vanilla js often gets the job done, but if you want to abstract some of the DOM manipulation I'd recommend D3 d3js.org.

// read in svg file
(function(){
	xhr = new XMLHttpRequest();
	xhr.open("GET","http://localhost:8000/Clouds.svg",false);
	// Following line is just to be on the safe side;
	// not needed if your server delivers SVG with correct MIME type
	xhr.overrideMimeType("image/svg+xml");
	xhr.send("");
	document.getElementById("svgContainer").appendChild(xhr.responseXML.documentElement);
})();


// add tooltips for the circles
(function($){

	function repeatArray(element, repeatTime) {
		var array = new Array(repeatTime);
		for(var i = 0; i < repeatTime; ++i) {
			array.push(element);
		}
		return array;
	}

	function getSourceArray(source) {
		var data = [];
		for(var i = 0; i < source.length; ++i) {
			data.push({cx:source[i].cx.baseVal.value,
				cy:source[i].cy.baseVal.value,
				data: 1});
		}
		return data;
	}


	var svg = d3.select("svg");
	var circles = svg.selectAll("circle");
	circles.each(function(d, i){

		this.setAttribute("id", "circle" + i);
	});
	var text = svg.selectAll('#svgContainer > svg > text[font-family="Consolas"]');

	var dataMap = circles[0].map(function(d) {
		return {"cx": d.cx.baseVal.value,
				"cy":d.cy.baseVal.value,
				"id":d.id};
	});

	var chosenId = "null";
	$(document).ready(function() {

		var last;
		svg.on("mouseout", function() {
			last.css({"visibility":"hidden"});
		}).on("mousemove", function() {
			var x = d3.mouse(this)[0];
			var y = d3.mouse(this)[1];

			var distance = 99999;
			for(var i = 0; i < dataMap.length; ++i) {
				var currentDist = Math.pow(dataMap[i].cx - x,2) + Math.pow(dataMap[i].cy - y,2);
				if(currentDist < distance) {
					distance = currentDist;
					chosenId = dataMap[i].id;
				}

			}
			//console.log(distance);
			//console.log(d3.mouse(this));
			//console.log($("#" + chosenId)[0].cx.baseVal.value);
			if(last !== undefined) {
				last.css({"visibility":"hidden"});
			}
			last = $("#" + chosenId).nextUntil("circle", 'text[font-family="Consolas"]');
			last.css({"visibility":"visible"});
		});





		//.data(['visiable', 'invisiable']).enter()
		//.append('circle')
		//.attr({'cx': function(d, i) {alert(d);return circles[0][i].cx.baseVal.value;},
	//			'cy': function(d, i) {return circles[0][i].cy.baseVal.value;},
	//			'r': "10.00"})
		// .on("mouseover", function(){
		// 	$(this).nextUntil("circle").filter("text").css({"visibility":"visible", "z-index":"999"});
		// }).on("mouseout", function() {
		// 	$( this).nextUntil("circle").filter("text").css({ "visibility":"hidden"});
		// });


	});





})(jQuery);
