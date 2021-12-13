import Head from "next/head";

const Header = () => {
  return (
    <Head>
      <title>Edvora Product List</title>
      <meta name="description" content="Product list assessment" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" /> 
      <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
    </Head>
  );
};

export default Header;
