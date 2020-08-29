echo ">>> clean termx <<<";
rm termx.css;
rm termx.html;
rm termx.js;
rm termxc.js;
echo ">>> compress termx <<<";
terser -c -m -- ./src/termx.js > termx.js;
terser -c -m -- ./src/termxc.js > termxc.js;
# cleancss -o termx.css ./src/termx.css;
uglifycss ./src/termx.css > termx.css;
html-minifier-terser --collapse-whitespace --remove-comments --remove-optional-tags --remove-redundant-attributes --remove-script-type-attributes --remove-tag-whitespace --use-short-doctype --minify-css true --minify-js true --input-dir ./src/markup/ --output-dir ./ -o termx.html;
echo ">>> starting local termx <<<";
npm run dev