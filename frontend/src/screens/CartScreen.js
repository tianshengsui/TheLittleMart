import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Form, Button, Card } from "react-bootstrap";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/cartActions";

function CartScreen({ match, location, history }) {
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };
  return (
    <Row className="mt-5">
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message variant="info">
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={4}>
                    <Card.Img src={item.image} className="fluid rounded" />
                  </Col>
                  <Col md={8}>
                    <Card.Body>
                      <Card.Title as="h4">{item.name}</Card.Title>
                      <Card.Title as="h4">${item.price}</Card.Title>
                      <Row>
                        <Col xs="auto" className="d-flex">
                          Quantity:
                          <Form.Control
                            as="select"
                            value={item.qty}
                            onChange={(e) => {
                              dispatch(
                                addToCart(item.product, Number(e.target.value))
                              );
                              history.push("/cart");
                            }}
                            className="px-1 py-0 ms-2"
                          >
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                        <Col md={1}>
                          <Button
                            type="button"
                            variant="link"
                            className="btn btn-link p-0"
                            onClick={() => removeFromCartHandler(item.product)}
                          >
                            Remove
                          </Button>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>

      <Col md={4}>
        <Row>
          <h1>Order Summary</h1>
          <hr />
        </Row>
        <Row as="h5">
          <Col md={8}>Subtotal</Col>
          <Col md={4}>
            $
            {cartItems
              .reduce((acc, item) => acc + item.qty * item.price, 0)
              .toFixed(2)}
          </Col>
        </Row>

        <Row>
          <Col md={8}>SHIPPING</Col>
          <Col md={4}>TBD</Col>
        </Row>

        <Row className="my-2">
          <Col md={8}>TAX</Col>
          <Col md={4}>TBD</Col>
        </Row>

        <Row as="h5">
          <Col md={8}>Estimated Total</Col>
          <Col md={4}>
            $
            {cartItems
              .reduce((acc, item) => acc + item.qty * item.price, 0)
              .toFixed(2)}
          </Col>
        </Row>
        <Row>
          <Button
            type="button"
            disabled={cartItems.length === 0}
            onClick={checkoutHandler}
            className="mt-3 p-2"
          >
            PROCEED TO CHECKOUT
          </Button>
        </Row>
      </Col>
    </Row>
  );
}

export default CartScreen;
