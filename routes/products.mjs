import express from 'express'
import Ads from '../models/ads.mjs'
const router = express.Router()

const data = [{ "id": 1, "title": "iPhone 9", "description": "An apple mobile which is nothing like apple", "price": 549, "discountPercentage": 12.96, "rating": 4.69, "stock": 94, "brand": "Apple", "category": "smartphones", "thumbnail": "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg", "images": ["https://cdn.dummyjson.com/product-images/1/1.jpg", "https://cdn.dummyjson.com/product-images/1/2.jpg", "https://cdn.dummyjson.com/product-images/1/3.jpg", "https://cdn.dummyjson.com/product-images/1/4.jpg", "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg"] }]

//products
router.get('/', async (req, res) => {
    res.send({ message: 'Products fetched successfully', data})
})

//products/single
router.get('/single', (req, res) => {
    res.send({ message: 'Single Product fetched successfully', data })
})

//products/post 
router.post('/post', async (req, res) => {
    try {
        const ad = new Ads(req.body)
        await ad.save()

        res.send({ message: 'Ad posted successfully' })
    } catch (e) {
        res.send({ message: e.message })
    }
})

// router.get('/', async (req, res) => {
//     const ads = await Ads.find()
//     res.send({ message: 'Ads fetched successfully', data: ads })
// })

export default router