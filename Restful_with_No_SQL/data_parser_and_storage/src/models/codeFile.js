/**
 * Model structure for "YourJavaCode.JSON"
 */

const mongoose = require('mongoose');

const codeFileSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('codeFile', codeFileSchema);
