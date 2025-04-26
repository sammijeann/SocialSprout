import { Schema, model } from 'mongoose';
// Schema to create Post model
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: [true, 'Please type your thoughts!'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => {
            if (timestamp) {
                return new Date(timestamp).toLocaleString('en-US', { timeZone: 'UTC' });
            }
            return timestamp;
        }
    },
    username: {
        type: String,
        required: [true, 'username is required'],
    },
    reactions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'reaction',
        },
    ],
}, {
    toJSON: {
        virtuals: true,
    },
    id: false,
});
// Create a virtual property `reactionsCount` that gets the amount of comments per thought
thoughtSchema
    .virtual('reactionsCount')
    // Getter
    .get(function () {
    return this.reactions.length;
});
// Initialize our Post model
const Thought = model('tbought', thoughtSchema);
export default Thought;
