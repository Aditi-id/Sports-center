import React from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './app/layout/index.css'
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router/Routes.tsx';
import { Provider } from 'react-redux';
import { store } from './app/store/configureStore.ts';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_PLACEHOLDER');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Elements stripe={stripePromise}>
        <RouterProvider router={router}/>
      </Elements>
    </Provider>    
  </React.StrictMode>,
)
