// web server

const http = require('http');

const server = http.createServer((req, res)=>{
	console.log(`request ${req.method} url: ${req.url}`);
	res.end('hello world');
});

server.listen(3000, ()=>{
	console.log('server is running on 3000...');
})