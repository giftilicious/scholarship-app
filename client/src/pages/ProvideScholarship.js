import React from 'react';
import ScholarshipForm from '../components/ScholarshipForm';
import '../assets/css/style.css';

const ProvideScholarship = () => {

  return (
    <main>
      <div className="container flex-col center justify-center">
      <h2>ADD A SCHOLARSHIP</h2>  
      <p>Thank you for making a difference by offering access to affordable education.</p>
      <p>Please fill out the form below to submit your scholarship. You may add as many scholarships as you like.</p>
      <p>Once you’ve submitted all your scholarships, you may view them in your Library for reference.</p>
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
