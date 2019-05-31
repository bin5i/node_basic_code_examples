// user model by mysql
const mysql = require('mysql');
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'bin123456',
	database: 'test'
});

connection.connect((err)=>{
	if(err){
		console.log(`connect to mysql error: ${err.code}`);
	}else{
		console.log('connect to mysql successful.');
	}
});

connection.on('error', (err)=>{
	console.log('mysql connection error: ' + err.code);
});

const User = {
	create: (user, callback)=>{
		const query = connection.query('INSERT INTO user SET ?', user, (err, result, fields)=> {
		  	if (err){
		  		return callback(err)
		  	}
		  	if(result.affectedRows === 0){
		  		return callback(new Error('insert user fail'));
		  	}
		  	connection.query('SELECT * FROM user WHERE id = ?', [result.insertId], (err, result, fields)=> {
		  		callback(err, result[0]);
		  	});
		});
		console.log(query.sql);
	},
	update: (id, user, callback)=>{
		const query = connection.query('UPDATE user SET ? WHERE id = ?', [user, parseInt(id)], (err, result, fields)=> {
		  	if (err){
		  		return callback(err)
		  	}
		  	if(result.affectedRows === 0){
		  		return callback(new Error('user not exist'));
		  	}
		  	connection.query('SELECT * FROM user WHERE id = ?', [parseInt(id)], (err, result, fields)=> {
		  		callback(err, result[0]);
		  	});
		});
		console.log(query.sql);
	},
	get: (id, callback)=>{
		connection.query('SELECT * FROM user WHERE id = ?', [parseInt(id)], (err, result, fields)=> {
	  		callback(err, result[0]);
	  	});
	},
	getList: (callback)=>{
		connection.query('SELECT * FROM user', (err, result, fields)=> {
	  		callback(err, result);
	  	});
	},
	remove: (id, callback)=>{
		const query = connection.query('SELECT * FROM user WHERE id = ?', [parseInt(id)], (err, result, fields)=> {
		  	if (err){
		  		return callback(err)
		  	}
		  	if(result.length === 0){
		  		return callback(new Error('user not exist'));
		  	}
		  	const user = result[0];
		  	connection.query('DELETE FROM user WHERE id = ?', [parseInt(id)], (err, result, fields)=> {
		  		callback(err, user);
		  	});
		});
		console.log(query.sql);
	}
};

module.exports = User;

// User.create({name:'bin', address:'BJ'}, (err, result)=>{
// 	console.log(err || result);
// });
// User.update(15, {name:'bin2', address:'BJ2'}, (err, result)=>{
// 	console.log(err || result);
// });
// User.get(15, (err, result)=>{
// 	console.log(err || result);
// });
// User.getList((err, result)=>{
// 	console.log(err || result);
// });
// User.remove(15, (err, result)=>{
// 	console.log(err || result);
// });
