import React, { useEffect, useState } from "react";
// import { productsService } from "./service";
import { ProductProps, ProductsProps } from "./types";
import {
  Backdrop,
  CircularProgress,
  Paper,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import ProductReviews from "./ProductReviews";
import { productsService } from "./service";
import useSWR from "swr";

/**
 * A Products table that shows the products details and an action to view the reviews
 * @returns {Component} - A Table contains the information about the products
 */
const Products = () => {
  const [filter, setFilter] = useState({ limit: 10, skip: 0, page: 0 });
  const { data: productsData, isLoading } = useSWR(
    filter, // SWR key is just the filter (or null if you prefer)
    () => productsService({ params: filter }),
    { keepPreviousData: true } // Fetcher function returning the promise
  );

  const { products, total = 0 } = (productsData || {}) as ProductsProps;

  const handleChangePage = (event: React.MouseEvent | null, page: number) => {
    setFilter({ ...filter, page, skip: page * filter.limit });
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilter({ ...filter, limit: +event.target.value, skip: 0 });
  };

  return (
    <ProductsTable
      isLoading={isLoading}
      products={products}
      filter={filter}
      total={total}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      handleChangePage={handleChangePage}
    />
  );
};

export const ProductsTable = ({
  isLoading,
  products,
  filter,
  total,
  handleChangeRowsPerPage,
  handleChangePage,
}: {
  isLoading: boolean;
  products: ProductProps[];
  filter: { limit: number; skip: number; page: number };
  total: number;
  handleChangePage: (event: React.MouseEvent | null, page: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 850 }} aria-label="Products Table" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Product Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Rating</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading && (
            <TableRow sx={{ height: "79vh" }}>
              <TableCell colSpan={6} align="center">
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={isLoading}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
              </TableCell>
            </TableRow>
          )}
          {products?.map((product: ProductProps) => (
            <TableRow
              key={product.id} // Ensure that `product.id` is unique.
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {product.title}
              </TableCell>
              <TableCell width={400}>{product.description}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>
                <Rating name="read-only" value={product.rating} readOnly />
              </TableCell>
              <TableCell width={150} align="left">
                <ProductReviews productId={product.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        page={filter.page}
        rowsPerPage={filter.limit}
        count={total}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default Products;
