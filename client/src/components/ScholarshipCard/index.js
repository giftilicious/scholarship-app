import React from 'react';

const ScholarshipCard = ({ scholarship }) => {

  return (
    <div>
        <div key={scholarship._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {scholarship.type} <br />
            </h4>
            <div className="card-body bg-light p-2">
              <p>{scholarship.title}</p>
              <p>Value: ${scholarship.amount}</p>
              <h5>Eligibility</h5>
              <p>Ethinicity: {scholarship.ethnicity}</p>
              <p>Disability: {scholarship.disability}</p>
              <p>Level of Study: {scholarship.levelofstudy}</p>
              <p>Gender: {scholarship.gender}</p>
              <p>Application deadline: {scholarship.deadline}</p>
              <p>Application link: {scholarship.applink}</p>
              <p>Application e-mail: {scholarship.appemail}</p>
            </div>
          </div>
    </div>
  );
};

export default ScholarshipCard;
