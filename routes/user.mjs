import express from "express";
const router = express.Router()

import User from "../models/user.mjs";
import verifyToken from "../middlewares/verifyToken.mjs";

//GET: '/'
router.get('/', async (req, res) => {
    const user = await User.find()
    res.send({ message: 'Data Fetch Successfully', data: user })
})

// router.get('/:id', async (req, res) => {
//     const user = await User.findOne({ _id: req.params.id })
//     res.send({ message: 'Data Fetch Successfully', req })
// })
//POST: http://localhost:3001/user/register

router.post('/register', async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        res.send({ message: 'Register Successfully' })
    } catch (e) {
        res.send({ message: e.message })
    }
})

// router.put('/:id', async (req, res) => {
//     try {
//         const updatedAd = await Ads.findOneAndUpdate(
//             { _id: req.params.id },req.body, 
//             { new: true } // To return the updated document
//         );
//         res.send({ message: 'Register Successfully' },updatedAd)
//     } catch (e) {
//         res.send({ message: e.message })
//     }
// })


//PUT: http://localhost:3001/user/login
router.put('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        //Step No 1: Check User Email Is Correct
        const user = await User.findOne({ email })

        if (!user) {
            res.send({ message: 'Email not found!' })
            return
        }

        //Step No 2: Campare both passwords
        const isCorrectPassword = user.comparePassword(password)
        if (!isCorrectPassword) {
            res.send({ message: 'invalid password' })
            return
        }
        //Step No 3: Generate Token
        const token = user.generateToken()
        user.tokens.push(token)
        await user.save()

        res.send({ message: 'User Login Successfull' , token})
    }
    catch (e) {
        res.send({ message: e.message })
    }
})

router.put('/logout', verifyToken, async(req , res) => {
    await User.findByIdAndUpdate(req.userId, { $pull: { tokens: req.tokenToRemove } })
    res.send({ message: 'Logged out successfully!' })
})



// fetch('http://localhost:4001/users/register' , {
//     method: "POST",
//     headers: {
//     "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//         email: "saad@gmail.com",
//         password: "123456",
//         fullname: "Saad Ahmed"
//     })
// })
// .then(res => res.json())
// .then(res => console.log(res))

export default router
