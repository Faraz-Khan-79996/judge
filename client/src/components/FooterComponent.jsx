import React from 'react';

function FooterComponent() {
  return (
    <footer className="bg-dark text-light py-4 footer">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>Company Name</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nec justo varius, sagittis enim non, venenatis risus.</p>
            <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
          </div>
          <div className="col-md-3">
            <h5>Links</h5>
            <ul className="list-unstyled">
              <li><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Follow Us</h5>
            <ul className="list-unstyled">
              <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
              <li><a href="#"><i className="fab fa-twitter"></i></a></li>
              <li><a href="#"><i className="fab fa-instagram"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterComponent;
