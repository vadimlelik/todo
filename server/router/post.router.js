import { Router } from 'express';
import { Post } from '../model/post.model.js';
import { isAuth } from '../midleaweare/isAuth.js';

export const postRouter = Router();

postRouter.get('/', isAuth, async(req, res)=>{
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})
postRouter.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
postRouter.post('/', async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
postRouter.patch('/:id', async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate({ _id: req.params.id }, req.body,{ new: true });
    console.log(post,'post');
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
postRouter.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
