'use client';
import React from 'react';
import { Carousel, Card } from 'react-bootstrap';
import LinesEllipsis from 'react-lines-ellipsis';
import style from './Carousel.module.css';

function CustomIndicators({ activeIndex, items, onSelect }) {
  return (
    <ol className={style.customIndicators}>
      {items.map((item, index) => (
        <li
          key={index}
          className={index === activeIndex ? style.active : ''}
          onClick={() => onSelect(index)}
        />
      ))}
    </ol>
  );
}

export function CarouselHome({ juego1, juego2, juego3 }) {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  return (
    <div className={style.container}>
      <Carousel
        activeIndex={activeIndex}
        onSelect={handleSelect}
        indicators={false}
        nextIcon={<span className={style.carouselNextIcon}>&gt;</span>}
        prevIcon={<span className={style.carouselPrevIcon}>&lt;</span>}
      >
        <Carousel.Item interval={4000}>
          <div className="row">
            <div className="col">
              <img
                className={`d-block ${style.imgMaxSize}`}
                src={juego1 && juego1.imagenUrl}
                alt="First slide"
              />
            </div>
            <div className="col-5">
              <div className={style.carGrande}>
                {juego1 && (
                  <Card className={style.carta}>
                    <div className={style['carta-container']}>
                      <Card.Body>
                        <Card.Title>{juego1.titulo}</Card.Title>
                        <Card.Text>{juego1.descripcion}</Card.Text>
                      </Card.Body>
                      <Card.Footer className={style.cardPrice}>
                        $ {juego1.precio}
                      </Card.Footer>
                    </div>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item interval={4000}>
          <div className="row">
            <div className="col">
              <img
                className={`d-block ${style.imgMaxSize}`}
                src={juego2 && juego2.imagenUrl}
                alt="Second slide"
              />
            </div>
            <div className="col-5">
              <div>
                {juego2 && (
                  <Card className={style.carta}>
                    <div className={style['carta-container']}>
                      <Card.Body>
                        <Card.Title>{juego2.titulo}</Card.Title>
                        <Card.Text>{juego2.descripcion}</Card.Text>
                      </Card.Body>
                      <Card.Footer className={style.cardPrice}>
                        $ {juego2.precio}
                      </Card.Footer>
                    </div>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item interval={4000}>
          <div className="row">
            <div className="col">
              <img
                className={`d-block ${style.imgMaxSize}`}
                src={juego3 && juego3.imagenUrl}
                alt="Third slide"
              />
            </div>
            <div className="col-5">
              <div>
                {juego3 && (
                  <Card className={style.carta}>
                    <div className={style['carta-container']}>
                      <Card.Body>
                        <Card.Title>{juego3.titulo}</Card.Title>
                        <Card.Text>{juego3.descripcion}</Card.Text>
                      </Card.Body>
                      <Card.Footer className={style.cardPrice}>
                        $ {juego3.precio}
                      </Card.Footer>
                    </div>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </Carousel.Item>
      </Carousel>
      <CustomIndicators
        activeIndex={activeIndex}
        items={[juego1, juego2, juego3]}
        onSelect={handleSelect}
      />
    </div>
  );
}
