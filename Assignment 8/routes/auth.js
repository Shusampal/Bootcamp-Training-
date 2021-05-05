const express = require('express');

const router = express.Router();



// Requiring the passport and passport-local in our router application

const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/user');





router.use(passport.initialize());
router.use(passport.session());



// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Routes
router.get('/register', async (req, res) => {
    try{

        res.render('signup');
    }
    catch(e)
    {
        res.send(e.message);
    }

})

router.post('/register', async (req, res) => {

    try {
        const user = new User({ username: req.body.username, email: req.body.email});

        const ruser = await User.register(user, req.body.password);

        req.flash('success','Registered successfully');
        res.redirect('/blogs');
    }catch(e) {
        req.flash('error',e.message);
        res.redirect('/register');
    }

})


// Login Routes

router.get('/login',  (req, res) => {

    try {

         res.render('login');
    }
    catch (e) {
        res.send(e.message);
    }

})


router.post('/login', 
    passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: true
    }),(req,res)=>{
        req.flash('success', `Welcome ${req.user.username.toUpperCase()}`);
        res.redirect('/blogs');
})



// Logout Route

router.get('/logout', async (req, res) => {

    try {

        req.logOut();
        req.flash('success','Logged Out Successfully');
        res.redirect('/login');
    }
    catch (e) {
        res.send(e.message);
    }

})

module.exports = router;







