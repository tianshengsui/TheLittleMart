import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Container, Button, Row, Col } from "react-bootstrap";
import { saveShippingAddress } from "../actions/cartActions";

function ShippingScreen({ history }) {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push("/payment");
  };
  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <h1 className="text-center mt-3">Shipping Address </h1>
          <hr />
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter address"
                value={address ? address : ""}
                onChange={(e) => setAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter city"
                value={city ? city : ""}
                onChange={(e) => setCity(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="postalCode">
              <Form.Label>Post Code</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter postal code"
                value={postalCode ? postalCode : ""}
                onChange={(e) => setPostalCode(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter country"
                value={country ? country : ""}
                onChange={(e) => setCountry(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Select Payment
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ShippingScreen;
