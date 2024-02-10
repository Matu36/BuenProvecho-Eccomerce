import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import pizza from "../img/pizza.png";
import lasagna from "../img/lasagna.png";
import mariscos from "../img/mariscos.png";
import ravioles from "../img/ravioles.png";
import meat from "../img/meat.png";
import tallarines from "../img/tallarines.png";

export default function SliderCarrousel() {
  const settings = {
    dots: true,
    infinite: true, // Cambiado a true para permitir el bucle infinito
    arrows: true,
    speed: 500,
    slidesToShow: 3, // Cambiado a 3 para mostrar 3 elementos a la vez
    slidesToScroll: 1, // Cambiado a 1 para desplazar un elemento a la vez
    initialSlide: 0,
    autoplay: true, // Habilita el autoplay
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings} className="custom-slider">
      <div className="slider-item">
        <img src={pizza} alt="pizza" />
      </div>
      <div className="slider-item">
        <img src={lasagna} alt="lasagna" />
      </div>
      <div className="slider-item">
        <img src={mariscos} alt="mariscos" />
      </div>
      <div className="slider-item">
        <img src={ravioles} alt="ravioles" />
      </div>
      <div className="slider-item">
        <img src={meat} alt="meat" />
      </div>
      <div className="slider-item">
        <img src={tallarines} alt="tallarines" />
      </div>
    </Slider>
  );
}
