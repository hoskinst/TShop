import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';
import '../src/assets/styles/bootstrap.min.css';
import '../src/assets/styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

// Screen imports
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
// Custom component imports
import PrivateRoute from './components/PrivateRoute';
import ProfileScreen from './screens/ProfileScreen';

const router = createBrowserRouter(
  createRoutesFromElements(
  <Route path="/" element={<App />}>
     <Route index={true} path="/" element={<HomeScreen />} />
     <Route index={true} path="/product/:id" element={<ProductScreen />} />
     <Route index={true} path='/cart' element={<CartScreen />} />
     <Route index={true} path='/login' element={<LoginScreen />} />
     <Route index={true} path='/register' element={<RegisterScreen />} />

     <Route path='' element={<PrivateRoute />}>
       <Route index={true} path='/shipping' element={<ShippingScreen />} />
       <Route index={true} path='/payment' element={<PaymentScreen />} />
       <Route index={true} path='/placeOrder' element={<PlaceOrderScreen />} />
       <Route index={true} path='/order/:id' element={<OrderScreen />} />
       <Route index={true} path='/profile' element={<ProfileScreen />} />
      </Route>
  </Route>
))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
