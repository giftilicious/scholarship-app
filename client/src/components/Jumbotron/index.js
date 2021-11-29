import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/style.css'


const Jumbotron = () => {
  
  return (
  <section class="jumbotron py-5 text-center container-fluid">
    <div class="row py-lg-5">
      <div class="col-lg-6 col-md-8 mx-auto">
        <h1 class="text-white">Dollars4Scholars</h1>
        <p class="lead text-white">Mission, Vision, and Values</p>
          <div class="btn-container">
            <Link href="#" class="btn-slick" to="/signup">Sign up</Link>
            <Link href="#" class="btn-slick" to="/login">Log in</Link>
          </div>
      </div>
    </div>
  </section>
  );
};

export default Jumbotron;
