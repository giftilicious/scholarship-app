import React from 'react';
import ScholarshipForm from '../components/ScholarshipForm';
const ProvideScholarship = () => {

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <ScholarshipForm />


          <form className="styled-form row">
            <div className="form-field col-lg-12">
              <input id="name" className="input-text" type="text" required />
              <label className="label" for="name">Name</label>
            </div>
            <div className="form-field col-lg-12">
              <input id="email" className="input-text" type="email" required />
              <label className="label" for="email">E-mail</label>
            </div>
            <div className="form-field col-lg-12">
              <input className="submit-btn" type="submit" value="Submit" />
            </div>
          </form>

        </div>
      </div>
    </main>
  );
};

export default ProvideScholarship;
