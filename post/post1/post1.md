Title: SVG Manipulation for interactive label display
Author: Ruogu Qin
Date: 05/15/2015
Tag: Technology
     Programming


These days, I have been working on manipulating svg files throw d3.js and jQuery. The goal I have been trying to achieve is: given a svg file with point clouds, I need to be able to show label when mouse move close to any point. There are some limitations and require:

1. The SVG files are generated by a close source library so I cannot change the output freely. This library output points followed by 8 layers of text labels, etc.
2. I cannot add id or class to existing svg nodes from the library same reason as 1. So it is not easy to add an id or class to all the labels and points we are interested in.
3. There are many points and they are very small, so simple mouseover events will not be useful, I have to find a way so when user moves the mouse, they get the closest label to the point.

It is not difficult to come up with the solution. I notice the closed source library can only generate different fonts for the labels, so I picked on unique font. I used d3.js to read and inject the svg dynamically into the html and used CSS to hide all the "unique fonts". Then jQuery is used to handle to mouseover events. The trick is you want to use mousemove instead of mouseover. When each event fires, you find the minimal distance between the mouse location and all the points. This process runs in linear time. You can see the embedded svg file and get a sense of the solution.

Attached source code:
<script src="https://gist.github.com/evertqin/e65786facf796ed6366e.js"></script>







