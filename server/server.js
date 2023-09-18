const express = require('express')
const { default: Stripe } = require('stripe')
const stripe = require('stripe')('sk_test_51NqSkUL2h9FIwLwwtFCFqji2OdRre0Eaqzvabh2cfm3dk5HV8xh6TJiN2dw6OfsCH16ZKZ3ZyXIUY4TwcuXr5IIR00tW4snsUg')
require('dotenv').config()

const PORT = process.env.PORT || 3030
const app = express()

app.use(express.json())

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`)
})

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.post('/api/create-payment-intent', async (req, res) => {
    const {paymentMethodType, currency} = req.body

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 1999,
            currency: currency,
            payment_method_types: [paymentMethodType]
        })

        res.json({ clientSecret: paymentIntent.client_secret})

    } catch(e) {
        res.status(400).json({error: {message: e.message}})
    }
})

app.post('/webhook', async (req, res) => {


    const sig = req.headers["stripe-signature"]

    let event

   try {
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret)
    } catch (err) {
        console.log(`ERROR: ${err.message}`)
        return res.status(400).send(`Webhook Eror: ${err.message}`)
    }

})

app.get('/api/config', async (req, res) => {
    res.json({publishableKey: process.env.STRIPE_PUBLISHABLE_KEY})
})