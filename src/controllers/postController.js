import Post from '../models/postModel.js';
import { errorResponse } from '../utils/errorResponse.js';

export const createPost = async (req, res) => {
    try {
        const { title, content, author } = req.body;
        const newPost = new Post({ title, content, author });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        errorResponse(res, 'We encountered an error while creating your post. Please try again later.', error.message);
    }
};

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author');
        res.status(200).json(posts);
    } catch (error) {
        errorResponse(res, 'We encountered an error while fetching the posts. Please try again later.', error.message);
    }
};

export const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author');
        if (!post) {
            return res.status(404).json({ message: 'Sorry, we could not find the post you are looking for.', success: false });
        }
        res.status(200).json(post);
    } catch (error) {
        errorResponse(res, 'We encountered an error while fetching the post. Please try again later.', error.message);
    }
};

export const updatePost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
        if (!updatedPost) {
            return res.status(404).json({ message: 'Sorry, we could not find the post you are trying to update.', success: false });
        }
        res.status(200).json(updatedPost);
    } catch (error) {
        errorResponse(res, 'We encountered an error while updating the post. Please try again later.', error.message);
    }
};

export const deletePost = async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(404).json({ message: 'Sorry, we could not find the post you are trying to delete.', success: false });
        }
        res.status(200).json({ message: 'The post has been deleted successfully.', success: true });
    } catch (error) {
        errorResponse(res, 'We encountered an error while deleting the post. Please try again later.', error.message);
    }
};