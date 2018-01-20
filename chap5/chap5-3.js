var http = require('http'),
    fs = require('fs'),
    //base = '/home/examples/public_html';
    base = '.';

http.createServer(function (req, res) {
   // make request:
   // http://localhost:8124/index.html
   pathname = base + req.url;
   console.log("pathname: ");
   console.log(pathname);

}).listen(8124);

console.log('Server web running at http://localhost:8124');
