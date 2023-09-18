import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'

(async () => {
  const {publishableKey} = await fetch('/api/config').then(r => r.json())
  const stripePromise = loadStripe(publishableKey)

  console.log(publishableKey)


  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <Elements stripe={stripePromise}>
         <App />
      </Elements>
    </React.StrictMode>
    );
})()


