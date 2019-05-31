// 定义一个模块

let name = 'bin'

let getName = ()=>{

	return name;
}

// exports.name = name;
// exports.getName = getName;

module.exports = {
	name: name,
	getName: getName
}

console.log(module)


