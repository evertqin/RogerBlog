Title: Modifed Python-Markdown for better fenced code support
Author: Ruogu Qin
Date: 08/05/2015
Tag: Technology
     Python

Today I committed a modifed version of Python-Markdown. Previously, this pip library only supports fenced block at document root level. It is quite inconvenient as often times, we need to nest a code blog inside an ordered list. You can check my [previous post](http://blog.tripplan.info/blog/post/item/14) for a demo.

You can install it via pip:

`pip install https://github.com/evertqin/Python-Markdown/raw/master/markdown.zip`

After installation, you can start embedding code within `<li>` tags, start by indenting `~~~~` at the same level as the list. The indentation level of the embeded code control the indentation of the outputing html.
Here I am aligning the code block at the root level. 

1. This is a sample

    ~~~~{.js}
var test = new Object();
    ~~~~

2. This is another List

    1. Nested List
    
        ~~~{.js}
var test = 'test';
        ~~~
        
        Some other text within the list
        
    2. Nested List
        
        ~~~{.js}
var test = 'test';
        ~~~
        
3. Continue the list

The code can be checked out from [https://github.com/evertqin/Python-Markdown](https://github.com/evertqin/Python-Markdown).
