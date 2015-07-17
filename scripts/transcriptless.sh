#!/bin/bash

stylesheet_folder="./public/stylesheets"

for file in `ls ${stylesheet_folder}`;
do
    extension="${file##*.}"
    if [ "$extension" = "less" ]; then
        filename="${file%.*}"
        echo "processing "$filename
        lessc $stylesheet_folder/$file > $stylesheet_folder/${filename}.css
    fi
done

proj
grunt
