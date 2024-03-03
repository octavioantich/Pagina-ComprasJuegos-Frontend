'use client';
import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Log_Reg_Buy_Usuarios from '@/servicios/Log&Reg&Buy_Usuarios';
import AuthCookieManager from '@/servicios/AuthCookieManager';
import Alert from 'react-bootstrap/Alert';

export function RegisterModal({ isOpen, onClose,loguearse }) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleRegister = () => {
    if (password !== confirmPassword) {
      setAlertMessage('Las contraseñas no coinciden.');
      setShowAlert(true);
      return;
    }
    
    if (email.trim() === '' || password.trim() === ''|| nombre.trim() === ''|| confirmPassword.trim() === '') {
      setAlertMessage('Por favor, complete todos los campos.');
      setShowAlert(true);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setAlertMessage('Ingrese un correo electrónico válido.');
      setShowAlert(true);
      return;
    }

    const usuario = { nombre, email, password };
    const verificacion = new Log_Reg_Buy_Usuarios();
    verificacion
      .registerClient(usuario)
      .then(() => {
        console.log('usuario registrado correctamente');
        loguearse(usuario.nombre,usuario.email)
      })
      .catch((error) => {
        console.log(error);
      });
    // Restablecer los campos y el error
    setEmail('');
    setPassword('');
    setConfirmPassword('');

    // Cerrar el modal
    onClose();
  };

  const handleNameChange = (event) => {
    setNombre(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleCloseModal = () => {
    // Cerrar el modal
    onClose();
  };

  return (
    <Modal show={isOpen} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title><p className="mod1">Registrarse</p></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formNombre">
            <Form.Label><p className="mod2">Nombre</p></Form.Label>
            <Form.Control
              type="nombre"
              placeholder="Ingrese su nombre"
              value={nombre}
              onChange={handleNameChange}
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label><p className="mod2">Email</p></Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingrese su email"
              value={email}
              onChange={handleEmailChange}
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label><p className="mod2">Contraseña</p></Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={handlePasswordChange}
            />
          </Form.Group>

          <Form.Group controlId="formConfirmPassword">
            <Form.Label><p className="mod2">Confirmar Contraseña</p></Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirme su contraseña"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </Form.Group>
        </Form>
        {showAlert && (
                  <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                    {alertMessage}
                  </Alert>
                )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleRegister}>
          Registrarse
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
