Title: Find the nearest location to see the concert
Author: Ruogu Qin
Date: 01/01/2016
Tag: Technology
     ReactJS
     Javascript

First, please take a look at the demo below, there are some pre-populated data in the textarea, click the `Submit` button to see the result. (Note: I am going to keep making modification to this little app to make it better.)

<iframe allowfullscreen style="width:100%; height: 1000px; border: none" src='http://evertqin.github.io/distance_sort'></iframe>

# Why I am building this

Initially, I wanted to work on this little project because I encountered some inconvenience when I was trying to book a concert ticket. The problem is: the singer does not come to my city, instead, he comes to some nearby states. Being a **lazy** person, I want to find the nearest location to see the concert and I don't want search every locations on google map and compare the driving distance. 

# The Goal
I want to have an application so I can input my home address, and a list of addresses where there are concerts. Then I will get a list of the addresses, ranked by the driving distance to those addresses. I also need the invalid addresses filtered out (or better, marked in Red so I can go ahead and fix)

# The technology used in this project

1. [Google Maps Javascript API](https://developers.google.com/maps/documentation/javascript/) Google maps API comes in handy, you only need to register am API_KEY then provide the api a callback function
2. ReactJs. 
The UI is broken down into three parts: MapDisplay, TextBoxControl and ResultList, they are wrapped within a wrapper component Hub which coordinates all the data (I would use Flux but it seems to be an overkill for such a simple project).
3. Browserify and browserify-shim
I have to use shim because I need to bring the googleMapApi into browserify
4. Gulp
I had been using Grunt, but this time I decided to give gulp a try. Apparently, it is more flexible to use gulp since I found myself assembling all the tasks with pipes and I am writing modular javascript instead of a giant JSON file.

# How it works
## Determine the dataflow
I created 3 components MapDisplay, TextBoxControl and ResultList. While TextBoxControl contains all the data we need to get from user interaction, we also receive some data from ResultList since that's where we get a list of addresses and call the google map api to get routes. The routes then need to be send to the parent and update the MapDisplay. (Note, while I am writing this, I feel it might be better to put all the data logic in the TextBoxControl, then we will have less dependencies, I will update this in the near future.)

## Get data to the Hub
The code bellow update specific field in the state
~~~{.javascript}
_update(key, value) {
    var obj = {};
    obj[key] = value;
    this.setState(obj);
}
~~~
before using this function, make sure to bind its context with `this` in the constructor because ES6 syntax react component does not bind customized function automatically (ES5 format does if you prefer!).
~~~{.javascript}
this._update = this._update.bind(this);
~~~
Then in your render method, you can pass this function as property:
~~~{.javascript}
render() {
    return (
        <div>
            <MapDisplay origin = {this.state.origin} 
                        routes={this.state.routes } />
            <TextBoxControl onSubmit={this._update} />
            <ResultList origin = {this.state.origin} 
                        addresses={this.state.addresses}
                        onGetResponse={this._update.bind(this, "routes")}/>
        </div>
    );
}
~~~
As long as there is value change, child component, such as TextBoxControl can call those functions binded as property.

## Get Routes Info from Google Maps API
The code below contains a class describing how to call the Google Maps API and get a list of driving routes.
~~~{.javascript}
/*jslint node: true, esnext:true */

'use strict';
class Direction {
    constructor(directionsService, origin, dests) {
        this.directionsService = directionsService;
        this.origin = origin;
        this.dests = dests;
    }

    calcDistance(origin, dest, callback) {
        // Set destination, origin and travel mode.
        var request = {
            destination: dest,
            origin: origin,
            travelMode: google.maps.TravelMode.DRIVING
        };

        this.directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                //var point = response.routes[0].legs[0];
                callback(response);
            } else {
                callback(null);
            }
        });
    }

    calcAll(allDoneCallback) {
        var result = [];
        var count = 0;
        var callback = function(point) {
            result.push(point);
            count++;
            if(count === this.dests.length){
                allDoneCallback(result);
            }
        }.bind(this);

        for (let i = 0; i < this.dests.length; ++i) {
            this.calcDistance(this.origin, this.dests[i], callback);
        }

        return result;
    }
}

module.exports = Direction;
~~~

Since google maps API is an async service (Who is not nowadays), we provide a calcAll taking a callback(`allDoneCallback`) as first argument. As long as all the addresses provide are calculated, we invoke the callback.

# Google Map overlays
1. To create multiply routes overlay on a single map, we need to create multiple instances of `google.maps.DirectionsRenderer` and set the same `map` object to them. In this example, I also need to be able to erase all the existing overlays then redraw routes, so I also need to cache created instances, when you need to erase existing routes, you just need to grab cached `google.maps.DirectionsRenderer` instances and set their `map` to null
2. initMap function is expected from the api url (`https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`). Therefore, you MUST bind this function to the window object and bind it before the api url is evaluated.


