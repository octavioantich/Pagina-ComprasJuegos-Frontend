import React, { useState, useEffect } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import Log_Reg_Buy_Usuarios from '@/servicios/Log&Reg&Buy_Usuarios';
import AuthCookieManager from '@/servicios/AuthCookieManager';

export function SeccionComprasRealizadas({ isOpen, onClose }) {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comprasCargadas, setComprasCargadas] = useState(false);

  const handleCloseModal = () => {
    onClose();
  };

  const fetchPurchases = async () => {
    try {
      const verificacion = new Log_Reg_Buy_Usuarios();
      verificacion.comprasCliente()
        .then((response) => {
          setPurchases(response.data);
          setLoading(false);
          setComprasCargadas(true);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 422) {
            const cookieManager = new AuthCookieManager();
            cookieManager.deleteAuthCookie();
            setShowLoginModal(true);
          }
        });
    } catch (error) {
      console.error('Error fetching purchases:', error);
    }
  };

  useEffect(() => {
    if (isOpen && !comprasCargadas) {
      fetchPurchases();
    }
  }, [isOpen, comprasCargadas]);

  return (
    <Modal show={isOpen} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title><p className="mod1">Compras realizadas</p></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading && <div className="mod2">Cargando compras...</div>}

        {!loading && purchases.length === 0 && <div className='mod2'>No se encontraron compras.</div>}

        {!loading && purchases.length > 0 && (
          <div>
            {purchases.map((purchase) => (
              <div key={purchase.id}>
                <h3 className='mod2'>Compra ID: {purchase.id}</h3>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Imagen</th>
                      <th>Juego</th>
                      <th>Fecha de compra</th>
                      <th>Precio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchase.juegos_comprados.map((juego) => (
                      <tr key={juego.id}>
                        <td ><img className='ajustadaMini' src={juego.imagenUrl} alt={juego.titulo}/></td>
                        <td>{juego.titulo}</td>
                        <td>{purchase.fecha_compra}</td>
                        <td>{juego.precio}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            ))}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
