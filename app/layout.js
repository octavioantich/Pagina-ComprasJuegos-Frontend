'use client';
import '../styles/globals.css'
import { useState } from 'react'
import { Header } from "../components/Header"
import HomePage from './page';

export default function RootLayout() {

  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [nombre, setNombre] = useState('');
  const [mail, setMail] = useState('');

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (juegoId) => {
    const updatedCart = cart.filter((juego) => juego.id !== juegoId);
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const loguearse = (nombre,mail) => {
    setIsLoggedIn(true);
    setNombre(nombre)
    setMail(mail)
  };

  const desloguearse = () => {
    setIsLoggedIn(false);
  };

  return(
    <html>
      <head>
        <title>Taco Gaming</title>
      </head>
      <body className = 'backgroundPage'>
        <Header cart = {cart} removeFromCart={removeFromCart} clearCart={clearCart} isLoggedIn={isLoggedIn} nombre={nombre} mail={mail} loguearse={loguearse} desloguearse={desloguearse}/>
        <HomePage cart = {cart} addToCart={addToCart} />
      </body>
    </html>
  )
}
