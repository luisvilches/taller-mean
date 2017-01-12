const mongoose = require('mongoose')
let Schema = mongoose.Schema;

let Task = new Schema({
	name: String,
	date: Date
})

module.exports = mongoose.model('Task', Task)