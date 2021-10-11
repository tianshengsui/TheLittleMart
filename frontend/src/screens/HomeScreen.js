import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";

import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import HomeCarousel from "../components/HomeCarousel";

function HomeScreen({ history }) {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { error, loading, products, page, pages } = productList;

  let keyword = history.location.search;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <div>
      <div className="full-width-div mb-5">
        <HomeCarousel />
      </div>

      <h2 className="text-center">All Products</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={4} lg={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
      <div className="d-flex justify-content-center mt-5">
        <Paginate page={page} pages={pages} keyword={keyword} />
      </div>
    </div>
  );
}

export default HomeScreen;
