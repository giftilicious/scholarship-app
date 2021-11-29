import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { PICK_SCHOLARSHIP, DROP_SCHOLARSHIP } from '../../utils/mutations'
import Auth from '../../utils/auth';
import '../../assets/css/style.css';

const styles = {
  btnBorder: {
    border: '1px outset #519DD9',
  }
}

const ScholarshipCard = ({ scholarship }) => {

  const [starIcon, setStarIcon] = useState('far fa-star fa-lg	favourite-icon');

  const [pickScholarship, { error }] = useMutation(PICK_SCHOLARSHIP)
  const [dropScholarship, { error2 }] = useMutation(DROP_SCHOLARSHIP)
  
  const handlePickScholarship = async (e) => {
    console.log(scholarship);
    console.log(Auth.getUser().data.username);

    if (starIcon==='far fa-star fa-lg	favourite-icon'){
      setStarIcon('fas fa-star fa-lg	favourite-icon')
      try {
        const {data} = await pickScholarship({
          variables: { username:Auth.getUser().data.username,scholarshipId: scholarship._id }
        })
  
      } catch (err) {
        console.error(err);
      }
    } else {
      setStarIcon('far fa-star fa-lg	favourite-icon')
      try {
        const {data} = await dropScholarship({
          variables: { username:Auth.getUser().data.username,scholarshipId: scholarship._id }
        })
  
      } catch (err) {
        console.error(err);
      }
    }

    
  };

  return (
    <div className="col" key={scholarship._id}>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" integrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      <div className="card shadow-sm">
      {(Auth.loggedIn() && Auth.getUser().data.usertype==='Student') ? (
          <div className="card-img-top">
            <div className="d-flex justify-content-end p-4">
              <i className={starIcon} id={scholarship._id} onClick={(e) => handlePickScholarship(e)}></i>
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
        </div>
        {Auth.loggedIn() ? (
          <div className="card-footer">
            <div className="d-flex align-items-center">
                {/* <button type="button" className="btn btn-sm btn-outline-fill" onClick={handlePickScholarship}>Pick</button>
                <button type="button" className="btn btn-sm btn-outline-fill">E-mail</button>
                <button type="button" className="btn btn-sm btn-outline-fill">Apply</button> */}
                {Auth.getUser().data.usertype==='Provider' ? ( 
                  <div className="btn-group w-100">
                    {(scholarship.applink && scholarship.applink.length>0) ? (
                      <a href={scholarship.applink} className="btn btn-sm btn-outline-fill" style={styles.btnBorder}>Visit Website</a>
                    ):( 
                      <div></div>
                    )}
                    {(scholarship.appemail && scholarship.appemail.length>0) ? (
                      <a href={"mailto:" + scholarship.appemail} className="btn btn-sm btn-outline-fill" style={styles.btnBorder}>Email Insitution</a>
                    ):( 
                      <div></div>
                    )}
                  </div>
                ):(
                  <div className="btn-group w-100">
                    {(scholarship.applink && scholarship.applink.length>0) ? (
                      <a href={scholarship.applink} className="btn btn-sm btn-outline-fill" style={styles.btnBorder}>Visit Website</a>
                    ):( 
                      <div></div>
                    )}
                    {(scholarship.appemail && scholarship.appemail.length>0) ? (
                      <a href={"mailto:" + scholarship.appemail} className="btn btn-sm btn-outline-fill" style={styles.btnBorder}>Email Insitution</a>
                    ):( 
                      <div></div>
                    )}
                    <a href={scholarship.applink} className="btn btn-sm btn-outline-fill" style={styles.btnBorder}>Apply</a>
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
