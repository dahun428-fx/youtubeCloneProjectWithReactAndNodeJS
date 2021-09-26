const express = require('express');
const router = express.Router();
const { Like } = require('../models/Like');
const { DisLike } = require('../models/DisLike');

// ============================================
//                      Like
// ============================================

router.post('/upLike', (req, res) => {
    let body = {};
    if(req.body.videoId){
        body = { videoId : req.body.videoId, userId : req.body.userId }
    } else {
        body = { commentId : req.body.commentId, userId : req.body.userId }
    }
    const like = new Like(body);
    like.save((err, like)=>{
        if(err){
            return res.status(400).send(err);
        } else {
            DisLike.findOneAndDelete(body).exec((err, disLike) => {
                if(err){
                    return res.status(400).json({success : false, err})
                } else {
                    return res.status(200).json({success : true});
                }
            })
        }
    })
})
router.post('/downLike', (req, res) => {
    let body = {};
    if(req.body.videoId){
        body = { videoId : req.body.videoId, userId : req.body.userId }
    } else {
        body = { commentId : req.body.commentId, userId : req.body.userId }
    }

    Like.findOneAndDelete(body)
    .exec((err, like) => {
        if(err){
            return res.status(400).send(err);
        } else {
            return res.status(200).send({success : true})
        }
    })
})
router.post('/getLikes', (req,res)=>{
    let body = {};
    if(req.body.videoId){
        body = { videoId : req.body.videoId }
    } else {
        body = { commentId : req.body.commentId }
    }

    Like.find(body)
    .exec((err, likes) => {
        if(err){
            return res.status(400).send(err);
        } else {
            return res.status(200).json({
                success : true,
                likes
            })
        }
    })
})
router.post('/getLikesByUser', (req, res) => {

    let body = {};
    if(req.body.videoId){
        body = { videoId : req.body.videoId, userId : req.body.userId }
    } else {
        body = { commentId : req.body.commentId, userId : req.body.userId }
    }

    Like.findOne(body)
    .exec((err, likes) => {
        if(err){
            return res.status(400).send(err);
        } else {
            return res.status(200).json({
                success : true,
                likes
            })
        }
    })
})
router.post('/upDisLike', (req, res) => {
    let body = {};
    if(req.body.videoId){
        body = { videoId : req.body.videoId, userId : req.body.userId }
    } else {
        body = { commentId : req.body.commentId, userId : req.body.userId }
    }
    const dislike = new DisLike(body);
    dislike.save((err, dislike)=>{
        if(err){
            return res.json({ success : false, err });
        } else {
            Like.findOneAndDelete(body).exec((err, like) => {
                if(err){
                    return res.status(400).send(err);
                } else {
                    return res.status(200).json({success : true});
                }
            })
        }
    })
})
router.post('/downDisLike', (req, res) => {
    let body = {};
    if(req.body.videoId){
        body = { videoId : req.body.videoId, userId : req.body.userId }
    } else {
        body = { commentId : req.body.commentId, userId : req.body.userId }
    }

    DisLike.findOneAndDelete(body)
    .exec((err, dislike) => {
        if(err){
            return res.status(400).send(err);
        } else {
            return res.status(200).send({success : true})
        }
    })
})
router.post('/getDisLikes', (req, res) => {
    let body = {};
    if(req.body.videoId){
        body = { videoId : req.body.videoId }
    } else {
        body = { commentId : req.body.commentId }
    }

    DisLike.find(body)
    .exec((err, dislikes) => {
        if(err){
            return res.status(400).send(err);
        } else {
            return res.status(200).json({
                success : true,
                dislikes
            })
        }
    })
})
router.post('/getDisLikesByUser', (req, res) => {
    let body = {};
    if(req.body.videoId){
        body = { videoId : req.body.videoId, userId : req.body.userId }
    } else {
        body = { commentId : req.body.commentId, userId : req.body.userId }
    }

    DisLike.findOne(body)
    .exec((err, dislikes) => {
        if(err){
            return res.status(400).send(err);
        } else {
            return res.status(200).json({
                success : true,
                dislikes
            })
        }
    })
})


module.exports = router;