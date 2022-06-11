import express from 'express';

import {
  getPosts,
  getPostsBySearch,
  getPostsByUser,
  // getPostsByLikes,
  getPost,
  createPost,
  updatePost,
  likePost,
  deletePost,
  commentPost,
} from '../controllers/posts.js';
import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

const router = express.Router();
import auth from '../middleware/auth.js';

router.get('/profile/:id', auth, getPostsByUser);
// router.get('/likes', auth, getPostsByLikes);
router.get('/search', getPostsBySearch);
router.get('/', getPosts);
router.get('/:id', getPost);

router.get('/user/:id', auth, (req, res) => {
  User.findOne({ _id: req.params.id })
    .select('-password')
    .then((user) => {
      PostMessage.find({ creator: req.params.id })
        .populate('creator', '_id name')
        .exec((err, posts) => {
          if (err) {
            return res.status(422).json({ error: err });
          }
          res.json({ user, posts });
        });
    })
    .catch((err) => {
      return res.status(404).json({ error: 'User not found' });
    });
});
router.get('/mypost', auth, (req, res) => {
  PostMessage.find({ creator: req.user._id })
    .populate('creator', '_id name')
    .then((mypost) => {
      res.json({ mypost });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
router.post('/:id/commentPost', auth, commentPost);
export default router;
