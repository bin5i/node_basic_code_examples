//引入一个模块

// const mod = require('./03-01_mod')

// console.log(mod);

const fs = require('fs');

// console.log(fs.statSync('./03-01_mod.js'));

fs.stat('./03-01_mod.js', (err, stat)=>{
	//console.log(err, stat);
	if(err){
		// throw error
	}
	console.log(stat);
})