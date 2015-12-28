Title: Making a Ajax file structure browser with ReactJs Flux Pattern
Author: Ruogu Qin
Date: 12/16/2015
Tag: Technology
     Javascript
     ReactJS
     Flux

Consider the following scenario, we are creating a set of dropdowns each displays a series folders in a file system. User will be free to click and choose any folders shown in the dropdowns. Once user has made their selections, the subsequent folders will change, reflecting the available folders in the folder chosen by that user. 

An apparent solution to above is by using an cascading event structure. The figure below demonstrate this simple structure:

![Demo](/home/ruogu/projects/RogerBlog/post/post28/figure1.jpg)

A change event from the upstream control will trigger a the change of a downstream control, which will in turn trigger the change of its downstream control. This process will continue until there is no more downstream controls. There are several problem with this approach: 1) you have to create and remember a lot of customize events, 2) you have to create, name a lot of controls on your html and carefully write event handlers for them and 3) it is not cool!

To overcome some of the above problems, I am demoing a new way to do it using ReactJS with flux pattern. The general follow is not significantly different from the flow shown in the above figure, but I used a flux store to retrieve and store states of all the controls, using a dispatcher to handle user actions and using ES6 inheritance to mitigate the cascading of event. This article better serves as a tutorial to get you exposed to the charm of js.

To start, make sure you have nodejs installed, then create and cd into a folder then type:

~~~
npm init
~~~

Follow the instruction, fill in some information (don't worry about what you type in, you can always change in the future). This will create a 