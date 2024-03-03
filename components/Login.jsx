'use client';
import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Log_Reg_Buy_Usuarios from '@/servicios/Log&Reg&Buy_Usuarios';
import Alert from 'react-bootstrap/Alert';


export function LoginModal({ isOpen, onClose, loguearse}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    
    const handleLogin = () => {
        if (email.trim() === '' || password.trim() === '') {
          setAlertMessage('Por favor, complete ambos campos.');
          setShowAlert(true);
          return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
          setAlertMessage('Ingrese un correo electrónico válido.');
          setShowAlert(true);
          return;
        }
        
        const usuario = {email, password};
        const verificacion = new Log_Reg_Buy_Usuarios();
        verificacion.loginClient(usuario).then(response => {
          console.log("Usuario logeado exitosamente");
          loguearse(response.data.client.nombre,usuario.email);
          setEmail('');
          setPassword('');
          onClose();
        }).catch(error => {
          console.log(error);
          setAlertMessage('Credenciales incorrectas');
          setShowAlert(true);
        })
    
    };
      
    const handleCloseModal = () => {
      onClose();
    };
      
    const handleEmailChange = (event) => {
       setEmail(event.target.value);
    };
      
    const handlePasswordChange = (event) => {
       setPassword(event.target.value);
    };
      
    return (
            <Modal show={isOpen} onHide={handleCloseModal}>
              <Modal.Header closeButton>
                <Modal.Title><p className="mod1">Iniciar sesión</p></Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
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
                <Button variant="primary" onClick={handleLogin}>
                  Iniciar sesión
                </Button>
              </Modal.Footer>
            </Modal>
        );
};
