import React from 'react';

const ScholarshipCard = (props) => {

  return (
    <div>
        {/* <div key={scholarship._id} className="card mb-3">
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
          </div> */}
    <div className="card" style= {{ width:'18rem' }}>
        <div className="card-body">
            <h5 className="card-title">{props.scholarship.title}</h5>
            <h6 className="card-subtitle mb-2 text-muted">${props.scholarship.amount}</h6>
            <h6 className="card-subtitle mb-2 text-muted">Eligibility</h6>                   
            <p className="card-text">Gender: {props.scholarship.gender}</p>
            <p className="card-text">Ethinicity: {props.scholarship.ethnicity}</p>          
            <p className="card-text">Disability: {props.scholarship.disability}</p>
            <p className="card-text">Level of Study: {props.scholarship.levelofstudy}</p>          
            <p className="card-text">Application deadline: {props.scholarship.deadline}</p>
            <p className="card-text">{props.scholarship.description}</p>       
            <a href={props.scholarship.applink} className="card-link">Apply</a>
            <a href={"mailto:"+ props.scholarship.appemail} className="card-link">Email us</a>
        </div>
    </div>


    </div>
  );
};

export default ScholarshipCard;
