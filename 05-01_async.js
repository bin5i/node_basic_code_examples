// 同步与异步函数

// let sayhi = (name)=>{
// 	return 'Hi, ' + name;
// }

// console.log(sayhi('bin'));
// console.log('done');

// let sayhi2 = (name, callback)=>{
// 	let str = 'Hi, ' + name;
// 	setTimeout(()=>{
// 		callback(null, str);
// 	},1000 );
// }

// sayhi2( 'bin1', (err, result)=>{
// 	console.log(result);
// 	sayhi2( 'bin2', (err, result)=>{
// 		console.log(result);
// 		sayhi2( 'bin3', (err, result)=>{
// 			console.log(result);
			
// 		});
// 	});
// });

// console.log('done');

// promise 
/*
let sayhi3 = (name)=>{
	return new Promise((resolve, reject)=>{
		if(!name){
			reject('name is empty.');
		}else{
			resolve('Hi, ' + name);
		}
	});
}

sayhi3('bin')
.then((result)=>{
	console.log('1: ' + result);
	return sayhi3('jack');
})
.then((result)=>{
	console.log('2: ' + result);
	//throw "error22222"
})
.catch((err)=>{
	console.error(err);
})
*/

// generator and yield
/*
let step1 = ()=>{ 
	return new Promise((resolve, reject)=>{
		resolve('step1.....');
	});
}
let step2 = ()=>{ 
	return new Promise((resolve, reject)=>{
		resolve('step2.....');
	});
}
let step3 = ()=>{ 
	return new Promise((resolve, reject)=>{
		resolve('step3.....');
	});
}
let step4 = ()=>{ 
	return new Promise((resolve, reject)=>{
		resolve('step4.....');
	});
}

function * generator(items){
	let index = 0;
	let max = items.length;
	while( index < max){
		yield items[index++]();
	}
}

let f = generator([step1, step2, step3, step4]);


console.log(f.next());
console.log(f.next());
console.log(f.next());
console.log(f.next());

console.log(f.next());

*/

// async and await

let sayhi4 = (name)=>{
	return new Promise((resolve, reject)=>{
		if(!name){
			reject('name is empty.');
		}else{
			resolve('Hi, ' + name);
		}
	});
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



















