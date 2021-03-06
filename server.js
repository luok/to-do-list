var http = require('http');
var items = [];
var server = http.createServer(function(req, res) {
	switch (req.method) {
		case 'POST':
			var item = '';
			req.setEncoding('utf8');
			req.on('data', function(chunk) {
				console.log('parsed', chunk);
				item += chunk;
			});
			req.on('end', function() {
				console.log('done parsing');
				items.push(item);
				res.end('OK\n');
			});
			break;
		case 'GET':
			var body = items.map(function(item, i) {
				return i + ') ' + item;
			}).join('\n');
			res.setHeader('Content-Length', Buffer.byteLength(body));
			res.setHeader('Content-Type', 'text/plain', charset="utf-8");
			res.end(body);
			break;
	}
	
});
server.listen(3000);