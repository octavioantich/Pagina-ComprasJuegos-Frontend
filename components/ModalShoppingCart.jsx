'use client';
import React, { useState } from 'react';
import { Button, Modal, Toast } from 'react-bootstrap'
import axios from 'axios';
import style from './ModalShoppingCart.module.css'
import { PaymentForm } from './MercadoPago';
import Log_Reg_Buy_Usuarios from '@/servicios/Log&Reg&Buy_Usuarios';
import baseUrl from './BaseUrl';
import { RegisterModal } from './Register';
import { LoginModal } from './Login'; 

export function ModelCompra( {cart, totalPrice, clearCart, isLoggedIn, nombre, mail, loguearse}) {
  const [show, setShow] = useState(false);
  const [compraRealizada, setCompraRealizada] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false); 

  const obtenerFechaActual = () => {
    const fechaActual = new Date();
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth() + 1;
    const anio = fechaActual.getFullYear();
  
    const fechaFormateada = `${anio}/${mes}/${dia}`;
  
    return fechaFormateada;
  };

  const handlePagar = () => {
    setShowPayment(true);
  }

  const handleLogin = () => {
    setLoginModalOpen(true);
  };

  const handleRegister = () => {
    setRegisterModalOpen(true);
  };

  const handleRegisterModalClose = () => {
    //setShow(false);
    setRegisterModalOpen(false);
  };

  const handleLoginModalClose = () => {
    //setShow(false)
    setLoginModalOpen(false);
  };

  const handleRealizarCompra = (pagoSuccess) => {
    if(pagoSuccess){
      const fecha_compra = obtenerFechaActual();
      const juegosComprados = cart.map((juego) => {
      const idJuego = juego.id;
      const precioDelMomento = juego.precio
      return { idJuego, precioDelMomento };
      });
      const compra = {fecha_compra, juegosComprados}
      const compraApi = new Log_Reg_Buy_Usuarios();
        compraApi.comprar(compra).then((response) => {
        console.log('Compra realizada:', response.data);
        setCompraRealizada(true);
        setShowPayment(false);
        clearCart();
        setTimeout(() => {
          setShow(false);
          setCompraRealizada(false); // Restablecer el estado después de un tiempo determinado
        }, 8000)
      }).catch((error) => {
        console.error('Error al realizar la compra:', error);
      });
    }else{
      setShowToast(true);
      setShowPayment(false);
      setTimeout(() => {
        setShowToast(false); // Restablecer el estado después de un tiempo determinado
      }, 8000)
    }
    
  };

  const hayJuegosCarrito = cart.length > 0;

  return (
    <>
        <Button variant="primary" disabled={!hayJuegosCarrito} onClick={() => setShow(hayJuegosCarrito)} className={style.buttonConfirmarCompra}>
            Confirmar Compra
        </Button>
        <Modal show = {show}
            onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title><p className="mod1">{isLoggedIn ? 'Confirmar compra' : 'Iniciar sesión / Registrarse'}</p></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {isLoggedIn ? (
              <div>
                <p className="mod3">Nombre: {nombre}</p>
                <p className="mod3">Email: {mail}</p>
                <h2>Datos de la Compra</h2>
                <p className="mod2">Precio a pagar {totalPrice}</p>

                <div className={style.centrador}>
                <button className={style.buttonVerificarUsuario} onClick={handlePagar}>Pagar</button>
                </div>
                  {showPayment && <PaymentForm totalPrice = {totalPrice} realizarCompra = {handleRealizarCompra}/>}
                  {compraRealizada && (
                    <Modal show={compraRealizada} onHide={() => {setCompraRealizada(false); setShow(false)}}>
                    <Modal.Header closeButton>
                      <Modal.Title><p className="mod1">Compra realizada con éxito</p></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <p className="mod2">Le agradecemos por seguir eligiendonos y lo esperamos para su proxima compra!!!</p>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={() => {setCompraRealizada(false); setShow(false)}}>
                        Cerrar
                      </Button>
                    </Modal.Footer>
                  </Modal>
                  
                  )}
                  {showToast && (
                    <Toast show={showToast} onClose={() => setShowToast(false)} className={style.toast} >
                      <Toast.Header>
                        <strong className="me-auto">Error</strong>
                      </Toast.Header>
                      <Toast.Body className={style.toastBody}>Hubo un error al realizar la compra, por favor inténtelo otra vez</Toast.Body>
                    </Toast>
                  )}
                  </div>
            ) : (
              <div className="button-container">
                <Button variant="primary" onClick={handleLogin}>
                  Iniciar sesión
                </Button>
                <Button variant="primary" onClick={handleRegister}>
                  Registrarse
                </Button>
              </div>
            )}
          </Modal.Body>
        </Modal>

        {registerModalOpen && (
          <RegisterModal
            isOpen={registerModalOpen}
            onClose={handleRegisterModalClose}
            loguearse={loguearse} 
          />
        )}

        {loginModalOpen && (
          <LoginModal
            isOpen={loginModalOpen}
            onClose={handleLoginModalClose}
            loguearse={loguearse} 
          />
        )}
    </>
  );
}

