const express = require('express');
const router = express.Router();
const { Video } = require('../models/Video');
const { User } = require('../models/User')
const { auth } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
var ffmpeg = require('fluent-ffmpeg');
const { Subscriber } = require('../models/Subscriber');

// ====================================
//             VIDEO
// ====================================
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
})
const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if(ext !== '.mp4'){
        req.fileValidationError = 'only mp4 is allowed';
        return cb(true, false);
    } else {
        return cb(null, true);
    }
}
const limits = {
    fileSize : 10000000000000
}
const upload = multer({storage, fileFilter, limits}).single("file");
router.post('/getVideo', (req, res) => {
    Video.findOne({
        _id : req.body.videoId
    })
    .populate('writer')
    .exec((err,video) => {
        if(err){
            return res.status(400).send(err);
        } else {
            return res.status(200).json({
                success : true,
                video
            })
        }
    })
})
router.post('/getMyVideos', (req, res) => {
    Video.find()
    .populate('writer')
    .exec((err, videos) => {
        if(err){
            return res.status(400).send(err);
        } else {
            let result = videos.filter((video) => {
                return String(video.writer._id) === String(req.body.userId)
            })
            return res.status(200).json({
                success : true,
                videos : result
            })
        }
    })
})
router.get('/getVideos', (req, res) => {
    Video.find().populate('writer').exec((err, videos) => {
        if(err){
            return res.status(400).send(err);
        } else {
            return res.status(200).json({
                success : true,
                videos
            })
        }
    })
})
router.post("/uploadfiles", (req, res) => {

    upload(req, res, err => {
        if(err){
            return res.json({ success : false, err });
        } else {
            return res.json({ success : true, url : res.req.file.path, fileName : res.req.file.filename })
        }
    })

})
router.post('/deleteVideo', (req, res) => {
    Video.findOneAndDelete({
        _id : req.body.videoId
    }).exec((err, video) => {
        if(err){
            return res.status(400).send(err);
        } else {
            return res.status(200).json({success : true});
        }
    })
})
router.post('/modifyVideo', (req, res) => {
    Video.findOneAndUpdate({
        _id : req.body._id
    }, req.body)
    .exec((err, video) => {
        if(err){
            return res.status(400).send(err);
        } else {
            return res.status(200).json({
                success : true,
                video
            })
        }
    })
})
router.post('/uploadVideo', (req, res) => {
    const video = new Video(req.body);

    video.save((err, video) => {
        if(err){
            return res.json({ success : false, err });
        } else {
            return res.status(200).json({
                success : true,
            })
        }
    })

})
router.post('/thumbnail', (req, res) => {

    let filePath = '';
    let fileDuration = '';
    ffmpeg.setFfmpegPath("C://app//tools//ffmpeg//ffmpeg//bin//ffmpeg.exe");
    ffmpeg.setFfprobePath("C://app//tools//ffmpeg//ffmpeg//bin//ffprobe.exe");
    ffmpeg.ffprobe(req.body.url, function(err, metadata){
        fileDuration = metadata.format.duration;
    })
    //썸내일 생성하고 비디오 러닝타임 가져오기
    ffmpeg(req.body.url)
    .on('filenames', function(filenames){
        filePath = `uploads/thumbnails/${filenames[0]}`;
    })
    .on('end', function(){
        return res.json({
            success : true,
            url : filePath,
            fileDuration : fileDuration,
        })
    })
    .on('error', function(err){
        return res.json({
            success : false,
            err
        });
    })
    .screenshots({
        count : 3,
        folder : 'uploads/thumbnails',
        size : '320x240',
        filename : 'thumbnail-%b.png'
    })
})
router.post('/getSubscriptionVideos', (req, res) => {
    Subscriber.find({
        userFrom : req.body.userFrom
    })
    .exec((err, subscribeInfo)=>{
        if(err){
            return res.status(400).send(err);
        } else {
            let subscribedUser = [];
            subscribeInfo.map((subscriber, index) => {
                subscribedUser.push(subscriber.userTo);
            })
            Video.find({
                writer : { $in : subscribedUser }
            })
            .populate('writer')
            .exec((err, videos) => {
                if(err){
                    return res.status(400).send(err);
                } else {
                    return res.status(200).json({
                        success : true,
                        videos
                    })
                }
            })
        }
    })
})



module.exports = router;