import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  Button,
  Form,
  ListGroup,
  Collapse,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Message from "../components/Message";
import Loader from "../components/Loader";

import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

function ProductScreen({ match, history }) {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingProductReview,
    error: errorProductReview,
    success: successProductReview,
  } = productReviewCreate;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });

    if (successProductReview) {
      setRating(0);
      setComment("");
      setOpen(false);
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match, successProductReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(match.params.id, { rating, comment }));
  };
  return (
    <div>
      <Link to="/" className="btn btn-link my-3 ps-0">
        <u>Go Back</u>
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Row>
            <Col md={6} className="h-100">
              <Image src={product.image} alt={product.name} fluid />
            </Col>

            <Col md={6}>
              <div className="vstack gap-1">
                <h3>{product.name}</h3>
                <h3>${product.price}</h3>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                  color={"#212529"}
                />
                <h6 className="mt-2 mb-0">Description: </h6>
                <p>
                  <small>{product.description}</small>
                </p>

                <Row className="mb-2">
                  <Col xs="auto" className="d-flex">
                    Quantity:
                    <Form.Control
                      as="select"
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      className="px-1 py-0 ms-2"
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>

                  <Col>
                    <small className="text-danger">
                      {product.countInStock} in stock
                    </small>
                  </Col>
                </Row>

                <div className="d-grid gap-2">
                  <Button
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    {product.countInStock === 0
                      ? "Out of Stock"
                      : "Add to Cart"}
                  </Button>
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <h4 className="mt-5 text-center">Reviews</h4>

              {product.reviews && product.reviews.length === 0 && (
                <Message variant="info">Be the first to review</Message>
              )}
              {loadingProductReview && <Loader />}
              {successProductReview && (
                <Message variant="success">Review Submitted</Message>
              )}
              {errorProductReview && (
                <Message variant="danger">{errorProductReview}</Message>
              )}
              {userInfo ? (
                <div class="text-center">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => setOpen(!open)}
                    aria-controls="review-form"
                    aria-expanded={open}
                    className="my-3"
                  >
                    Write a Review
                  </Button>
                  <Collapse in={open}>
                    <div id="review-form" className="text-start">
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId="rating">
                          <Form.Label className="mt-3">Rating</Form.Label>
                          <Form.Control
                            required
                            as="select"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option value="">Select...</option>
                            <option value="1">1 - Poor</option>
                            <option value="2">2 - Fair</option>
                            <option value="3">3 - Good</option>
                            <option value="4">4 - Very Good</option>
                            <option value="5">5 - Excellent</option>
                          </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="comment">
                          <Form.Label className="mt-3">Review</Form.Label>
                          <Form.Control
                            required
                            as="textarea"
                            rows={5}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></Form.Control>
                        </Form.Group>

                        <Button
                          disabled={loadingProductReview}
                          size="sm"
                          type="submit"
                          variant="primary"
                          className="my-3"
                        >
                          Submit
                        </Button>
                      </Form>
                    </div>
                  </Collapse>
                </div>
              ) : (
                <Message variant="info">
                  Please <Link to="/login">Login</Link> to write a review
                </Message>
              )}
              <ListGroup variant="flush">
                {product.reviews &&
                  product.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <Row>
                        <Col>
                          <p className="lead mb-0">{review.name}</p>
                          <Rating value={review.rating} color="#212529" />
                        </Col>
                        <Col>
                          <p className="text-end text-muted">
                            {review.createdAt.substring(0, 10)}
                          </p>
                        </Col>
                      </Row>
                      <p className="mt-3">{review.comment}</p>
                    </ListGroup.Item>
                  ))}
              </ListGroup>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default ProductScreen;
