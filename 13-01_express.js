// Express 框架介绍
// 功能：
// 1. 处理静态资源文件请求
// 2. 上传下载文件
// 3. 模块引擎
// 4. 异常处理
// 5. 一组restful api: user
// 5.1 创建用户       POST /api/user
// 5.2 修改用户       PUT /api/user/:id
// 5.3 根据id查用户   GET /api/user/:id
// 5.4 取用户列表     GET /api/user
// 5.5 删除用户       DELETE /api/user/:id


const express = require("express");
const app = express();
//const User = require('./13-02_model')
//const User = require('./14-01_mysql-model');
const User = require('./14-02_mongo-model');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb)=> {
    cb(null, './uploads');
  },
  filename: (req, file, cb)=> {
  	//console.log(file);
    cb(null, Date.now() + '_' + file.originalname)
  }
});
const upload = multer({storage: storage});
//中间件
//静态资源文件处理
app.use(express.static('public'));
// 转换json格式数据
app.use(express.json());
//文件上传处理
app.post('/upload', upload.single('file'), (req, res, next)=>{
	console.log(req.file);
	res.send(req.file);
});
app.get('/download', (req, res, next)=>{
	res.download('./public/tmp.js');
});
// 配置ejs模板引擎
app.set('views', './views');
app.set('view engine','html');
app.engine('html', require('ejs').renderFile);

app.get('/testejs', (req, res, next)=>{
	res.render('t', {name:'Bin'})
});

app.get('/errortest', (req, res, next)=>{
	//throw new Error('my error....');
	next(new Error('my error....2'));
});

// user api
const router = express.Router();

router.post('/user', (req, res, next)=>{
	console.log(req.body);
	User.create(req.body, (err, user)=>{
		if (err){
			return next(err);
		}
		res.send(user);
	});
});

router.put('/user/:id', (req, res, next)=>{
	console.log(req.body);
	User.update(req.params.id, req.body, (err, user)=>{
		if (err){
			return next(err);
		}
		res.send(user);
	});
});

router.get('/user/:id', (req, res, next)=>{
	//console.log(parseInt(req.params.id));
	User.get(req.params.id, (err, user)=>{
		if (err){
			return next(err);
		}
		res.send(user);
	});
});

router.get('/user', (req, res, next)=>{
	User.getList((err, users)=>{
		if (err){
			return next(err);
		}
		res.send(users);
	});
});

router.delete('/user/:id', (req, res, next)=>{
	User.remove(req.params.id, (err, user)=>{
		if (err){
			//throw err
			return next(err);
		}
		res.send(user);
	});
});

app.use('/api', router);


app.use((err, req, res, next)=>{
	console.log(err);
	//res.send(err.message);
	res.render('error', {error: err});
});

app.listen(3000, ()=>{
	console.log('Express server is running on 3000...');
});