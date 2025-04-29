// Assistance from Xpert AI with formatting schema

import { Schema } from 'mongoose';;

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
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

export default reactionSchema;