import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
function Product({ product }) {
  return (
    <div>
      <Card className="my-3 border-0">
        <Link to={`/products/${product._id}`}>
          <Card.Img variant="top" src={product.image} />
        </Link>

        <Card.Body className="p-0 mt-3">
          <Card.Title as="p" className="mb-0">
            <strong>{product.name}</strong>
          </Card.Title>
          <Card.Text as="div">
            <Rating
              value={product.rating}
              text={`${product.numReviews}`}
              color={"#212529"}
            />
          </Card.Text>
          <Card.Text>${product.price}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Product;
