import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function SearchBox() {
  const [keyword, setKeyword] = useState("");

  let history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      history.push(`/?keyword=${keyword}&page=1`);
    } else {
      history.push(history.location.pathname);
    }
  };
  return (
    <Form
      className="d-flex"
      onSubmit={submitHandler}
      style={{ width: "200px" }}
    >
      <Form.Control
        size="sm"
        type="text"
        placeholder="Search..."
        onChange={(e) => setKeyword(e.target.value)}
        className="px-1 py-1 me-1"
      />
      <Button
        type="submit"
        variant="outline-success"
        size="sm"
        className="px-1 py-1"
      >
        Search
      </Button>
    </Form>
  );
}

export default SearchBox;
