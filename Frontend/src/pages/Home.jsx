import React, { useEffect } from 'react';
import Footer from './Footer';
import Navbar from '../components/Navbar';
import '../pageStyles/Home.css';
import ImageSlider from '../components/ImageSlider';
import Product from '../components/Product';
import Loader from '../components/Loader';
import PageTitle from '../components/PageTitle';
import { useSelector, useDispatch } from 'react-redux';
import { getProduct, removeErrors } from '../features/products/productSlice';
import { toast } from 'react-toastify';

function Home() {
  const { loading, error, products } = useSelector(
    (state) => state.product
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct({ keyword: "" }));
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 3000,
      });

      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <PageTitle title="Home-My Website" />
          <Navbar />
          <ImageSlider />

          <div className="home-container">
            <h2 className="home-heading">Home</h2>

            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>

          <Footer />
        </>
      )}
    </>
  );
}

export default Home;