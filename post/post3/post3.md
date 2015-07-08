Title: Three.js first trail
Author: Ruogu Qin
Date: 06/26/2015
Tag: technology
     programming
     three.js
     graphic


Recently, I am very intrigued by the webGl. There are several frameworks available on the market. For example:

1. Three.js
The is the framework I choice for my little project. Its concept shares that of most of the scene graph, such as ILNumerics in C# (based on openTK). You can freely manipulate an scene object, then throw them into a scene. The webGl engine will render it for you. There are a lot of cool examples on their website with source code. Such as this one.
[Three.js example](http://threejs.org/examples/#webgl_buffergeometry)

2. Babylon.js
This framework seems focus more on game development. I played it a bit before jumping into Three.js. It is not difficult to find a lot of good articles about it.

3. x3dom
This one takes different approach compare to the previous two. Instead of creating a "cavas" then using javescript to "inject" plot into the canvas. This one is more like static svg -- you write html file then the framework will render it for you, like the example provided by their website.

```html
<html>
    <head>
        <title>My first X3DOM page</title>
        <script type='text/javascript' src='http://www.x3dom.org/download/x3dom.js'> </script>
        <link rel='stylesheet' type='text/css' href='http://www.x3dom.org/download/x3dom.css'></link>
    </head>
    <body>
        <h1>Hello, X3DOM!</h1>
        <p>
            This is my first html page with some 3d objects.
        </p>
    </body>
</html>
```

source: http://doc.x3dom.org/tutorials/basics/hello/index.html
