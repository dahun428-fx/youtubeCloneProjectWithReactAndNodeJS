const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');
const mongoose = require('mongoose');

mongoose.connect(config.mongoURI, {
    useNewUrlParser : true, 
    useUnifiedTopology : true,
    useCreateIndex : true,
    useFindAndModify : false, 
})
.then(()=> console.log('MongoDB Connected...'))
.catch((err)=>console.log(err));

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/videos', require('./routes/video'));
app.use('/api/users', require('./routes/user'));
app.use('/api/subscribe', require('./routes/subscribe'));
app.use('/api/comment', require('./routes/comment'));
app.use('/api/like', require('./routes/like'));
app.use('/uploads', express.static('uploads'));
app.get("/", (req,res)=> res.send('hello world'));



app.listen(port, ()=> console.log(`server start ... port : ${port}`));