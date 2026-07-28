import React, { useEffect } from "react";
import "../AdminStyles/ProductsList.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminProducts } from "../features/admin/adminSlice";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import Footer from "../pages/Footer";
import { Delete, Edit } from "@mui/icons-material";
import { toast } from "react-toastify";
import { removeErrors } from "../features/admin/adminSlice";
import Loader from "../components/Loader";

function ProductList() {
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector(
    (state) => state.admin
  );

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 3000,
      });

      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : products?.length === 0 ? (
        <div className="no-admin-products">
          <h3>No Products Found</h3>
        </div>
      ) : (
        <>
          <Navbar />

          <PageTitle title="Admin Products List" />

          <div className="product-list-container">
            <h2 className="product-list-title">All Products</h2>

            <table className="product-table">
              <thead>
                <tr>
                  <th>Sl No</th>
                  <th>Product Image</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Ratings</th>
                  <th>Category</th>
                  <th>Stock</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product, index) => (
                  <tr key={product._id}>
                    <td>{index + 1}</td>

                    <td>
                      <img
                        src={product.images?.[0]?.url}
                        alt={product.name}
                        className="admin-product-image"
                      />
                    </td>

                    <td>{product.name}</td>

                    <td>₹ {product.price}</td>

                    <td>{product.ratings}</td>

                    <td>{product.category}</td>

                    <td>{product.stock}</td>

                    <td>
                      {new Date(product.createdAt).toLocaleDateString()}
                    </td>

                    <td>
                      <Link
                        to={`/admin/product/${product._id}`}
                        className="action-icon edit-icon"
                      >
                        <Edit />
                      </Link>

                      <Link
                        to={`/admin/product/${product._id}`}
                        className="action-icon delete-icon"
                      >
                        <Delete />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Footer />
        </>
      )}
    </>
  );
}

export default ProductList;