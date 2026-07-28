import React from 'react'
import '../componentStyles/Footer.css'
import { Phone, Email,  Facebook, Instagram, GitHub, Twitter} from '@mui/icons-material'


function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/*section 1*/}
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p><Phone/>Phone: (123) 456-7890</p>
          <p><Email />Email: info@myecommerce.com</p>
        </div>
        {/*section 2*/}
        <div className="footer-section social">
          <h3>Follow Us</h3>
          <div>
            <a href="" target="_blank" rel="noopener noreferrer">
                <GitHub className='social-icon'/>
            </a>
            <a href="" target="_blank" rel="noopener noreferrer">
              <Facebook className='social-icon'/>
            </a>
            <a href="" target="_blank" rel="noopener noreferrer">
              <Twitter className='social-icon'/>
            </a>
            <a href="" target="_blank" rel="noopener noreferrer">
              <Instagram className='social-icon'/>
            </a>
          </div>
        </div>
        {/*section 3*/}
        <div className="footer-section about">
          <h3>About Us</h3>
          <p>We are a leading e-commerce platform providing a wide range of products to our customers.</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 My E-commerce Site. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
