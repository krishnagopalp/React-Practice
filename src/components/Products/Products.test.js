import { render } from "@testing-library/react";
import { ProductsTable } from "./Products";
import useSWR from "swr";

jest.mock("swr");

describe("ProductsTable", () => {
  it("should", () => {
    const mockProductsData = {
      products: [
        {
          id: 1,
          title: "Product 1",
          description: "Description for Product 1",
          category: "Category 1",
          price: 100,
          rating: 4.5,
        },
        {
          id: 2,
          title: "Product 2",
          description: "Description for Product 2",
          category: "Category 2",
          price: 200,
          rating: 3.5,
        },
      ],
      total: 2,
    };

    useSWR.mockImplementation(() => ({ data: mockProductsData }));
    console.log(render(<ProductsTable />));
  });
});
