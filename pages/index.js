import { useState } from "react";
import styles from "../styles/Home.module.css";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ProductList from "../components/ProductList";
import { groupBy } from "../helpers/groupBy";

export const getStaticProps = async () => {
  const res = await fetch("https://assessment-edvora.herokuapp.com/");
  const data = await res.json();
  return {
    props: {
      products: data,
    },
  };
};

export default function Home({ products }) {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  let filteredProducts = selectedProduct
    ? products.filter((p) => p.product_name === selectedProduct)
    : products;

  filteredProducts = selectedState
    ? filteredProducts.filter((p) => p.address.state === selectedState)
    : filteredProducts;

  filteredProducts = selectedCity
    ? filteredProducts.filter((p) => p.address.city === selectedCity)
    : filteredProducts;

  const uniqueBrandName = groupBy(filteredProducts, "brand_name");
  const uniqueProducts = groupBy(filteredProducts, "product_name");
  const uniqueStates = groupBy(filteredProducts, "address", "state");
  const uniqueCities = groupBy(filteredProducts, "address", "city");

  const handleProductFilterChange = (e) => {
    const selected = e.target.value;
    setSelectedProduct(selected);
  };

  const handleStateFilterChange = (e) => {
    const selected = e.target.value;
    setSelectedState(selected);
  };

  const handleCityStateFilterChange = (e) => {
    const selected = e.target.value;
    setSelectedCity(selected);
  };

  return (
    <div>
      <Header />
      <main className={styles.main}>
        <Sidebar
          selectedProduct={selectedProduct}
          handleProductFilterChange={handleProductFilterChange}
          uniqueProducts={uniqueProducts}
          selectedState={selectedState}
          handleStateFilterChange={handleStateFilterChange}
          uniqueStates={uniqueStates}
          selectedCity={selectedCity}
          handleCityStateFilterChange={handleCityStateFilterChange}
          uniqueCities={uniqueCities}
        />
        <ProductList arr={uniqueBrandName} />
      </main>
    </div>
  );
}
