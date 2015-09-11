#!/bin/bash

stylesheet_folder="./public/stylesheets"

for file in `ls ${stylesheet_folder}`;
do
    extension="${file##*.}"
    if [ "$extension" = "scss" ]; then
        filename="${file%.*}"
        echo "processing "$filename
        #lessc $stylesheet_folder/$file > $stylesheet_folder/${filename}.css
        sass $stylesheet_folder/$file:$stylesheet_folder/${filename}.css
    fi
done

grunt
