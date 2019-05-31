// TCP server

const net = require('net');

const server = net.createServer((socket)=>{
	socket.on('data', (data)=>{
		data = data.slice(0,-2);
		console.log('received: ', data.toString('utf8'));
		//quit
		console.log(data);
		console.log(Buffer.from('quit'));
		if(data.equals(Buffer.from('quit'))){
			socket.end('goodbye...');
		}
	});
	socket.write('Nice to meet you ~');
});

server.listen(()=>{
	console.log('open server on ', server.address());
});

