import React from 'react';
import {useQuery} from '@apollo/client';
import SearchResults from '../components/SearchResults';
import ScholarshipList from '../components/ScholarshipList';
import Auth from '../utils/auth';
import {QUERY_SCHOLARSHIPS} from '../utils/queries'


const Home = () => {

  const { loading, data } = useQuery(QUERY_SCHOLARSHIPS);
  const scholarships = data?.allScholarships || [];
  
  const pScholarships = [];
  scholarships.forEach(element => {

      const newScholarship = {title:element.title, 
        type: element.type,
        description:element.description, 
        deadline: element.deadline,
        amount: element.amount,
        ethnicity: '',
        gender: '',
        levelofstudy: '',
        disability: '',
        applink: element.applink,
        appemail: element.appemail,
        _id: element._id,
      }
      if (newScholarship.deadline===undefined || !newScholarship.deadline || newScholarship.deadline.length===0){
        newScholarship.deadline='None';
      }
      if (newScholarship.applink===undefined || !newScholarship.applink ||newScholarship.applink.length===0){
        newScholarship.applink='Not provided';
      }
      if (newScholarship.appemail===undefined || !newScholarship.appemail ||newScholarship.appemail.length===0){
        newScholarship.appemail='Not provided';
      }
      if (element.ethnicity===undefined || element.ethnicity.length===0){
        newScholarship.ethnicity='Any';
      } else {
        element.ethnicity.forEach(eth => {
          if (newScholarship.ethnicity.length>0){
            newScholarship.ethnicity = newScholarship.ethnicity + ', ';
          }
          newScholarship.ethnicity = newScholarship.ethnicity + eth;
        });
      }
  
      if (element.gender===undefined || element.gender.length===0){
        newScholarship.gender='Any';
      } else {
        element.gender.forEach(eth => {
          if (newScholarship.gender.length>0){
            newScholarship.gender = newScholarship.gender + ', ';
          }
          newScholarship.gender = newScholarship.gender + eth;
        });
      }
  
      if (element.levelofstudy===undefined || element.levelofstudy.length===0){
        newScholarship.levelofstudy='Any';
      } else {
        element.levelofstudy.forEach(eth => {
          if (newScholarship.levelofstudy.length>0){
            newScholarship.levelofstudy = newScholarship.levelofstudy + ', ';
          }
          newScholarship.levelofstudy = newScholarship.levelofstudy + eth;
        });
      }
  
      if (element.disability===undefined || element.disability.length===0){
        newScholarship.disability='Any';
      } else {
        element.disability.forEach(eth => {
          if (newScholarship.disability.length>0){
            newScholarship.disability = newScholarship.disability + ', ';
          }
          newScholarship.disability = newScholarship.disability + eth;
        });
      }
  
      pScholarships.push(newScholarship);
    
    
  });

  if(loading){
    return (
      <div>
        <h1>Loading ...</h1>
      </div>
    )
  }
  return (
      <div className="row justify-center">
        <p>Dollars 4 Scholars makes the process of finding money to pay for school easier. We specialize in funding for all communities. Search through our selection of awards for Black students, Indigenous, Asian, LGBTQ+ and so many more.</p>
        <p>How it works:</p>
        <ul>
       <li>
       Sign up to create your account
       </li>
       <li>
       Find your awards by selecting your desired categories
       </li>
       <li>
       Save the awards you’re interested in to your Collections page (this is where all your funding details will be saved)
       </li>
        </ul>
          {Auth.loggedIn() ? (
              <SearchResults/>         
          ) : (
              <ScholarshipList
              scholarships={pScholarships}
              title="Some Feed for Scholarships..." />
          )}

      </div>
  );
};

export default Home;
