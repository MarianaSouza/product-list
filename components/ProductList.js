import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../styles/ProductList.module.css";
import Slider from "react-slick";

const useDeviceSize = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    // component is mounted and window is available
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    // unsubscribe from the event on component unmount
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return [width, height];
};

const ProductList = ({ arr }) => {
  const [width] = useDeviceSize();

  const settings = {
    width,
    height: 500,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  const formatDate = (d) => new Date(d).toLocaleDateString("en-US");
  
  return (
    <div className={styles.content}>
      <h1 className={styles.companyTitle}>Edvora</h1>
      <h2 className={styles.title}>Products</h2>
      {Object.keys(arr).map((brand, i) => (
        <div className={styles.productList} key={`${brand}_${i}`}>
          <h3 className={styles.productList__title}>{brand}</h3>
          <div className={styles.productList__wrapper}>
            <Slider {...settings}>
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
            </Slider>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
