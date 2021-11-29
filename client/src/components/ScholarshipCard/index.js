import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { HANDLE_SCHOLARSHIP } from '../../utils/mutations'
import Auth from '../../utils/auth';
import '../../assets/css/style.css';


const ScholarshipCard = ({ scholarship }) => {

  const [handleScholarship, { error }] = useMutation(HANDLE_SCHOLARSHIP)
  
  const handlePickScholarship = async (e) => {
    console.log(scholarship);
    console.log(Auth.getUser().data.username);

    try {
      const {data} = await handleScholarship({
        variables: { username:Auth.getUser().data.username,scholarshipId: scholarship._id }
      })
    console.log(data);

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="col" key={scholarship._id}>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" integrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      <div className="card shadow-sm">
      {Auth.loggedIn() ? (
          <div className="card-img-top">
            <div className="d-flex justify-content-end p-4">
              <i className="far fa-star fa-lg	favourite-icon" id={scholarship._id} onClick={(e) => handlePickScholarship(e)}></i>
            </div>
          </div>
          ) : (
              <>
              </>
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
                {/* <button type="button" className="btn btn-sm btn-outline-fill" onClick={handlePickScholarship}>Pick</button>
                <button type="button" className="btn btn-sm btn-outline-fill">E-mail</button>
                <button type="button" className="btn btn-sm btn-outline-fill">Apply</button> */}
                {Auth.getUser().data.usertype==='Provider' ? ( 
                  <div className="btn-group w-100">
                    <button type="button" className="btn btn-sm btn-outline-fill">Update</button>
                    <button type="button" className="btn btn-sm btn-outline-fill">Delete</button>
                  </div>
                ):(
                  <div className="btn-group w-100">
                    <a href={scholarship.applink} className="btn btn-sm btn-outline-fill">Apply</a>
                  </div>
                 )}
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
