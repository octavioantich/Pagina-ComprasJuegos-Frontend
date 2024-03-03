import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pagination, Accordion, Button } from 'react-bootstrap';
import { JuegosCard } from '@/components/JuegosCard';
import  {BaseUrl} from '../components/BaseUrl';

export function SeccionJuegos({ cart, addToCart }) {
  const [juegos, setJuegos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 18;
  const [categorias, setCategorias] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchJuegos();
    fetchCategorias();
  }, []);

  const fetchJuegos = async () => {
    try {
      const END_POINT = '/juegos';
      const response = await axios.get(BaseUrl+END_POINT);
      setJuegos(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategorias = async () => {
    try {
      const END_POINT = '/categorias';
      const response = await axios.get(BaseUrl+END_POINT);
      setCategorias(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const handleCategoryChange = event => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedCategories(prevCategories => [...prevCategories, value]);
    } else {
      setSelectedCategories(prevCategories => prevCategories.filter(category => category !== value));
    }
  };

  const handleMinPriceChange = event => {
  const inputValue = event.target.value;
  const minValue = inputValue !== '' && !isNaN(inputValue) ? Math.max(0, parseInt(inputValue)) : '';
  setMinPrice(minValue);
};

const handleMaxPriceChange = event => {
  const inputValue = event.target.value;
  const maxValue = inputValue !== '' && !isNaN(inputValue) ? Math.max(0, parseInt(inputValue)) : '';
  setMaxPrice(maxValue);
};

const handleSearchChange = event => {
  setSearchTerm(event.target.value);
};

  const handleReset = () => {
    setSelectedCategories([]);
    setMinPrice('');
    setMaxPrice('');
    
  };

  const handleBorrar = () => {
    setSearchTerm('');
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filteredJuegos = selectedCategories.length > 0
    ? juegos.filter(juego => juego.categorias.some(category => selectedCategories.includes(category.nombre)))
    : juegos;

  const filteredJuegosByPrice = filtroJuegosPrecio();

  function filtroJuegosPrecio() {
    let filteredJuegosPrecio = [];
  
    if (minPrice !== '' && maxPrice !== '') {
      filteredJuegosPrecio = filteredJuegos.filter(juego => {
        const juegoPrice = parseFloat(juego.precio);
        return juegoPrice >= parseFloat(minPrice) && juegoPrice <= parseFloat(maxPrice);
      });
    } else if (minPrice === '' && maxPrice !== '') {
      filteredJuegosPrecio = filteredJuegos.filter(juego => {
        const juegoPrice = parseFloat(juego.precio);
        return juegoPrice >= 0 && juegoPrice <= parseFloat(maxPrice);
      });
    } else if (minPrice !== '' && maxPrice === '') {
      filteredJuegosPrecio = filteredJuegos.filter(juego => {
        const juegoPrice = parseFloat(juego.precio);
        return juegoPrice >= parseFloat(minPrice) && juegoPrice <= 1000000;
      });
    } else {
      filteredJuegosPrecio = filteredJuegos;
    }
  
    return filteredJuegosPrecio;
  }
  
  const filteredJuegosByTitle = searchTerm !== ''
  ? filteredJuegosByPrice.filter(juego => {
      return juego.titulo?.toLowerCase().includes(searchTerm.toLowerCase());
    })
  : filteredJuegosByPrice;

  return (
    <div>
      <div className="titu">Catalogo de juegos</div>

      {isLoading ? (
        <div className="cargando">
          <img src="https://media.tenor.com/_lYxgg0ycEAAAAAi/happy-taco.gif" alt="Cargando..." />
          <p>Cargando...</p>
        </div>
      ) : (
        <>
          <Accordion defaultActiveKey="0">
            <Accordion.Header>Filtros</Accordion.Header>
            <Accordion.Body className="accordion-body">
              <div className="espacioFiltros">
                <p className="cate1">Filtrar por categorías</p>
                {categorias.map(categoria => (
                  <label key={categoria.id} className="cate2">
                    <input
                      type="checkbox"
                      value={categoria.nombre}
                      checked={selectedCategories.includes(categoria.nombre)}
                      onChange={handleCategoryChange}
                    />
                    {categoria.nombre}
                  </label>
                ))}
              </div>
              <div>
                <p className="cate1">Filtrar por precio</p>
                <div>
                  <label className="cate2">Precio mínimo:</label>
                  <input type="number" value={minPrice} onChange={handleMinPriceChange} />
                </div>
                <div className="espacioFiltros">
                  <label className="cate2">Precio máximo:</label>
                  <input type="number" value={maxPrice} onChange={handleMaxPriceChange} />
                </div>
                <div>
                  <Button variant="primary" className="btn-sm btn-success" onClick={handleReset}>
                    Restablecer
                  </Button>
                </div>
              </div>
            </Accordion.Body>
          </Accordion>
          <div className="espacioFiltros">
            <p className="cate1">Buscar por nombre de juego</p>
            <input type="text" value={searchTerm} onChange={handleSearchChange} />
          </div>
          <div>
              <Button variant="primary" className="btn-sm btn-success" onClick={handleBorrar}>
                Borrar
            </Button>
          </div>
          <JuegosCard juegos={filteredJuegosByTitle} startIndex={startIndex} endIndex={endIndex} cart={cart} addToCart={addToCart} />
          <Pagination>
            <Pagination.First onClick={() => handlePageChange(1)} />
            <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} />
            {currentPage > 3 && (
              <>
                <Pagination.Item onClick={() => handlePageChange(1)}>{1}</Pagination.Item>
                <Pagination.Ellipsis />
              </>
            )}
            {currentPage > 2 && <Pagination.Item onClick={() => handlePageChange(currentPage - 2)}>{currentPage - 2}</Pagination.Item>}
            {currentPage > 1 && <Pagination.Item onClick={() => handlePageChange(currentPage - 1)}>{currentPage - 1}</Pagination.Item>}
            <Pagination.Item active>{currentPage}</Pagination.Item>
            {currentPage < Math.ceil(filteredJuegosByPrice.length / itemsPerPage) && (
              <Pagination.Item onClick={() => handlePageChange(currentPage + 1)}>{currentPage + 1}</Pagination.Item>
            )}
            {currentPage < Math.ceil(filteredJuegosByPrice.length / itemsPerPage) - 1 && (
              <Pagination.Item onClick={() => handlePageChange(currentPage + 2)}>{currentPage + 2}</Pagination.Item>
            )}
            {currentPage < Math.ceil(filteredJuegosByPrice.length / itemsPerPage) - 2 && (
              <>
                <Pagination.Ellipsis />
                <Pagination.Item onClick={() => handlePageChange(Math.ceil(filteredJuegosByPrice.length / itemsPerPage))}>
                  {Math.ceil(filteredJuegosByPrice.length / itemsPerPage)}
                </Pagination.Item>
              </>
            )}
            <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} />
            <Pagination.Last onClick={() => handlePageChange(Math.ceil(filteredJuegosByPrice.length / itemsPerPage))} />
          </Pagination>
        </>
      )}
    </div>
  );
}
