// 命令行程序
// 功能：采集用户个人信息并写入json文件
// 业务逻辑：
// 1. 程序开始，提示用户是否进行个人信息的录入？是：进入下一步；否：退出程序
// 2. 输入用户名称，按提示输入合法用户名称，检查是否合法，不合法则提示重新输入
// 3. 下一步，选择性别：1. 男 2. 女， 选择选项的数字，检查选择是否合法，不合法则提示重新选择，默认值为1. 男
// 4. 下一步，输入生日，判断是否合法，不合法则提示并重新输入
// 5. 下一步，选择职业，可以从给出的列表中选择，也可以直接输入职业名称
// 6. 最后，提示用户是否确认保存？ 是：保存到json文件并退出程序，否：不保存退出程序
// 7. 使用用户名做为文件名保存到当前目录下，如：bin.json
const fs = require('fs');
const readline = require('readline');

let person = {
	name: null,
	gender: null,
	birthday: null,
	job: null
};

let index = 0;
const list = [
	{
		question: '请确认是否立即输入信息? (Y/n)',
		handler: (answer)=>{
			answer = answer.trim();
			if(answer === '' || answer.toLowerCase() === 'y'){
				// 进入下一步
				//console.log("您选择了：Y");
				index++;
				console.log(list[index].question);
			}else if( answer.toLowerCase() === 'n' ){
				console.log('您已取消本次输入，退出程序');
				process.exit(0);
			}else{
				console.log('输入无效，请输入 y 或 n')
			}
		}
	},
	{
		question: '1. 请输入您的名字？[1-10字母]',
		handler: (answer)=>{
			answer = answer.trim();
			if(/^[a-zA-Z]{1,10}$/.test(answer)){
				// 进入下一步
				person.name = answer;
				index++;
				console.log(list[index].question);
			}else{
				console.log('输入无效，请输入1-10个字母');
			}
		}
	},
	{
		question: '2. 请选择您的性别数字？ \n[1] 男 \n[2] 女',
		handler: (answer)=>{
			answer = answer.trim();
			if(answer === '1' || answer === '2'){
				// 进入下一步
				person.gender = answer === '1' ? '男' : '女';
				index++;
				console.log(list[index].question);
			}else{
				console.log('输入无效，请输入 1 或 2')
			}
		}
	},
	{
		question: '3. 请输入您的出生日期？ (如：1988-01-01)',
		handler: (answer)=>{
			answer = answer.trim();
			if(/^[0-9]{4}\-[0-9]{2}\-[0-9]{2}$/.test(answer)){
				// 进入下一步
				person.birthday = answer;
				index++;
				console.log(list[index].question);
			}else{
				console.log('输入无效，请输入合法日期，如：1988-01-01')
			}
		}
	},
	{
		question: '4. 请选择或输入您的职业？ \n[1] 程序员 \n[2] 记者 \n[3] 作家',
		handler: (answer)=>{
			answer = answer.trim();
			let jobs = ['程序员', '记者', '作家'];
			if(/^[123]{1}$/.test(answer)){
				// 进入下一步
				person.job = jobs[parseInt(answer)-1];
				index++;
				console.log(list[index].question);
			}else if( /^[a-zA-Z]{1,10}$/.test(answer) ){
				person.job = answer;
				index++;
				console.log(list[index].question);
			}else{
				console.log('输入无效，请输入 1-3, 或 1-10个字母')
			}
		}
	},
	{
		question: '请确认是否保存您的输入信息？ (Y/n)',
		handler: (answer)=>{
			answer = answer.trim();
			if(answer === '' || answer.toLowerCase() === 'y'){
				// 进入下一步
				fs.writeFileSync('./'+ person.name + '.json', JSON.stringify(person, null, 4));
				console.log('保存完成，退出程序');
				process.exit(0);
			}else if( answer.toLowerCase() === 'n' ){
				console.log('您已选择不保存本次输入，退出程序');
				process.exit(0);
			}else{
				console.log('输入无效，请输入 y 或 n')
			}
		}
	}
];

const rl = readline.createInterface({
	input: process.stdin,
	outpu: process.stdout
});

rl.on('line', (input)=>{
	//console.log('received: ' + input);
	list[index].handler(input);
});

console.log('欢迎使用用户个人信息采集程序！');

console.log(list[index].question);

rl.resume();











