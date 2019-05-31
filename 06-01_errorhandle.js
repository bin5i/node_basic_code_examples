// 同步函数异常处理
process.on('uncaughtException',(err)=>{
	console.log('uncaughtException: ' + err.message);
	process.exit(0)
});

// let add = (a,b)=>{
// 	console.log(x);
// 	return a + b;
// }

// try{
// 	add();
// }catch(err){
// 	//console.log(err.message);
// 	throw Error('加法异常: '+ err.message);
// }


// 异步函数异常处理

let f = (callback)=>{
	callback('error');
}

// f((err)=>{
// 	if(err){
// 		console.log(err);
// 		return false;
// 	}
//     // TODO: 

// })

let sayhi4 = (name)=>{
	return new Promise((resolve, reject)=>{
		if(!name){
			reject('name is empty.');
		}else{
			resolve('Hi, ' + name);
		}
	});
}

sayhi4().then(()=>{
	throw Error('')
}).catch(err){

}

let callSayhi = async ()=>{
	try{
		let result = await sayhi4('bin');
		console.log(result);
		result = await sayhi4('jack');
		console.log(result);
		result = await sayhi4('tom');
		console.log(result);
	}catch(err){
		console.error(err);
	}
}

callSayhi();













