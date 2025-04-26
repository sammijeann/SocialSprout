import { Thought, User } from '../models/index.js';
import { Request, Response } from 'express';


  export const getThoughts = async (_req: Request, res: Response) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  export const getSingleThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        res.status(404).json({ message: 'No post with that ID' });
      } else {
        res.json(thought);
      }
    } catch (err) {
      res.status(500).json(err)
    }
  }

  // create a new post
  export const createThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
         res
          .status(404)
          .json({ message: 'Post created, but found no user with that ID' });
      } else {  
        res.json('Created the post 🎉');
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }

