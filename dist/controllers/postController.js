import { Thought, User } from '../models/index.js';
export const getThoughts = async (_req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
export const getSingleThought = async (req, res) => {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId });
        if (!thought) {
            res.status(404).json({ message: 'No post with that ID' });
        }
        else {
            res.json(thought);
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
};
// create a new post
export const createThought = async (req, res) => {
    try {
        const thought = await Thought.create(req.body);
        const user = await User.findOneAndUpdate({ _id: req.body.userId }, { $addToSet: { thoughts: thought._id } }, { new: true });
        if (!user) {
            res
                .status(404)
                .json({ message: 'Post created, but found no user with that ID' });
        }
        else {
            res.json('Created the post 🎉');
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};
// delete post
export const deleteThought = async (req, res) => {
    try {
        const { thoughtId } = req.params; // Extract thoughtId from req.params
        const thought = await Thought.findByIdAndDelete(thoughtId); // Pass thoughtId directly
        // const user = await User.findOneAndUpdate(
        //   { _id: req.body.userId },
        //   { $pull: { thoughts: thought._id } },
        //   { new: true }
        // );
        if (!thought) {
            res
                .status(404)
                .json({ message: 'thought not found' });
        }
        else {
            res.json('deleted the post 🎉');
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};
export const addReaction = async (req, res) => {
    try {
        const { thoughtId } = req.params;
        // Add the reaction to the thought's reactions array
        const updatedThought = await Thought.findByIdAndUpdate(thoughtId, { $addToSet: { reactions: req.body } }, // Add the reaction to the array
        { new: true, runValidators: true } // Return the updated document and run validators
        );
        if (!updatedThought) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }
        return res.json(updatedThought);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};
export const deleteReaction = async (req, res) => {
    try {
        const { thoughtId } = req.params;
        // Add the reaction to the thought's reactions array
        const updatedThought = await Thought.findByIdAndUpdate(thoughtId, { $pull: { reactions: req.body } }, // Add the reaction to the array
        { new: true, runValidators: true } // Return the updated document and run validators
        );
        if (!updatedThought) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }
        return res.json(updatedThought);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};
// update thought
export const updateThought = async (req, res) => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtId, // The ID of the user to update
        { $set: req.body }, // Update the user's information with the request body
        { new: true, runValidators: true } // Return the updated document and run validators
        );
        if (!updatedThought) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }
        return res.json(updatedThought);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
