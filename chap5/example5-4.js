//  npm install mime

var http = require('http'),
    url =  require('url'),
    fs   = require('fs'),
    mime = require('mime'),
    path = require('path');

//var base = '/home/examples/public_html';
var base = '.';

http.createServer(function (req, res) {

  // make requests:
  // http://localhost:8124/index.html - success
  // http://localhost:8124/video.html - success
  // http://localhost:8124/test_folder - Resource missing 404
  // http://localhost:8124/not_existing.html - Resource missing 404

   var pathname = path.normalize(base + req.url);
   console.log("pathname: ");
   console.log(pathname);

   fs.stat(pathname, function(err, stats) {
      if (err) {
        res.writeHead(404);
        res.write('Resource missing 404\n');
        res.end();
      } else if (stats.isFile()) {
         // content type
         //var type = mime.lookup(pathname);
         var type = 'text/html';
         console.log("type");
         console.log(type);
         res.setHeader('Content-Type', type);

         // create and pipe readable stream
         var file = fs.createReadStream(pathname);
         file.on("open", function() {
            // 200 status - found, no errors
            res.statusCode = 200;
            file.pipe(res);
         });
         file.on("error", function(err) {
           console.log(err);
           res.statusCode = 403;
           res.write('file permission');
           res.end();
         });
       } else {
        res.writeHead(403);
        res.write('Directory access is forbidden');
        res.end();
       }
    });
}).listen(8124);
console.log('Server web running at http://localhost:8124');
