const express = require('express');

const router = express.Router();

const productModel = require('../models/product');
const Review = require('../models/review');


const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');


const auth = require('./auth');

// Requiring the passport and passport-local in our router application

const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/user');


router.use(express.urlencoded({ extended: true }));
router.use(methodOverride('_method'));
router.use(express.static("public"));


router.use(session({
    secret: "Weneedsomebettersecret",
    resave: false,
    saveUninitialized: true
}))


router.use(flash());

router.use((req,res,next)=>{
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentuser = req.user;


    next();
})

router.use(passport.initialize());
router.use(passport.session());


// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Routes

router.get('/',(req,res)=>{
    res.render('landing');
})


// Getting all blogs

router.get('/blogs', async (req, res) => {

    try{

        if (!req.isAuthenticated()) {
            req.flash('error', 'You Need to login first');
            return res.redirect('/login');
        }

        const blogs = await productModel.find({});
        
        res.render('index', { blogs ,user:req.user});
    }
    catch(e)
    {
        console.log(e.message);
    }

    
})


// Getting Form for adding new Blog

router.get('/blogs/new', async (req, res) => {

    try{

        if (!req.isAuthenticated()) {
            req.flash('error', 'You Need to login first');
            return res.redirect('/login');
        }
        await res.render('new');
    }catch(e)
    {
        console.log(e.message);
    }
    
})


// Adding new Blog

router.post('/blogs', async (req, res) => {
    

    try {
        if (!req.isAuthenticated()) {
            req.flash('error', 'You Need to login first');
            return res.redirect('/login');
        }

        const b = {
            title:req.body.title,
            img: req.body.img,
            author: req.body.author,
            desc: req.body.desc
        }

        await productModel.create(b);

        
        req.flash('success', 'Blog added successfully');
        res.redirect('/blogs');

    } catch (error) {
        console.log(error.message);
    }


    
})


// To get a unique blog based on id

router.get('/blogs/:_id', async (req, res) => {
    try{

        if (!req.isAuthenticated()) {
            req.flash('error', 'You Need to login first');
            return res.redirect('/login');
        }
        const blog = await productModel.findById(req.params._id).populate('reviews');
        res.render('show',{blog});
    }
    catch(e)
    {
        res.send(e.message);
    }
    
})


// To get edit form for a particular ID

router.get('/blogs/:_id/edit', async (req, res) => {
    try {
        if (!req.isAuthenticated()) {
            req.flash('error', 'You Need to login first');
            return res.redirect('/login');
        }
        const blog = await productModel.findById(req.params._id);
        res.render('edit',{blog});
    } catch (error) {
        console.log(error.message);
    }
    
    
})


// Update a Blog based on ID

router.patch('/blogs/:_id', async (req, res) => {
    try {
        if (!req.isAuthenticated()) {
            req.flash('error', 'You Need to login first');
            return res.redirect('/login');
        }
        const b = {
            title: req.body.title,
            img: req.body.img,
            author: req.body.author,
            desc: req.body.desc
        }

        await productModel.findByIdAndUpdate(req.params._id,b);

        // To set a flash message in form of key,value pair using req.flash()

        req.flash('success','Blog Updated Successfully');
        res.redirect('/blogs');

    } catch (error) {
        console.log(error.message);
    }
})



// Deleting a particular Blog

router.delete('/blogs/:_id', async (req, res) => {
    try {

        if (!req.isAuthenticated()) {
            req.flash('error', 'You Need to login first');
            return res.redirect('/login');
        }
        await productModel.findByIdAndDelete(req.params._id);
        res.redirect('/blogs');

    } catch (error) {
        console.log(error.message);
    }
});



// Saving a new comment on a blog

router.post('/blogs/:_id/review',async(req,res)=>{

    if (!req.isAuthenticated()) {
        req.flash('error', 'You Need to login first');
        return res.redirect('/login');
    }


    const blog = await productModel.findById(req.params._id);

    const review = new Review({
        username:req.user.username,
        ...req.body
    });

    

    await review.save();

    const id = review._id;

    blog.reviews.push(id);

    await blog.save();

    req.flash('success','Successfully added your review');
    res.redirect(`/blogs/${req.params._id}`);




    

    
    
})

















module.exports = router;