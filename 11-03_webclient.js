// web client
// http.request

// const http = require('http');

// const options = {
// 	host: '127.0.0.1',
// 	port: 3000,
// 	method: 'POST',
// 	path: '/abc'
// };

// let req = http.request(options);

// req.once('response', (res)=>{
// 	const ip = req.socket.localAddress;
// 	const port = req.socket.localPort;
// 	console.log(`Your IP Address is ${ip} and your source port is ${port}.`);
// 	let data = [];
// 	res.on('data', (chunk)=>{
// 		data.push(chunk);
// 	});
// 	res.on('end',()=>{
// 		console.log(Buffer.concat(data).toString('utf8'));
// 	});
// });

// req.end();

// request 模块

const request = require('request');

request('http://localhost:3000/test', (err, res, body)=>{
	console.log('error: ', err);
	console.log('response status code: ', res.statusCode);
	console.log('body: ', body);
});














