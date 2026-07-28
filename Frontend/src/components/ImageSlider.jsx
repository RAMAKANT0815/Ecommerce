import React, { useState, useEffect } from "react";
import "../componentStyles/ImageSlider.css";

function ImageSlider() {
  const images = [
    "/image1.jpg",
    "/image2.jpg",
    "/image3.webp",
    "/image4.jpg",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="image-slider-container">
      <div
        className="slider-images"
        style={{ transform: `translateX(-${currentImage * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="slider-item">
            <img
              src={image}
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </div>

      <div className="slider-dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={index === currentImage ? "dot active" : "dot"}
            onClick={() => setCurrentImage(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default ImageSlider;