import express from 'express'
import ads from './ads.mjs'
import products from './products.mjs'
import user from './user.mjs'


const router = express.Router()

router.use('/products', products)
router.use('/ads', ads)
router.use('/users',user)

export default router