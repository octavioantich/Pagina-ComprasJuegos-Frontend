'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Card } from 'react-bootstrap';
import { ModalJuego } from './ModalJuegos.jsx';
import style from './CardJuegos.module.css';


export function JuegosCard({juegos, startIndex, endIndex, cart, addToCart}) {
    
      const juegosPaginados = juegos.slice(startIndex, endIndex);
      
      return (
        <div>
          <Row className={style.row}>
            {juegosPaginados.map(juego => (
              <Col md={4} key={juego.id}>
              <div className={style.container}>
                <Card className={style.card}>
                  <Card.Img variant="top" src={juego.imagenUrl} className={style.imagenCard} />
                  <Card.Body>
                    <Card.Title>{juego.titulo}</Card.Title>
                    <Card.Text className={style.price}>$ {juego.precio}</Card.Text>
                    <Card.Text className={style.textCard}>{juego.descripcion}</Card.Text>
                  </Card.Body>
                  <div className={style.buttonContainer}>
                    <ModalJuego juego={juego} imagen={juego.imagenUrl} cart={cart} addToCart={addToCart} />
                  </div>
                </Card>
              </div>
            </Col>
            ))}
          </Row>
        </div>
      );
}
