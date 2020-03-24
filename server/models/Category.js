const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name:{type:String},
  parent: { type: mongoose.SchemaTypes.ObjectId,ref:'Category' },
})
// 数据库里面的objectid

module.exports = mongoose.model('Category', schema)