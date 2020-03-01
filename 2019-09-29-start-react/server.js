const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer(function (req, res) {
  let pathname = url.parse(req.url).pathname;
  fs.readFile(pathname.substr(1), function(err, data){
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
    } else {
      const index = pathname.lastIndexOf('.');
      const suffix = pathname.slice(index + 1);
      res.writeHead(200, {'Content-Type': `text/${suffix}`});
      res.write(data.toString());
    }
    res.end();
  });
});

server.listen(8080, function () {
  console.log(`server is running at http://127.0.0.1:8080`);
});