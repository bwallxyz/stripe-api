import React from 'react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'


const PaymentForm = () => {

    const elements = useElements()
    const stripe = useStripe()
   

    const handleSubmit =  async (e) => {
        e.preventDefault()

        if (!stripe || !elements) {
            return
        }

        console.log('Getting clientSecret')
        const {clientSecret} = await fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                paymentMethodType: 'card',
                currency: 'usd',
            }),
        }).then(r => r.json())

        console.log('clientSecret received: confirming PaymentIntent')

        //Confirm the PaymentIntent
        const {paymentIntent} = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            }
        })

        console.log(paymentIntent.status)
        
        const cardElement = elements.getElement(CardElement)
        console.log('card', cardElement)
        console.log('stripe', stripe)
    }


    return (
        <>
            <form id="payment-form" onSubmit={handleSubmit}>
                <CardElement />
                <button>PAY</button>
            </form>
        </>
  )
}

export default PaymentForm