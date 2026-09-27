import React, { useState } from 'react';
import "../pageStyles/ProductDetails.css";
import Navbar from '../components/Navbar';
import Footer from './Footer';
import PageTitle from '../components/PageTitle';
import Rating from '../components/Rating';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getProductDetails, removeErrors } from '../features/products/productSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { addItemsToCart } from '../features/cart/cartSlice';

function ProductDetails() {
  const [rating, setRating] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };
  const { loading, error, product }= useSelector((state) => state.product);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if(id){
      dispatch(getProductDetails(id));
    }
    return () => {
      dispatch(removeErrors());
    }
  }, [dispatch, id]);

  useEffect(() => {
      if (error) {
        toast.error(error.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
        dispatch(removeErrors());
      }
    }, [dispatch, error]);
    if(loading){
      return(
        <>
          <Navbar />
          <Loader />
          <Footer />
        </>
      )
    }
    if(!product){
      return(
        <>
          <PageTitle title="Product Details" />
          <Navbar />
          <div className="product-details-container">
            <h2>Product not found</h2>
          </div>
          <Footer />
        </>
      )
    }
    const decreaseQuantity = () => {
      if(product.stock <= 1){
        toast.error("can not decrease beyond 1", {position: 'top-center', autoClose: 3000})
        dispatch(removeErrors());
        return ;
      }
      setQuantity(qty => qty-1);
    }

    const increaseQuantity = () => {
      if(product.stock <= quantity){
        toast.error("can not exceed beyond stock", {position: 'top-center', autoClose: 3000})
        dispatch(removeErrors());
        return ;
      }
      setQuantity(qty => qty+1);
      
    }

    const addToCart = () => {
      dispatch(addItemsToCart({id, quantity}))
    }
  return (
    <>
      <PageTitle title={`${product.name} - Details`} />
      <Navbar />

      <div className="product-details-container">
        <div className="product-detail-container">
          <img src={product?.image?.[0]?.url?.replace("./", "/")} alt={product.name} className="product-detail-image" />

          <div className="product-info">
            <h2 className="product-title">{product.name}</h2>
            <p className="product-description">{product.description}</p>
            <p className="product-price">${product.price}</p>

            <div className="product-rating">
              <Rating value={product.ratings} disabled={true} />
              <span className="productCardSpan">({product.numOfReviews} {product.numOfReviews === 1 ? 'Review' : 'Reviews'})</span>
            </div>

            <div className="stock-status">
              <span className={product.stock > 0 ? "in-stock" : "out-of-stock"}>
                {product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}
              </span>
            </div>

            {
              product.stock > 0 && (
              <>
                <div className="quantity-controls">
                  <span className="quantity-label">
                    Quantity:
                  </span>

                  <button className="quantity-button" onClick={decreaseQuantity}>-</button>

                  <input
                    type="text"
                    value={quantity}
                    className="quantity-input"
                    readOnly
                  />

                  <button className="quantity-button" onClick={increaseQuantity}>+</button>
                </div>

                <button className="add-to-cart-btn" onClick={addToCart}>
                  Add to Cart
                </button>
              </>
            )}

            <form className="review-form">
              <h3>Write a Review</h3>

              <Rating
                value={rating}
                disabled={false}
                onRatingChange={handleRatingChange}
              />

              <textarea
                placeholder="Your review..."
                className="review-input"
              />

              <button
                type="submit"
                className="submit-review-btn"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>

        <div className="reviews-container">
          <h3>Customer Reviews</h3>
 
          {
            product.reviews && product.reviews.length === 0 ? (
              <p>No reviews yet.</p>
            ) : (
            <div className="reviews-section">
              {
                product.reviews.map((review, index) => (
                  <div className="review-item" key={index}>
                    <div className="review-header">
                      <Rating value={review.ratings} disabled={true} />
                    </div>

                    <p className="review-comment">
                      {review.comment}
                    </p>

                    <p className="review-name">By:{review.name}</p>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ProductDetails;