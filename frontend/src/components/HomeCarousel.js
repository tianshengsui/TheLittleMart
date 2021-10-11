import React from "react";
import { Carousel } from "react-bootstrap";

function HomeCarousel() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.unsplash.com/photo-1485134532658-d720895a3b5e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80"
          alt="First slide"
        />
        <Carousel.Caption>
          <h1>Welcome to The Little Mart</h1>
          <h5>Enjoy free shipping on orders over $40</h5>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default HomeCarousel;
