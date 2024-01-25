/**
 * Model structure for "YourJavaCode.JSON"
 */

const mongoose = require('mongoose');
const codeFileSchema = require('./codeFile');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  files: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'codeFile', // Reference to the CodeFile model
    required: true
  }]
});

module.exports = mongoose.model('Category', categorySchema);
