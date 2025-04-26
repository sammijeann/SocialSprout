// Assistance from Xpert AI with formatting schema

const mongoose = require('mongoose');
const { Schema } = mongoose;

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId() 
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280 
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now, 
    get: (timestamp: any) => {
      return new Date(timestamp).toLocaleString(); 
    }
  }
}, {
  toJSON: {
    getters: true 
  },
  id: false 
});

// Export the Reaction model
module.exports = mongoose.model('Reaction', reactionSchema);