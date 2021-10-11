import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Table, Modal } from "react-bootstrap";
import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../actions/productActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";

import {
  PRODUCT_DELETE_RESET,
  PRODUCT_CREATE_RESET,
} from "../constants/productConstants";

function ProductListScreen({ history }) {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [deleteName, setDeleteName] = useState("");

  const handleClose = () => setShow(false);

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  let keyword = history.location.search;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo.isAdmin) {
      history.push("/login");
    }
    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts(keyword));
    }
  }, [
    dispatch,
    history,
    keyword,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
  ]);

  const modalHandler = (id, name) => {
    setShow(true);
    setDeleteId(id);
    setDeleteName(name);
  };

  const deleteHandler = (id) => {
    dispatch(deleteProduct(id));
    setShow(false);
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };
  return (
    <div>
      <Row className="mt-5">
        <Col>
          <h1>All Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="my-3" onClick={createProductHandler}>
            Create New Product
          </Button>
        </Col>
      </Row>

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}

      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>

              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant="light" size="sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>

                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => modalHandler(product._id, product.name)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Delete Product</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure you want to delete product:{" "}
                <strong>{deleteName}</strong>?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={() => deleteHandler(deleteId)}
                >
                  Confirm
                </Button>
              </Modal.Footer>
            </Modal>
          </tbody>
        </Table>
      )}
      <div className="d-flex justify-content-center mt-5">
        <Paginate page={page} pages={pages} isAdmin={true} />
      </div>
    </div>
  );
}

export default ProductListScreen;
