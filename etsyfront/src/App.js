import React from 'react';
import './App.css';
import {
  BrowserRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Account from './pages/Account';
import ShopLanding from './pages/ShopLanding';
import ShopHome from './pages/ShopHome';
import VisitShop from './pages/VisitShop';
import ProfileUpdate from './pages/ProfileUpdate';
import ShopCreate from './pages/ShopCreate';
import ProductPage from './pages/ProductPage';
import Purchases from './pages/Purchases';
import Cart from './pages/Cart';

function App() {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
          <Route path="/account" element={<Account />} />
          <Route path="/shop" element={<ShopLanding />} />
          <Route path="/shop/:id" element={<VisitShop />} />
          <Route path="/shophome" element={<ShopHome />} />
          <Route path="/shopnew/:name" element={<ShopCreate />} />
          <Route path="/profileUpdate" element={<ProfileUpdate />} />
          <Route path="/productPage/:productId" element={<ProductPage />} />
          <Route path="/purchases" element={<Purchases />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
