'use client';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';
import style from './ModalJuegos.module.css';

export function ModalJuego({ juego, imagen, cart, addToCart }) {
  const [show, setShow] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [addToCartClicked, setAddToCartClicked] = useState(false);

  const handleAddToCart = () => {
    const juegoExistente = cart.find((item) => item.id === juego.id);
    if (!juegoExistente) {
      addToCart(juego);
      setAddedToCart(true);
    } else {
      setAddedToCart(false);
    }
    setAddToCartClicked(true); // Actualizar el estado después de hacer clic en "Agregar al Carrito"
  };

  const handleCloseAlert = () => {
    setAddedToCart(false);
    setAddToCartClicked(false);
  };

  useEffect(() => {
    if (addedToCart || addToCartClicked) {
      const timeout = setTimeout(() => {
        setAddedToCart(false);
        setAddToCartClicked(false);
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [addedToCart,addToCartClicked]);

  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)} className={style.buttom}>
        Mas Detalles
      </Button>

      <Modal
        show={show}
        onHide={() => {setShow(false); setAddedToCart(false); setAddToCartClicked(false)}}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          {juego && (
            <Modal.Title>
              <p className="mod1">{juego.titulo}</p>
            </Modal.Title>
          )}
        </Modal.Header>
        {juego && (
          <Modal.Body>
            <img className="ajustada" src={imagen} alt="imagen" />
            <p className="mod2">Descripcion</p>
            <p className="mod3">{juego.descripcion}</p>
            <p className="mod2">Categorias</p>
            <ListGroup>
              {juego.categorias.map((categoria) => (
                <ListGroup.Item key={categoria.id}>{categoria.nombre}</ListGroup.Item>
              ))}
            </ListGroup>
            <p className="mod2">Desarrollador</p>
            <p className="mod3" key={juego.desarrollador.id}>
              {juego.desarrollador.nombre}
            </p>
            <p className="mod2">Precio</p>
            <p className="mod3">$ {juego.precio}</p>
          </Modal.Body>
        )}
        {addToCartClicked && addedToCart && (
          <Alert variant="success" onClose={handleCloseAlert} dismissible>
            Agregado al carrito correctamente.
          </Alert>
        )}
        {addToCartClicked && !addedToCart && (
          <Alert variant="danger" onClose={handleCloseAlert} dismissible>
            Este articulo ya se encuentra en el carrito.
          </Alert>
        )}
        <Button className={style.buttom} onClick={handleAddToCart}>
          Agregar al Carrito
        </Button>
      </Modal>
    </>
  );
}
