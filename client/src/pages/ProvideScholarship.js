import React from 'react';
import ScholarshipForm from '../components/ScholarshipForm';
import '../assets/css/style.css';

const ProvideScholarship = () => {

  return (
    <main>
      <div className="container flex-col center justify-center">
      <h2>ADD AN AWARD</h2>  
      <p>Thank you for making a difference by offering access to affordable education.</p>
      <p>Please fill out the form below to submit your scholarship. You may add as many scholarships as you like.</p>
      <p>Once you’ve submitted all your scholarships, you may view them in your Library for reference.</p>
      <br></br>
        <ScholarshipForm />
      </div>
    </main>
  );
};

export default ProvideScholarship;
