const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const scholarshipSchema = new Schema({
  title: {
    type: String,
    required: 'Scholarship should have a title!',
    minlength: 1,
    maxlength: 200,
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
  value: {
    type: Number,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
    get: (timestamp) => dateFormat(timestamp),
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
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const Scholarship = model('Scholarship', scholarshipSchema);

module.exports = Scholarship;
