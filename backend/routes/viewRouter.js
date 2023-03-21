import {static as eStatic, Router} from "express";
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js';

const router = Router();

function render(file) {
    return function(req, res) {
        res.render(file);
    }
}

router.use(eStatic('public'));

router.get("/login", render('login'));
router.get("/register", render('register'));
router.get("/dashboard", render('dashboard'));
router.get("/record", render('record'));
router.get("/watch", render('watch'));

// @desc    Register a new user
// @route   POST /app/users
// @access  Public
router.post('/register', async (req, res) => {  
    const { username, email, password } = req.body
  
    const userExists = await User.findOne({ email })
  
    if (userExists) {
      res.status(400)
      throw new Error('User already exists')
    }else{
    const user = await User.create({
      username,
      email,
      password,
    })
    if (user) {
      res.redirect('/app/login')
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }}
  })
 ///

  router.post('/login', asyncHandler(async (req, res,) => {  
    const { email, password } = req.body
  
    const user = await User.findOne({ email })
  
    if (user && (await user.matchPassword(password))) {
      res.status(200).redirect('/app/dashboard')
    } else {
      res.status(401)
      throw new Error('Invalid email or password')
    }
    authUser.save()
  }))
  

  

export default router;