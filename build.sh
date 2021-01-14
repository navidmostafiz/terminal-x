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
terser -c -m -- ./app/termx.js > ./dist/termx.js;
checkFile "./dist/termx.js";

echo "*** compress termxc.js";
terser -c -m -- ./app/termxc.js > ./dist/termxc.js;
checkFile "./dist/termxc.js";

echo "*** compress termx.css";
#### cleancss -o termx.css ./app/termx.css;
uglifycss ./app/termx.css > ./dist/termx.css;
checkFile "./dist/termx.css";

echo "*** compress termx.html";
cp ./app/termx.html ./app/markup/termx.html;
html-minifier-terser --collapse-whitespace --remove-comments --remove-optional-tags --remove-redundant-attributes --remove-script-type-attributes --remove-tag-whitespace --use-short-doctype --minify-css true --minify-js true --input-dir ./app/markup/ --output-dir ./dist -o termx.html;
checkFile "./dist/termx.html";

echo "*** copying mp3 files";
cp ./app/*.mp3 ./dist/
checkFile "./dist/ping.mp3";

echo "*** copying favicon";
cp ./app/favicon.ico ./dist/
checkFile "./dist/favicon.ico";