import React, { useState, useEffect } from "react";

import { Form, Button, Tab, Row, Col, ListGroup, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

import { updateUserProfile, logout } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";

function AccountScreen({ history }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { success } = userUpdate;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (success) {
        setSuccessMessage("User Updated");
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
      }
      dispatch(listMyOrders());
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [dispatch, history, userInfo, success]);

  const logoutHandler = () => {
    dispatch(logout());
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        updateUserProfile({
          id: userInfo._id,
          name: name,
          email: email,
          password: password,
        })
      );
      setMessage("");
    }
  };
  return (
    <div className="mt-5">
      <h1>My Account</h1>
      <hr />
      <Tab.Container
        id="accountTabs"
        defaultActiveKey="#accountDetails"
        className="mt-3"
      >
        <Row>
          <Col sm={4}>
            <ListGroup>
              <ListGroup.Item action href="#accountDetails">
                Account Details
              </ListGroup.Item>
              <ListGroup.Item action href="#updateAccount">
                Update Account
              </ListGroup.Item>
              <ListGroup.Item action href="#myOrders">
                Orders
              </ListGroup.Item>
              <ListGroup.Item action href="#logout">
                Logout
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col sm={8}>
            <Tab.Content>
              <Tab.Pane eventKey="#accountDetails">
                <h3 className="text-center mb-3">Account Details</h3>
                <h5>Hello {name},</h5>
                <p>
                  Welcome to our store! In this page, you can view your account
                  details, update your information, and view your order history.
                </p>

                <h5 className="mb-3">Account Information</h5>

                <p className="text-primary">Username: {name}</p>
                <p className="text-primary">Email: {email}</p>
              </Tab.Pane>

              <Tab.Pane eventKey="#updateAccount">
                {successMessage && (
                  <Message variant="success">{successMessage}</Message>
                )}
                {message && <Message variant="danger">{message}</Message>}
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader />}
                <h3 className="text-center mb-3">Update Account</h3>
                <Form onSubmit={submitHandler}>
                  <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      required
                      type="name"
                      placeholder="Enter name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      required
                      type="email"
                      placeholder="Enter Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="passwordConfirm">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </Form.Group>

                  <Button type="submit" variant="outline-primary">
                    Update
                  </Button>
                </Form>
              </Tab.Pane>
              <Tab.Pane eventKey="#myOrders">
                {loadingOrders ? (
                  <Loader />
                ) : errorOrders ? (
                  <Message variant="danger">{errorOrders}</Message>
                ) : (
                  <Table responsive hover className="table-sm">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Paid</th>
                        <th>Delivered</th>
                        <th>Total</th>
                        <th></th>
                      </tr>
                    </thead>

                    <tbody>
                      {orders.map((order) => (
                        <tr key={order._id}>
                          <td>#{order._id}</td>
                          <td>{order.createdAt.substring(0, 10)}</td>
                          <td>
                            {order.isPaid ? (
                              <i
                                className="fas fa-check"
                                style={{ color: "green" }}
                              ></i>
                            ) : (
                              <i
                                className="fas fa-times"
                                style={{ color: "red" }}
                              ></i>
                            )}
                          </td>
                          <td className="ms-2">
                            {order.isDelivered ? (
                              <i
                                className="fas fa-check"
                                style={{ color: "green" }}
                              ></i>
                            ) : (
                              <i
                                className="fas fa-times"
                                style={{ color: "red" }}
                              ></i>
                            )}
                          </td>
                          <td>${order.totalPrice}</td>
                          <td>
                            <LinkContainer to={`/order/${order._id}`}>
                              <Button variant="outline-primary" size="sm">
                                Details
                              </Button>
                            </LinkContainer>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </Tab.Pane>
              <Tab.Pane eventKey="#logout">
                <Button variant="outline-primary" onClick={logoutHandler}>
                  Logout
                </Button>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}

export default AccountScreen;
