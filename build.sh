echo ">>> BUILD AND COMPRESSION STARTED <<<";
checkFile()
{    
    # echo "checking: $1";
    if test -f "$1"; then
        echo "done!"; else
        echo "failed!";
    fi
};

echo "*** clean termx";
clear;
rm -rf dist;
mkdir dist

echo "*** compress termx.js";
terser -c -m -- ./src/termx.js > ./dist/termx.js;
checkFile "./dist/termx.js";

echo "*** compress termxc.js";
terser -c -m -- ./src/termxc.js > ./dist/termxc.js;
checkFile "./dist/termxc.js";

echo "*** compress termx.css";
#### cleancss -o termx.css ./src/termx.css;
uglifycss ./src/termx.css > ./dist/termx.css;
checkFile "./dist/termx.css";

echo "*** compress termx.html";
html-minifier-terser --collapse-whitespace --remove-comments --remove-optional-tags --remove-redundant-attributes --remove-script-type-attributes --remove-tag-whitespace --use-short-doctype --minify-css true --minify-js true --input-dir ./src/markup/ --output-dir ./dist -o termx.html;
checkFile "./dist/termx.html";