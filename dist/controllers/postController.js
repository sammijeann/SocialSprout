import { Thought, User } from '../models/index.js';
export const getPosts = async (_req, res) => {
    try {
        const posts = await Thought.find();
        res.json(posts);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
export const getSinglePost = async (req, res) => {
    try {
        const post = await Thought.findOne({ _id: req.params.postId });
        if (!post) {
            res.status(404).json({ message: 'No post with that ID' });
        }
        else {
            res.json(post);
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
};
// create a new post
export const createPost = async (req, res) => {
    try {
        const post = await Thought.create(req.body);
        const user = await User.findOneAndUpdate({ _id: req.body.userId }, { $addToSet: { posts: post._id } }, { new: true });
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
