import React from 'react';
import { useQuery } from '@apollo/client';
import SearchResults from '../components/SearchResults';
import ScholarshipList from '../components/ScholarshipList';
import Auth from '../utils/auth';


const Home = () => {

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <ScholarshipList />
        </div>
      </div>
    </main>
  );
};


export default Home;







//////////////
// OLD CODE:
// import React from 'react';
// import {useQuery} from '@apollo/client';
// import SearchResults from '../components/SearchResults';
// import ScholarshipList from '../components/ScholarshipList';
// import Auth from '../utils/auth';
// // import {QUERY_SCHOLARSHIPS} from '../utils/queries'


// const Home = () => {

//   // const { loading, data } = useQuery(QUERY_SCHOLARSHIPS);
//   // const scholarships = data?.allScholarships || [];
//   const scholarships = [];
//   const loading  = null;

  
//   const pScholarships = [];
//   scholarships.forEach(element => {
//     console.log(element);

//       const newScholarship = {title:element.title, 
//         type: element.type,
//         description:element.description, 
//         deadline: element.deadline,
//         amount: element.amount,
//         ethnicity: '',
//         gender: '',
//         levelofstudy: '',
//         disabled: '',
//         applink: element.applink,
//         appemail: element.appemail,
//       }
//       if (newScholarship.deadline===undefined || !newScholarship.deadline || newScholarship.deadline.length===0){
//         newScholarship.deadline='None';
//       }
//       if (newScholarship.applink===undefined || !newScholarship.applink ||newScholarship.applink.length===0){
//         newScholarship.applink='Not provided';
//       }
//       if (newScholarship.appemail===undefined || !newScholarship.appemail ||newScholarship.appemail.length===0){
//         newScholarship.appemail='Not provided';
//       }
//       if (element.ethnicity===undefined || element.ethnicity.length===0){
//         newScholarship.ethnicity='Any';
//       } else {
//         element.ethnicity.forEach(eth => {
//           if (newScholarship.ethnicity.length>0){
//             newScholarship.ethnicity = newScholarship.ethnicity + ', ';
//           }
//           newScholarship.ethnicity = newScholarship.ethnicity + eth;
//         });
//       }
  
//       if (element.gender===undefined || element.gender.length===0){
//         newScholarship.gender='Any';
//       } else {
//         element.gender.forEach(eth => {
//           if (newScholarship.gender.length>0){
//             newScholarship.gender = newScholarship.gender + ', ';
//           }
//           newScholarship.gender = newScholarship.gender + eth;
//         });
//       }
  
//       if (element.levelofstudy===undefined || element.levelofstudy.length===0){
//         newScholarship.levelofstudy='Any';
//       } else {
//         element.levelofstudy.forEach(eth => {
//           if (newScholarship.levelofstudy.length>0){
//             newScholarship.levelofstudy = newScholarship.levelofstudy + ', ';
//           }
//           newScholarship.levelofstudy = newScholarship.levelofstudy + eth;
//         });
//       }
  
//       if (element.disabled===undefined || element.disabled.length===0){
//         newScholarship.disabled='Any';
//       } else {
//         element.disabled.forEach(eth => {
//           if (newScholarship.disabled.length>0){
//             newScholarship.disabled = newScholarship.disabled + ', ';
//           }
//           newScholarship.disabled = newScholarship.disabled + eth;
//         });
//       }
  
//       pScholarships.push(newScholarship);
    
    
//   });

//   if(loading){
//     return (
//       <div>
//         <h1>Loading ...</h1>
//       </div>
//     )
//   }
//   return (
//     <main>
//       <div className="flex-row justify-center">
//         <div
//           className="col-12 col-md-10 mb-3 p-3"
//           style={{ border: '1px dotted #1a1a1a' }}
//         >
//           {Auth.loggedIn ? (
//             <div>
//               <SearchResults/>         
//             </div>
//           ) : (
//               <div>
//               <ScholarshipList
//               scholarships={pScholarships}
//               title="Some Feed for Scholarships..."
//             />
//               </div>
//           )}
          
//         </div>        
//       </div>
//     </main>
//   );
// };

// export default Home;
