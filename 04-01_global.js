// process对象

console.log(process);

console.log(process.pid, process.title);
console.log(process.env);

process.title = 'mynode';

console.log(process.pid, process.title);

console.log(process.cwd());

console.log(process.memoryUsage())

process.on('beforeExit',(err)=>{
	console.log('before exit...')
})

process.stdin.resume();

//定时器
let sec = 0
let timer = setTimeout(()=>{
	//console.log('time out.')
	process.exit(0);
},10000);

setInterval(()=>{
	console.log(`第 ${++sec} 秒`);
	if(sec === 8){
		clearTimeout(timer);
	}
},1000);

// __filename __dirname

console.log(__filename, '\n',__dirname);

// console 控制台对象

console.log('log');
console.debug('debug');
console.info('info');
console.warn('warn');
console.error(new Error('error');

console.dir(process);

let list = [{name:'jack',score:99},{name:'bin',score:100},{name:'tom',score:66}];
console.table(list);

console.time();

let list = [{name:'jack',score:99},{name:'bin',score:100},{name:'tom',score:66}];
console.table(list);

console.timeEnd();

console.time('label1');

console.timeEnd('label1');

// assert 断言

console.assert(1<2, '1>2 is wrong.');

console.count('label');
console.count('label');
console.count('label');
console.count('label');

const { Console } = require('console');

const fs = require('fs');

const out = fs.createWriteStream('./stdout.log');

const err = fs.createWriteStream('./stderr.log');

const logger = new Console({stdout: out, stderr: err});

logger.info('info.....');
logger.trace('trace....');
logger.error('error....');
logger.table(list);

// 全局变量定义

global.xxx = 123;
require('./mod')
console.log(xxx);



















