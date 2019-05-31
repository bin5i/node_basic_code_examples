// user 模型
// 功能：定义用户的增删改查方法

let userlist = [];
let currentId = 0;

const User = {
	create: (user, callback)=>{
		user.id = ++currentId;
		userlist.push(user);
		callback(null, user);
	},
	update: (id, user, callback)=>{
		let index = -1;
		userlist.forEach((it, ind)=>{
			if(it.id === id){
				index = ind;
			}
		});
		if(index !== -1){
			for(let k in user){
				userlist[index][k] = user[k];
			}
			callback(null, userlist[index]);
		}else{
			callback(new Error("user not exist"),null)
		}
	},
	get: (id, callback)=>{
		let index = -1;
		userlist.forEach((it, ind)=>{
			if(it.id === id){
				index = ind;
			}
		});
		if(index !== -1){
			callback(null, userlist[index]);
		}else{
			callback(new Error("user not exist"),null)
		}
	},
	getList: (callback)=>{
		callback(null, userlist);
	},
	remove: (id, callback)=>{
		let index = -1;
		userlist.forEach((it, ind)=>{
			if(it.id === id){
				index = ind;
			}
		});
		if(index !== -1){
			callback(null, userlist.splice(index,1)[0])
		}else{
			callback(new Error("user not exist"), null)
		}
	}
}

module.exports = User;
