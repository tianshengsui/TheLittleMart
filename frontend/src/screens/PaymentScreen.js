import React, { useState } from "react";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";

function PaymentScreen({ history }) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();

  const [paymentMethod, setPaymentMethod] = useState("");

  if (!shippingAddress.address) {
    history.push("/shipping");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };
  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <h1 className="text-center mt-3">Payment Options </h1>
          <hr />
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label>Select Method</Form.Label>
              <Col>
                <Form.Check
                  type="radio"
                  label="PayPal or Credit Card"
                  id="paypal"
                  name="paymentMethod"
                  onChange={(e) => setPaymentMethod("PayPal")}
                ></Form.Check>
              </Col>
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-3">
              Continue
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default PaymentScreen;
