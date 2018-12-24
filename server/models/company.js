const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema
const companySchema = new Schema({
      compCode: String,
      compCodeHRIS: String,
      compName: String,
      compAbbrName: String,
      compRegNo: String,
      compLogo: String,
      compActivateDate: String,
      isActive: Boolean
})

companySchema.plugin(mongoosePaginate)

module.exports = mongoose.model('companyModel', companySchema, 'company')