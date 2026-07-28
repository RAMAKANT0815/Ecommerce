import React from 'react'
import "../componentStyles/Rating.css"
import { useState } from 'react'

function Reating({ value, onRatingChange, disabled }) {
  const [hoverRating, setHoverRating] = useState(0)
  const [selectedRating, setSelectedRating] = useState(value || 0);
  const handleMouseEnter = (rating) => {
    if (!disabled) {
      setHoverRating(rating);
    }
  };
  const handleMouseLeave = () => {
    if (!disabled) {
      setHoverRating(0);
    }
  };
  const handleRatingClick = (rating) => {
    if (!disabled) {
      setSelectedRating(rating);
      if(onRatingChange) {
        onRatingChange(rating);
      }
    }
  };
  //function to render stars based on the rating value
  const generateStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= (hoverRating || selectedRating);
      stars.push(
        <span
          key={i}
          className={`star ${isFilled ? 'filled' : ''}`}
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleRatingClick(i)}
          style={{pointerEvents: disabled ? 'none' : 'auto'}}
        >
          &#9733;
        </span>
      );
    }
    return stars;
  }
  return (
    <div>
      <div className="rating">
        {generateStars()}
      </div>
    </div>
  )
}

export default Reating
