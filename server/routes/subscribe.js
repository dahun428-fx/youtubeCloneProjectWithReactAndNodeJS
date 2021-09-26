const express = require('express');
const router = express.Router();
const { Subscriber } = require('../models/Subscriber');

// ================================================
//                      SUBSCRIBER
// ================================================
router.post('/subscribe', (req, res) => {
    const subscribe = new Subscriber(req.body);
    subscribe.save((err, subscribe)=> {
        if(err){
            return res.json({success : false, err});
        } else {
            return res.status(200).json({
                success : true
            })
        }
    })
})
router.post('/unsubscribe', (req, res) => {
    Subscriber.findOneAndDelete({
        userTo : req.body.userTo,
        userFrom : req.body.userFrom
    }).exec(
    (err, subscribe) => {
        if(err) {
            return res.json({
                success : false,
                err
            })
        } else {
            return res.status(200).send({
                success : true
            })
        }
    })
})
router.post('/subscribeNumber', (req, res) => {
    Subscriber.find({
        userTo:req.body.userTo
    })
    .exec((err, subscribe) => {
        if(err){
            return res.status(400).send(err);
        } else {
            return res.status(200).json({
                success : true,
                subscribeNumber : subscribe.length
            })
        }
    })
})
router.post('/subscribed', (req,res) => {
    Subscriber.find({
        userTo : req.body.userTo,
        userFrom : req.body.userFrom
    }).exec((err, subscribe)=>{
        if(err){
            return res.status(400).send(err);
        } else {
            let result = false;
            if(subscribe.length !== 0){
                result = true;
            }
            return res.status(200).json({
                success : true,
                subscribe : result
            })
        }
    })
})

module.exports = router;