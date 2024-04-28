const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const url = 'mongodb://localhost/blog';
const User = require('./models/user');
mongoose.set('strictQuery', true);
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/api/user/login', (req, res) => {
  mongoose.connect(`mongodb://localhost:27017/blog`).then(
    User.findOne( {username: req.body.username, password: req.body.password }).then((docs) => {
        console.log("Result: ", docs);
        if(docs){
         return res.status(200).json({
           status: 'success',
           data: docs
         })
        }else{
          return res.status(200).json({
            status: 'failed',
            message: 'Login Failed'
          })
        }
    
    }).catch( (error) => {res.status(500).json(error);
      
    })
  );
});

app.listen(3000, () => console.log('Listening on port 3000!'));

