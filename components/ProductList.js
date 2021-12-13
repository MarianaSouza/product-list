import Image from "next/image";
import styles from "../styles/ProductList.module.css";

const ProductList = ({ arr }) => {
  const formatDate = (d) => new Date(d).toLocaleDateString("en-US");
  return (
    <div className={styles.content}>
      <h1 className={styles.companyTitle}>Edvora</h1>
      <h2 className={styles.title}>Products</h2>
      {Object.keys(arr).map((brand, i) => (
        <div className={styles.productList} key={`${brand}_${i}`}>
          <h3 className={styles.productList__title}>{brand}</h3>
          <div className={styles.productList__wrapper}>
            {arr[brand].map((product, i) => (
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
                    <p className={styles.productList__content__upper__name}>
                      {product.product_name}
                    </p>
                    <p>{product.brand_name}</p>
                    <p className={styles.productList__content__upper__price}>
                      $ {product.price}
                    </p>
                  </div>
                </div>
                <div className={styles.productList__content__center}>
                  <div
                    className={styles.productList__content__center__location}
                  >
                    <p>
                      {product.address.city} / {product.address.state}
                    </p>
                  </div>
                  <div className={styles.productList__content__center__date}>
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
  );
};

export default ProductList;
