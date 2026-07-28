import React from 'react'
import "../conmponentStyles/NoProducts.css"

function NoProducts({keyword}) {
  return (
    <div className="no-product-content">
        <div className="no-products-icon">⚠️</div>
        <h3 className="no-products-title">No products found</h3>
        <p className="no-products-message">{keyword?`We couldn't find any products matching "${keyword}"` : "We couldn't find any products"}</p>
    </div>
  )
}

export default NoProducts
