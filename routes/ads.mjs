import express from 'express'
const router = express.Router()

import Ads from '../models/ads.mjs'
import verifyToken from '../middlewares/verifyToken.mjs'


router.get('/', async (req, res) => {
    const ads = await Ads.find()
    res.send({ message: 'Ads fetched successfully', data: ads })
})

// router.get('/:id')

//POST: localhost:3001/ads/post
router.post('/post', verifyToken , async (req, res) => {
    try {
        const ad = new Ads(req.body)
        await ad.save()

        res.send({ message: 'Ad posted successfully' })
    } catch (e) {
        res.send({ message: e.message })
    }
})

//router.put('/:id')

router.put('/:id' , async (req , res) => {
    try {
        const updatedAd = await Ads.findOneAndUpdate(
            { _id: req.params.id },req.body, 
            { new: true } // To return the updated document
        );
        res.send({ message: 'Ad updated successfully', updatedAd });
    } catch (e) {
        res.send({ message: 'Error updating ad', error: e.message });
    }
})

//router.delete('/:id')



// fetch('http://localhost:3001/ads/post',{
// method: "POST",
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//         title: 'Iphone',
//         amount: '85000',
//         description: 'ABCD',
//     })
// })
// .then(res => res.json())
// .then(res => console.log(res))

export default router