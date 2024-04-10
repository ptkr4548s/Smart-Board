const mongoose = require('mongoose');

const canvasSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true
  },
  imageData: {
    type:String,
    reuired:true
  },
  email: {
    type: String,
    required: true
  },
 
});

const Canvas = mongoose.model('Canvas', canvasSchema);

module.exports = Canvas;
