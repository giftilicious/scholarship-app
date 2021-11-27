const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const scholarshipSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  deadline: {
    type: String,
    trim: true,
  },
  amount: {
      type: Number,
  },
  ethnicity: {
    type: [String],
  },
  disability: {
    type: [String],
  },
  levelofstudy: {
    type: [String],
  },
  gender: {
    type: [String],
  },
  applink: {
    type: String,
    trim: true,
  },
  appemail: {
    type: String,
    trim: true,
  },
});

const Scholarship = model('Scholarship', scholarshipSchema);

module.exports = Scholarship;
