import React from 'react';
import { useMutation } from '@apollo/client';
import { DROP_SCHOLARSHIP } from '../../utils/mutations'
import Auth from '../../utils/auth';


const ScholarshipCard = ({ scholarship }) => {

  const [dropScholarship, { error }] = useMutation(DROP_SCHOLARSHIP)

  const handleDropScholarship = async (e) => {
    console.log(e.target.id);
    // if (!token) {
    //   return false;
    // }

    try {
      const {data} = await dropScholarship({
        variables: { scholarshipId: e.target.id }
      })
    console.log(data);

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="col" key={scholarship._id}>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" integrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      <div className="card shadow-sm">
      {Auth.loggedIn() ? (
            <div className="card-img-top">
            <div className="d-flex justify-content-end p-4">
              <i className="far fa-star fa-lg	favourite-icon" id={scholarship._id} onClick={(e) => handleDropScholarship(e)}></i>
            </div>
          </div>
          ) : (
              <div>

              </div>
          )}
        
        <div className="card-body">
          <h5 className="card-title">{scholarship.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">${scholarship.amount}</h6>
          <h6 className="card-subtitle mb-2 text-muted">Eligibility</h6>
          <p className="card-text">Gender: {scholarship.gender}</p>
          <p className="card-text">Ethinicity: {scholarship.ethnicity}</p>
          <p className="card-text">Disability: {scholarship.disability}</p>
          <p className="card-text">Level of Study: {scholarship.levelofstudy}</p>
          <p className="card-text">Application deadline: {scholarship.deadline}</p>
          <p className="card-text">{scholarship.description}</p>
          <a href={scholarship.applink} className="card-link">Apply</a>
          <a href={"mailto:" + scholarship.appemail} className="card-link">Email us</a>
        </div>
        {Auth.loggedIn() ? (
            <div className="card-footer">
            <div className="d-flex align-items-center">
              <div className="btn-group w-100">
                <button type="button" className="btn btn-sm btn-outline-fill">View</button>
                <button type="button" className="btn btn-sm btn-outline-fill">Edit</button>
                <button type="button" className="btn btn-sm btn-outline-fill">Apply</button>
              </div>
            </div>
          </div>
          ) : (
              <div>

              </div>
          )}
        
      </div>
    </div>
  );
};

export default ScholarshipCard;


    // <div>
    //     <div key={scholarship._id} className="card mb-3">
    //         <h4 className="card-header bg-primary text-light p-2 m-0">
    //           {scholarship.type} <br />
    //         </h4>
    //         <div className="card-body bg-light p-2">
    //           <p>{scholarship.title}</p>
    //           <p>Value: ${scholarship.amount}</p>
    //           <h5>Eligibility</h5>
    //           <p>Ethinicity: {scholarship.ethnicity}</p>
    //           <p>Disability: {scholarship.disability}</p>
    //           <p>Level of Study: {scholarship.levelofstudy}</p>
    //           <p>Gender: {scholarship.gender}</p>
    //           <p>Application deadline: {scholarship.deadline}</p>
    //           <p>Application link: {scholarship.applink}</p>
    //           <p>Application e-mail: {scholarship.appemail}</p>
    //         </div>
    //       </div>
    // <div className="card" style= {{ width:'18rem' }}>
    //     <div className="card-body">
    //         <h5 className="card-title">{scholarship.title}</h5>
    //         <h6 className="card-subtitle mb-2 text-muted">${scholarship.amount}</h6>
    //         <h6 className="card-subtitle mb-2 text-muted">Eligibility</h6>                   
    //         <p className="card-text">Gender: {scholarship.gender}</p>
    //         <p className="card-text">Ethinicity: {scholarship.ethnicity}</p>          
    //         <p className="card-text">Disability: {scholarship.disability}</p>
    //         <p className="card-text">Level of Study: {scholarship.levelofstudy}</p>          
    //         <p className="card-text">Application deadline: {scholarship.deadline}</p>
    //         <p className="card-text">{scholarship.description}</p>       
    //         <a href={scholarship.applink} className="card-link">Apply</a>
    //         <a href={"mailto:"+ scholarship.appemail} className="card-link">Email us</a>
    //     </div>
    // </div>


    // </div>