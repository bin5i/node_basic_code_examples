// 静态资源文件服务器
// 1. 返回对应的路径文件内容
// 2. 如果不存在，返回 “file not exist”
// 3. 文件缓存机制，提高响应效率
// 4. 文件上传
// 5. 文件下载

const http = require('http');
const fs = require('fs');
const fsp = require('fs').promises;
const root = __dirname; //'./';
let cacheList = {};

const handler = async (path, callback)=>{
	const realpath = root + path;
	console.log(realpath);
	try{
		await fsp.access(realpath, fs.constants.F_OK);
		callback(null, await fsp.readFile(realpath));
	}catch(err){
		callback('file not exist.');
	}

}

const handleFile = (boundary, content, callback)=>{
	
	boundary = Buffer.from(boundary);
	const liner = Buffer.from('0d0a', 'hex');
	// console.log('boundary length: ' , boundary.length);
	boundary = Buffer.concat([boundary, liner])
	const boundarySize = boundary.length;
	// console.log('boundary length: ' , boundarySize);
	// console.log(boundary.toString('hex'));
	// console.log(content.toString('hex'));
	let data = content.slice(boundarySize + 2 , (content.length - (boundarySize + 2) - 2) );
	// console.log('after...');
	// console.log(data.toString('hex'));
	let pos = data.indexOf(Buffer.from('0d0a0d0a', 'hex'));
	//分割form data 部分
	let formstr = data.slice(0,pos);
	//提取文件名
	let formline = formstr.slice(0, formstr.indexOf(liner));
	let filename = Date.now() + '_' + formline.toString('utf8').split('"')[3];
	//分割文件数据部分
	let filestr = data.slice(pos + 4, data.length - 2);
	//let filename = './tmp_mod.js';
	//写入文件
	fs.writeFileSync(filename, filestr);
	console.log('saved at ' + filename);
	callback();
}

const server = http.createServer((req, res)=>{
	console.time();
	console.log(`request ${req.method} : ${req.url}`);
	if(req.method === 'POST' && req.url === '/upload'){
		//上传文件处理
		//res.end('upload');
		//handleFile()
		console.log(req.headers);
		const boundary = req.headers['content-type'].replace('multipart/form-data; boundary=','');
		console.log(`boundary : ${boundary}`);
		let data = [];
		req.on('data', (chunk)=>{
			data.push(chunk)
		});
		req.on('end', ()=>{
			handleFile(boundary, Buffer.concat(data), (err)=>{
				res.end(err || 'ok');
			});
		});

	}else if (req.method === 'GET' && /^\/download\//.test(req.url)){
		//下载文件处理
		//res.end('download');
		const url = req.url.replace('/download','');
		if(cacheList[url]){
			res.end(cacheList[url])
			console.timeEnd();
		}else{
			handler(url, (err, content)=>{
				if(err){
					res.end(err);
					return;
				}
				cacheList[url] = content;
				res.setHeader('Content-Type','application/octet-stream');
				res.end(content);
				console.timeEnd();
			});
		}
	}else{
		//正常返回文件内容
		//res.end('normal');
		if(cacheList[req.url]){
			res.end(cacheList[req.url])
			console.timeEnd();
		}else{
			handler(req.url, (err, content)=>{
				if(err){
					res.end(err);
					return;
				}
				cacheList[req.url] = content;
				res.end(content);
				console.timeEnd();
			});
		}
		
	}
});

server.listen(3000, ()=>{
	console.log('Static server is on 3000...');
})