// En Header.js
import React, { useState,useEffect } from 'react';
import styles from './Header.module.css';
import CarritoDeCompras from './ShoppingCart';
import { PerfilModal } from './Perfil';

const links = [
  {
    label: 'Home',
    route: '#home',
  },
  {
    label: 'Juegos',
    route: '#juegos',
  },
];

export function Header({ cart, removeFromCart, clearCart,isLoggedIn,nombre,mail,loguearse,desloguearse}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setScrolled(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <nav>
        <ul className={styles.navigation}>
          {links.map(({ label, route }) => (
            <li key={label}>
              <a className={styles.link} href={route}>{label}</a>
            </li>
          ))}
          <li>
            <PerfilModal isLoggedIn={isLoggedIn} nombre={nombre} mail={mail} loguearse={loguearse} desloguearse={desloguearse}/>
          </li>
          <li className={styles.posCarrito}>
            <CarritoDeCompras cart={cart} removeFromCart={removeFromCart} clearCart={clearCart} isLoggedIn={isLoggedIn} nombre={nombre} mail={mail} loguearse={loguearse}/>
          </li>
        </ul>
      </nav>
    </header>
  );
}
