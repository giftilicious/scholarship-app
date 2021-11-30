import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/style.css'


const Jumbotron = () => {
  
  return (
  <section className="jumbotron py-5 text-center container-fluid">
    <div className="row py-lg-5">
      <div className="col-lg-6 col-md-8 mx-auto">
        <h1 className="text-white">Dollars4Scholars</h1>
        <p className="lead text-white">Dollars 4 Scholars makes the process of finding money to pay for school easier. We specialize in funding for all communities. Search through our selection of awards for Black, Indigenous, Asian, LGBTQ+ and so many more.</p>
          <div className="btn-container">
            <Link href="#" className="btn-slick" to="/signup">Sign up</Link>
            <Link href="#" className="btn-slick" to="/login">Log in</Link>
          </div>
      </div>
    </div>
  </section>
  );
};

export default Jumbotron;
