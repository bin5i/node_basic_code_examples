// user model by mongodb
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const url = 'mongodb://localhost:27017';
const dbname = 'test';
let db = null;
let coll = null;
MongoClient.connect(url, { useNewUrlParser: true }, (err, client)=>{
	if(err){
		console.log(`connect to mongodb error: ${err.code}`);
		console.log('quit');
		process.exit(1);
	}else{
		console.log('connect to mongodb successful.');
		db = client.db(dbname);
		coll = db.collection('user');
		runTest();
	}
});

const User = {
	create: async (user, callback)=>{
		const result = await coll.insertOne(user);
		if(result.insertedCount === 0){
			return callback(new Error('insert uer fail'));
		}
		callback(null, result.ops[0]);
		//console.log(result);
	},
	update: async (id, user, callback)=>{
		const result = await coll.findOneAndUpdate(
			{_id: new mongo.ObjectID(id)}, 
			{$set:user}, 
			{returnOriginal: false}
		);
		if(result.lastErrorObject.updatedExisting === false){
			return callback(new Error('user not exist'))
		}
		callback(null, result.value);
		//console.log(result);
	},
	get: async (id, callback)=>{
		const result = await coll.findOne({_id: new mongo.ObjectID(id)});
		callback(null, result);
	},
	getList: async (callback)=>{
		const result = await coll.find({},{limit: 100, skip:0});
		callback(null, await result.toArray());
	},
	remove: async (id, callback)=>{
		const result = await coll.findOneAndDelete(
			{_id: new mongo.ObjectID(id)}, 
			{returnOriginal: false}
		);
		//console.log(result);
		if(result.lastErrorObject.n !== 1){
			return callback(new Error('user not exist'))
		}
		callback(null, result.value);
	}
};

module.exports = User;

const runTest = ()=>{
	// User.create({name:'bin', address:'BJ'}, (err, result)=>{
	// 	console.log(err || result);
	// });
	// User.update('5cd0e8077c9d0e75d45870c7', {name:'bin3', address:'BJ3'}, (err, result)=>{
	// 	console.log(err || result);
	// });
	// User.get('5cd0e8077c9d0e75d45870c7', (err, result)=>{
	// 	console.log(err || result);
	// });
	// User.getList((err, result)=>{
	// 	console.log(err || result);
	// });
	// User.remove('5cd0e92357e7ee769c230129', (err, result)=>{
	// 	console.log(err || result);
	// });
}


