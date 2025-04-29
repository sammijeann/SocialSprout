import User from '../models/User.js';
export const getUsers = async (_req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
export const getSingleUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate('thoughts');
        if (!user) {
            res.status(404).json({ message: 'No user with that ID' });
        }
        else {
            res.json(user);
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
};
// create a new user
export const createUser = async (req, res) => {
    try {
        const dbUserData = await User.create(req.body);
        res.json(dbUserData);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
// update user
export const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, // The ID of the user to update
        { $set: req.body }, // Update the user's information with the request body
        { new: true, runValidators: true } // Return the updated document and run validators
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'No user with that ID' });
        }
        return res.json(updatedUser);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
// Delete user
export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.userId, // The ID of the user to update
        { $set: req.body });
        if (!deletedUser) {
            return res.status(404).json({ message: 'No user with that ID' });
        }
        return res.json(deletedUser);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
// add friend
export const addFriend = async (req, res) => {
    try {
        const { userId, friendId } = req.params;
        // Add the friend to the user's friend list
        const updatedUser = await User.findByIdAndUpdate(userId, { $addToSet: { friends: friendId } }, // Use $addToSet to avoid duplicate entries
        { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'No user with that ID' });
        }
        return res.json(updatedUser);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
// remove friend
export const removeFriend = async (req, res) => {
    try {
        const { userId, friendId } = req.params;
        // Remove the friend to the user's friend list
        const updatedUser = await User.findByIdAndUpdate(userId, { $pull: { friends: friendId } }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'No user with that ID' });
        }
        return res.json(updatedUser);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
