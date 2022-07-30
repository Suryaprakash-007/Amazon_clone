require('dotenv').config()

const express = require('express')
const app = require('../../app')
const router = require('express').Router();

const stripe = require('stripe')(process.env.STRIPE_KEY)

router.post('/stripe_checkout',async(req,res)=>{
    
    try{
        const session = await stripe.checkout.sessions.create({
            payment_method_types:['card'],
            line_items: req.body.cartList.map((i)=>{
                return{
                    price_data:{
                        currency:'usd',
                        product_data:{
                            name:i.name, 
                        },
                        unit_amount:i.price*100,
                    },
                    quantity:i.qty,
                }
            }),
            mode:'payment',
            success_url:'https://earmerce.web.app/checkout1',
            cancel_url:'https://earmerce.web.app/cart',
        })
        res.json({url: session.url, data:session})
    }
    catch(e){
        res.status(500).json({error:e.message})
    }
})
 


module.exports = router