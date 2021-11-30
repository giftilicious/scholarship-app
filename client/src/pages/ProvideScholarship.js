import React from 'react';
import ScholarshipForm from '../components/ScholarshipForm';
import '../assets/css/style.css';

const ProvideScholarship = () => {

  return (
    <main>
      <div className="container flex-col center justify-center">
      <h2>ADD AN AWARD</h2>  
      <p>Thank you for making a difference by offering access to affordable education.</p>
      <p>Please fill out the form below to submit your award. You may add as many awards as you like.</p>
      <p>Once you’ve submitted all your awards, you may view them in your Library for reference.</p>
      <br></br>
        <div
          className="col-12 col-md-10 mb-3 p-3 pb-5"
          style={{ border: '1px dotted #1a1a1a' }} >
          <ScholarshipForm />
        </div>
      </div>
    </main>
  );
};

export default ProvideScholarship;
