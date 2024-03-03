'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {CarouselHome} from '../components/CarouselHome';
import {SeccionJuegos} from '../components/SeccionJuegos';
import 'bootstrap/dist/css/bootstrap.min.css';
import  {BaseUrl} from '../components/BaseUrl';

export default function HomePage({cart, addToCart}) {
  const [juegos, setJuegos] = useState([]);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const END_POINT = '/juegos?_limit=3&_sort=createdAt:DESC';
      const response = await axios.get(BaseUrl+END_POINT);
      const data = response.data;
      setJuegos(data.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <div id="home" className = "home">
        <div className = "titu"> Juegos Destacados del dia de hoy </div>
        <CarouselHome juego1={juegos[0]} juego2={juegos[1]} juego3={juegos[2]} />
      </div>
      <div id="juegos" className = "juegos">
        <SeccionJuegos cart={cart} addToCart={addToCart} />
      </div>
      
    </main>
  );
}

