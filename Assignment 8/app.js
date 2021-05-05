const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const productRouter = require('./routes/productRoutes');
const authRouter = require('./routes/auth');
const seedDB = require('./seedDB');



app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));





app.use(productRouter); 
app.use(authRouter);





mongoose.connect('mongodb://localhost:27017/blog',{useFindAndModify:false,useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true})
.then(()=>{
    console.log("connection done");
    // seedDB();
}).catch((err)=>{
    console.log(err);
})






















app.listen(8000,()=>{
    console.log(`Listening to port 8000`);
})


