'use strict';

const mongoose = require('mongoose');
const app = require('./app');
const port = process.env.PORT || 9000;
const onlineDb =  "mongodb+srv://heroku:iznF7iVVyq4JJ01c@cluster0.cwv6b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const mongoDb = process.env.MONGODB_URL ||  onlineDb ||'mongodb://localhost:27017/social';

mongoose.connect(mongoDb, { useNewUrlParser: true })
.then(() => {
    console.log('DB: Connect OK!');
    app.listen(port, () => {
        console.log('Server running on => http://localhost:' + port);
    });
})
.catch(err => console.log(err));

console.log(' Server is Starting...');
