import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Home.module.css";

export const getStaticProps = async () => {
  const res = await fetch("https://assessment-edvora.herokuapp.com/");
  const data = await res.json();
  return {
    props: {
      products: data,
    },
  };
};

// Takes an array of objects and the property by which they should be grouped.
// Produces an object of arrays keyed by the specified property values.
//
// Provide multiple keys if your data is nested:   groupBy(dogs, 'values', 'emoji')
//
// Ex: [{id: 1, group: 'A'}, {id: 2, group: 'B'}, {id: 3, group: 'A'}],   'group'
//     =>
//     {A: [{id: 1, group: 'A'}, {id: 3, group: 'A'}], B: [{id: 2, group: 'B'}]}
const groupBy = (data, ...keys) => {
  // Ex: {values: {color: 'red'}}, ['values', 'color'] => 'red'
  const getGroupFromItem = (item, keys) => {
    return keys.length > 1
      ? getGroupFromItem(item[keys[0]], keys.slice(1))
      : item[keys[0]];
  };

  return data.reduce(
    (results, item) => {
      // Get the first instance of the key by which we're grouping
      var group = getGroupFromItem(item, keys);

      // Ensure that there's an array to hold our results for this group
      results[group] = results[group] || [];

      // Add this item to the appropriate group within results
      results[group].push(item);

      // Return the updated results object to be passed into next reduce call
      return results;
    },

    // Initial value of the results object
    {}
  );
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
  }

  const formatDate = d => new Date(d).toLocaleDateString("en-US");
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Edvora Product List</title>
        <meta name="description" content="Product List practice" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.sidebar}>
          <p className={styles.sidebar__title}>Filters</p>
          <div className={styles.sidebar__selects}>
            <select
              name="products"
              id="products"
              value={selectedProduct}
              onChange={handleProductFilterChange}
            >
              <option value="">All Products</option>
              {Object.keys(uniqueProducts).map((product, i) => (
                <option key={i} value={product}>
                  {product}
                </option>
              ))}
            </select>
            <select
              name="state"
              id="state"
              value={selectedState}
              onChange={handleStateFilterChange}
            >
              <option value="">All States</option>
              {Object.keys(uniqueStates).map((state, i) => (
                <option key={i} value={state}>
                  {state}
                </option>
              ))}
            </select>
            <select name="city" id="city" value={selectedCity} onChange={handleCityStateFilterChange}>
              <option value="">All Cities</option>
              {Object.keys(uniqueCities).map((city, i) => (
                <option key={i} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.content}>
          <h1 className={styles.companyTitle}>Edvora</h1>
          <h2 className={styles.title}>Products</h2>
            {Object.keys(uniqueBrandName).map((brand, i) => (
              <div className={styles.productList} key={`${brand}_${i}`}>
                <h3 className={styles.productList__title}>{brand}</h3>
                <div className={styles.productList__wrapper}>
                  {uniqueBrandName[brand].map((product, i) => (
                    <div
                      className={styles.productList__content}
                      key={`${product.product_name}_${i}`}
                    >
                      <div className={styles.productList__content__upper}>
                        <div>
                          <Image
                            src={product.image}
                            alt={product.product_name}
                            width={70}
                            height={70}
                          />
                        </div>
                        <div>
                          <p
                            className={styles.productList__content__upper__name}
                          >
                            {product.product_name}
                          </p>
                          <p>{product.brand_name}</p>
                          <p
                            className={
                              styles.productList__content__upper__price
                            }
                          >
                            $ {product.price}
                          </p>
                        </div>
                      </div>
                      <div className={styles.productList__content__center}>
                        <div
                          className={
                            styles.productList__content__center__location
                          }
                        >
                          <p>
                            {product.address.city} / {product.address.state}
                          </p>
                        </div>
                        <div
                          className={styles.productList__content__center__date}
                        >
                          <p>Date: {formatDate(product.date)}</p>
                        </div>
                      </div>
                      <div className={styles.productList__content__bottom}>
                        <p>{product.discription}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          
        </div>
      </main>
    </div>
  );
}
