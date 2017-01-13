const app = require('../index')
const Task = require('.././models/model')
exports.index = (req,res,next) => {
	res.sendfile('./app/index.html');
}

exports.add = (req,res,next) => {
	let tarea = new Task({
		name: req.body.name,
		date: new Date()
	})

	tarea.save((err,data) => {
		if (err) {console.log(err)}

		console.log(data)
		app.io.sockets.emit('update');
	})
}

exports.all = (req,res,next) => {
	Task.find((err,data) => {
		if (err) {console.log(err)}

		res.json(data)
		//console.log(data)
	})
}

exports.delete = (req,res,next) => {
	Task.findById(req.params.id,(err,data) =>{
		if (err) {console.log(err)}

		data.remove(err => {
			if (err) {console.log(err)}

			console.log(req.params.id + ' eliminado')
			app.io.sockets.emit('update');
		})
	}) 
}

exports.edit = (req,res,next) => {
	Task.findById(req.params.id,function(err,data){
		if (err) {console.log(err)}

		res.json(data);
	})
}

exports.update = (req,res,next) => {

	let tarea = new Task({
		_id: req.params.id,
		name: req.body.name,
		date: new Date()
	})
	Task.update({_id: req.params.id},tarea, (doc) => {
		//if (err) {console.log(err)}
		console.log(doc);
		app.io.sockets.emit('update');
	})
}
