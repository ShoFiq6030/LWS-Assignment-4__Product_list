import { useContext } from "react";
import Product from "./Product";
import { ProductsContext } from "../context/productsContext";

function Products() {
  const { sortedProducts, searchTerm } = useContext(ProductsContext);

  const filteredProducts = searchTerm
    ? sortedProducts.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : sortedProducts;

  return filteredProducts.map((item) => <Product key={item.id} item={item} />);
}

export default Products;
