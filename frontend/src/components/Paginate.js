import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function Paginate({ pages, page, keyword = "", isAdmin = false }) {
  if (keyword) {
    keyword = keyword.split("?keyword=")[1].split("&")[0];
  }
  return (
    pages > 1 && (
      <Pagination>
        <LinkContainer
          to={
            !isAdmin
              ? `/?keyword=${keyword}&page=1`
              : `/admin/products/?keyword=${keyword}&page=1`
          }
        >
          <Pagination.First />
        </LinkContainer>

        <LinkContainer
          to={
            !isAdmin
              ? `/?keyword=${keyword}&page=${page === 1 ? 1 : page - 1}`
              : `/admin/products/?keyword=${keyword}&page=${
                  page === 1 ? 1 : page - 1
                }`
          }
        >
          <Pagination.Prev />
        </LinkContainer>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              !isAdmin
                ? `/?keyword=${keyword}&page=${x + 1}`
                : `/admin/products/?keyword=${keyword}&page=${x + 1}`
            }
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
        <LinkContainer
          to={
            !isAdmin
              ? `/?keyword=${keyword}&page=${page === pages ? pages : page + 1}`
              : `/admin/products/?keyword=${keyword}&page=${
                  page === pages ? pages : page + 1
                }`
          }
        >
          <Pagination.Next />
        </LinkContainer>
        <LinkContainer
          to={
            !isAdmin
              ? `/?keyword=${keyword}&page=${pages}`
              : `/admin/products/?keyword=${keyword}&page=${pages}`
          }
        >
          <Pagination.Last />
        </LinkContainer>
      </Pagination>
    )
  );
}

export default Paginate;
