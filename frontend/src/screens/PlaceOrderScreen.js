import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row, Col, ListGroup, Image } from "react-bootstrap";
import Message from "../components/Message";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";

function PlaceOrderScreen({ history }) {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, error, success } = orderCreate;

  const cart = useSelector((state) => state.cart);

  cart.itemsPrice = cart.cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);

  cart.shippingPrice = (cart.itemsPrice > 40 ? 0 : 10).toFixed(2);

  cart.taxPrice = Number(0.12 * cart.itemsPrice).toFixed(2);

  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  if (!cart.paymentMethod) {
    history.push("/payment");
  }

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, success, history, order]);

  const placeOrder = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <div>
      <Row className="mt-5">
        <Col md={7}>
          <h2>Order Items</h2>

          {cart.cartItems.length === 0 ? (
            <h5>Your cart is empty</h5>
          ) : (
            <ListGroup variant="flush">
              {cart.cartItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} fluid rounded />
                    </Col>
                    <Col md={6}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link> *{" "}
                      {item.qty}
                    </Col>
                    <Col md={4}>${(item.qty * item.price).toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>

        <Col md={5}>
          <ListGroup>
            <ListGroup.Item>
              <Row>
                <Col md={4}>
                  <p className="text-muted">Contact</p>
                </Col>
                <Col md={8}>{userInfo.email}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col md={4}>
                  <p className="text-muted">Ship to</p>
                </Col>
                <Col md={8}>
                  {cart.shippingAddress.address}, {cart.shippingAddress.city}
                  {"  "}
                  {cart.shippingAddress.postalCode},{"  "}
                  {cart.shippingAddress.country}
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col md={4}>
                  <p className="text-muted">Payment</p>
                </Col>
                <Col md={8}>{cart.paymentMethod}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <h3 className="text-center">Order Summary</h3>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items: </Col>
                    <Col>${cart.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Shipping: </Col>
                    <Col>${cart.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Tax: </Col>
                    <Col>${cart.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Total: </Col>
                    <Col>${cart.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>

              {error && <Message variant="danger">{error}</Message>}

              <div className="d-grid gap-2">
                <Button
                  type="button"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrder}
                >
                  Place Order
                </Button>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
}

export default PlaceOrderScreen;
