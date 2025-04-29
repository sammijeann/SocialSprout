import { Schema, model, Document, InferSchemaType } from 'mongoose';
import reactionSchema from './Reaction.js';

type Reaction = InferSchemaType<typeof reactionSchema>; // Infer the type of a reaction from the schema

interface IThought extends Document {
 thoughtText: string;
 createdAt: Schema.Types.Date;
 username: string;
 reactions: Reaction[];
}

// Schema to create Post model
const thoughtSchema = new Schema<IThought>(
  {
    thoughtText: {
      type: String,
      required: [true, 'Please type your thoughts!'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp: any) => {
        if(timestamp){
          return new Date(timestamp).toLocaleString('en-US', { timeZone: 'UTC' }); 
        }
        return timestamp;
      }
    },
    username: {
      type: String,
      required: [true, 'username is required'],
    },
    //reactions: [reactionSchema],
    reactions: [reactionSchema],
  },
  {
    
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `reactionsCount` that gets the amount of comments per thought
thoughtSchema
  .virtual('reactionsCount')
  // Getter
  .get(function (this: IThought) {
    return this.reactions.length;
  });

// Initialize our Post model
const Thought = model('thought', thoughtSchema);

export default Thought;
