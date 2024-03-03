import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { RegisterModal } from './Register';
import { LoginModal } from './Login'; 
import {SeccionJuegos} from '../components/SeccionJuegos';
import {SeccionComprasRealizadas} from './SeccionComprasRealizadas';

export function PerfilModal(props) {
  const [showModal, setShowModal] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false); 
  const [comprasModalOpen, setComprasModalOpen] = useState(false);
  const { isLoggedIn, nombre, mail,loguearse,desloguearse } = props;

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleLogout = () => {
    desloguearse()
  };

  const handleLogin = () => {
    setLoginModalOpen(true);
  };

  const handleRegister = () => {
    setRegisterModalOpen(true);
  };

  const handleCompras = () => {
    setComprasModalOpen(true);
  };

  const handleComprasModalClose = () => {
    setComprasModalOpen(false);
  };

  const handleRegisterModalClose = () => {
    handleCloseModal();
    setRegisterModalOpen(false);
  };

  const handleLoginModalClose = () => {
    handleCloseModal()
    setLoginModalOpen(false);
  };

  return (
    <div>
      <Button variant="link" onClick={handleShowModal} className="button-link btn-sm">
      <p className="link">{isLoggedIn ? nombre : 'Perfil'}</p>
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title><p className="mod1">{isLoggedIn ? 'Perfil' : 'Iniciar sesión / Registrarse'}</p></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLoggedIn ? (
            <div>
              <p className="mod3">Nombre: {nombre}</p>
              <p className="mod3">Email: {mail}</p>
              <div>
                <Button onClick={handleCompras}>
                  Ver compras realizadas
                </Button>
              </div>
              <div className="button-spacing">
                <Button variant="primary" onClick={handleLogout}>
                  Cerrar sesión
                </Button>
              </div>
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
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
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

      {comprasModalOpen && (
        <SeccionComprasRealizadas
          isOpen={comprasModalOpen}
          onClose={handleComprasModalClose}
        />
      )}
    </div>
  );
}
