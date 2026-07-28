import React, { useState } from "react";
import "../AdminStyles/CreateProduct.css";
import Navbar from "../components/Navbar";
import Footer from "../pages/Footer";
import PageTitle from "../components/PageTitle";

function CreateProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");

  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Electronics",
    "Fashion",
    "Books",
    "Sports",
    "Home",
    "Beauty",
    "Accessories",
  ];

  const productSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set('name', name);
    myForm.set("description", description);
    myForm.set("price", price);
    myForm.set("category", category);
    myForm.set("stock", stock);

    images.forEach((image) => {
        myForm.append("images", image);
    });
  };

  const productImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <Navbar />

      <PageTitle title="Create Product" />

      <div className="create-product-container">
        <h2 className="form-title">Create Product</h2>

        <form
          className="product-form"
          onSubmit={productSubmitHandler}
          encType="multipart/form-data"
        >
          <input
            type="text"
            placeholder="Product Name"
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
             name="name"
          />

          <textarea
            placeholder="Product Description"
            className="form-input"
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
             name="description"
          ></textarea>

          <input
            type="number"
            placeholder="Price"
            className="form-input"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
             name="price"
          />

          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            name="category"
          >
            <option value="">Choose Category</option>

            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Stock"
            className="form-input"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
           
          />

          <div className="file-input-container">
            <input
              type="file"
              multiple
              accept="image/*"
              className="form-input-file"
              onChange={productImagesChange}
              name="image"
            />

            <div className="image-preview-container">
              {imagesPreview.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt="Preview"
                  className="image-preview"
                />
              ))}
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Create Product
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
}

export default CreateProduct;