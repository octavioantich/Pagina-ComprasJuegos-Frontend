import React, { useState, useEffect  } from 'react'
import { Button, Offcanvas, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faTrash } from '@fortawesome/free-solid-svg-icons'
import { ModelCompra } from './ModalShoppingCart'
import style from './ShoppingCart.module.css'

export default function CarritoDeCompras({ cart, removeFromCart, clearCart, isLoggedIn, nombre, mail, loguearse }){

    const [show, setShow] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const hayJuegosCarrito = cart.length > 0;

    const handleClearCart = () => {
        clearCart();
      };

    useEffect(() => {
        const calcularPrecioTotal = () => {
          let total = 0;
          for (const producto of cart) {
            total += parseFloat(producto.precio);
          }
          total = total.toFixed(2);
          return total;
        };
    
        setTotalPrice(calcularPrecioTotal());
      }, [cart]);

    return(
        <>  <div  >
            <Button variant="light" size="lg" onClick={handleShow} >
                <FontAwesomeIcon icon={faShoppingCart}/>
            </Button>
            </div>
            <Offcanvas placement='end' show={show} onHide={handleClose} className={style.cart}>
                <Offcanvas.Header closeButton>
                <Offcanvas.Title  className={style.cartTitle}>Juegos en Carrito</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
     
                    <Table striped borderless hover responsive>
                        <thead>
                        <tr className={style.div}>
                            <th>Titulo</th>
                            <th>Precio</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {cart.map(juego => (
                            <tr key={juego.id}>
                                <td>{juego.titulo}</td>
                                <td>{juego.precio}</td>
                                <td>
                                    <Button variant="danger" size="sm" onClick={() => removeFromCart(juego.id)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Offcanvas.Body>
                <div className={style.div}>
                    <p className={style.totalPrice}> Precio Total: {totalPrice} </p>
                </div>
                <Table className={style.table} striped borderless hover responsive>
                    <ModelCompra cart={cart} totalPrice={totalPrice} clearCart={clearCart} isLoggedIn={isLoggedIn} nombre={nombre} mail={mail} loguearse={loguearse}/>
                    <Button variant="danger" disabled={!hayJuegosCarrito} onClick={handleClearCart}>Clear All</Button>
                </Table>
            </Offcanvas>
        </>
    );
}