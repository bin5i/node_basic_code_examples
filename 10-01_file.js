// 文件操作：读、写

// 1. 文本文件

const fs = require('fs');
//const fsp = require('fs').promises
// sync 同步api读文件
// try{
// 	const content = fs.readFileSync('./programmer.txt');
// 	console.log(content.toString('utf8'));
// }catch(err){
// 	console.error(err.message);
// }

// callback 异步api读文件

// fs.readFile('./programmer.txt', (err, content)=>{
// 	if(err){
// 		console.error(err.message);
// 		return;
// 	}
// 	console.log(content.toString());
// });

// promise 读文件

// fsp.readFile('./programmer0.txt')
// .then((content)=>{
// 	console.log(content.toString())
// })
// .catch((err)=>{
// 	console.error(err.message);
// })

// async/wait

// const readFile = async ()=>{
// 	try{
// 		let content = await fsp.readFile('./programmer.txt','utf8');
// 		console.log(content.toString());
// 	}catch(err){
// 		console.error(err.message);
// 	}
// }

// readFile();

// 手动封装promise对象

// const util = require('util');
// const readFile = util.promisify(fs.readFile);

// const readFile1 = async ()=>{
// 	try{
// 		let content = await readFile('./programmer.txt');
// 		console.log(content);
// 	}catch(err){
// 		console.error(err.message);
// 	}
// }
// readFile1();

// 写文本文件

// const util = require('util');
// const writeFile = util.promisify(fs.writeFile);

// const writeFile1 = async ()=>{
// 	try{
// 		let result = await writeFile('./t.txt', "这是一个文本文件写操作的测试内容。。。。。。。。");
// 		console.log(result);
// 	}catch(err){
// 		console.error(err.message);
// 	}
// }
// writeFile1();

// stream 读写大文件

// const rfs = fs.createReadStream('./programmer0.txt', {highWaterMark: 1024 * 100});

// rfs.on('data', (chunk)=>{
// 	console.log(`read data size: ${chunk.length} bytes.`);
// });

// rfs.on('end',()=>{
// 	console.log('over.');
// })

// rfs.on('error',(err)=>{
// 	console.error(err.message);
// })

// const wfs = fs.createWriteStream('./test.log', {flags: 'a'});

// setInterval(()=>{
// 	wfs.write(''+ Date.now());
// },1000)


const wfs = fs.createWriteStream('./test.log', {flags: 'a'});
process.stdin.pipe(wfs);
process.stdin.resume();










