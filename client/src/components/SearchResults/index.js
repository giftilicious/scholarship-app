import React from 'react';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import ScholarshipCard from '../ScholarshipCard';
import { QUERY_SCHOLARSHIPS } from '../../utils/queries';
// import { isType } from 'graphql';


// const filterScholarship = (element, filter) => {
//   // if element.ethnicity array has values
//   if (!(element.ethnicity === undefined || element.ethnicity.length === 0) && (filter.ethnicity && filter.ethnicity.length > 0)) {
//     let found = false;
//       // check if one of the ethnicity values equals that of the filter
//     element.ethnicity.forEach(ele => {
//       if (ele === filter.ethnicity) {
//         found = true;
//       }
//     });

//     if (!found) {
//       return true;
//     }
//   }
//   if (!(element.gender === undefined || element.gender.length === 0) && (filter.gender && filter.gender.length > 0)) {
//     let found = false;
//     element.gender.forEach(ele => {
//       if (ele === filter.gender) {
//         found = true;
//       }
//     });
//     if (!found) {
//       return true;
//     }
//   }
//   if (!(element.disability === undefined || element.disability.length === 0) && (filter.disability && filter.disability.length > 0)) {
//     let found = false;
//     element.disability.forEach(ele => {
//       if (ele === filter.disability) {
//         found = true;
//       }
//     });
//     if (!found) {
//       return true;
//     }
//   }
//   if (!(element.levelofstudy === undefined || element.levelofstudy.length === 0) && (filter.levelofstudy && filter.levelofstudy.length > 0)) {
//     let found = false;
//     element.levelofstudy.forEach(ele => {
//       if (ele === filter.levelofstudy) {
//         found = true;
//       }
//     });
//     if (!found) {
//       return true;
//     }
//   }
//   if (!(element.type === undefined || element.type.length === 0) && (filter.type && filter.type.length > 0)) {
//     if (!(element.type !== filter.type)) {
//       return true;
//     }
//   }

//   return false;
// }

const SearchResults = () => {
  // Arrays for storing filter options
  const ethnicities = ["", "Black", "Indigenous", "Asian"];
  const disabilities = ["", "Physical Disability", "Intellectual Disability", "Learning Disability"];
  const genders = ["", "Female", "Male", "Gender Diverse"];
  const levels = ["", "High School", "Post-Secondary"];
  const types = ["", "Bursary", "Scholarship"];

  // Tracking states of each filter
  const [ethnicity, setEthnicity] = useState('');
  const [disability, setDisability] = useState('');
  const [gender, setGender] = useState('');
  const [level, setLevel] = useState('');
  const [type, setType] = useState('');

  // object will store filter values each time a select element value changes
  const selection = {
      ethnicity: ethnicity,
      disability: disability,
      gender: gender,
      level: level,
      type: type
  };
  // console.log('Initital selection     ', selection)

  // Handler for all states
  const handleSelect = (e) => {
    const selected = e.target.value;
    switch (e.target.name) {
      case "ethnicities":
        setEthnicity(selected);
        selection.ethinicity=selected;
        break;
      case "disabilities":
        setDisability(selected);
        selection.disability=selected;
        break;
      case "genders":
        setGender(selected);
        selection.gender=selected;
        break;
      case "levels-of-study":
        setLevel(selected);
        selection.level=selected;
        break;
      case "types":
        setType(selected);
        selection.type=selected;
        break;
      default:
        console.log("Sorry, could not find what you are looking for");
    }
    console.log('selection in handler', selection);
  }
 
  

  // Query for all available scholarships. Returns [Scholarship].
  const { loading, data } = useQuery(QUERY_SCHOLARSHIPS);
  const scholarships = data?.allScholarships || [];

  console.log('All scholarships', scholarships);
 
  const [pScholarships, setpScholarships] = useState([]);
  
  // console.log('pScholarships instantiation',pScholarships);
  
  const handleSubmit = () =>{
    //Arrays to hold successive filtered data
    let byEthnicity = [];
    let byDisability = [];
    let byGender = [];
    let byLevel = [];
    let final = [];

    // Functions to implement filter tests:
      // returns true if one of the ethnicities matches the ethnicity filter
      // nested callback function inside anonymous function to be able to pass in two arguments in the array.filter() method
   function isEthnicity (selection){
     return function (element){
       let found=false;
      element.ethnicity.forEach((eth) =>{
        if(eth === selection.ethnicity){
         found = true;
        }   
      });
      return found;
    }     
   };
   // returns true if one of the disabilities matches the disability filter
   // nested callback function inside anonymous function to be able to pass in two arguments in the array.filter() method
   function isDisability (selection){
    return function (element){
      let found=false;
     element.disability.forEach((dis) =>{
       if(dis === selection.disability){
        found = true;
       }   
     });
     return found;
   }
   };
// returns true if one of the genders matches the gender filter
// nested callback function inside anonymous function to be able to pass in two arguments in the array.filter() method
   function isGender (selection){
    return function (element){
      let found=false;
     element.gender.forEach((gen) =>{
       if(gen === selection.gender){
        found = true;
       }   
     });
     return found;
   }
   };
// returns true if one of the levels matches the level filter
// nested callback function inside anonymous function to be able to pass in two arguments in the array.filter() method
   function isLevel (selection){
    return function (element){
      let found=false;
     element.levelofstudy.forEach((lev) =>{
       if(lev === selection.level){
        found = true;
       }   
     });
     return found;
   }
   };
// returns true if one of the types matches the type filter
// nested callback function inside anonymous function to be able to pass in two arguments in the array.filter() method
   function isOfType (selection){
    return function (element){
      let found=false;     
       if(element.type === selection.type){
        found = true;
       }   
     
     return found;
   }
   };
   

    // The following filters are applied successively to avoid nesting of conditionals. 
    // They will be implemented sequentially
    // The entire sequence will be implemented each time the submit button is clicked.
    // First, if ethnicity has been selected, it will filter 'scholarships' array into 'byEthnicity' array.
    // if no ethnicity has been selected, 'byEthnicity' will contain  all scholarships that were in the 'scholarship' array
    if (selection.ethnicity !== ''){
      byEthnicity = scholarships.filter(isEthnicity(selection));
    }else{
      byEthnicity = scholarships;
    }
    // Second Filter: Disability
    if (selection.disability !== ''){
      byDisability = byEthnicity.filter(isDisability(selection));
    }else{
      byDisability = byEthnicity;
    }
    // Third
    if (selection.gender !== ''){
      byGender = byDisability.filter(isGender(selection));
    }else{
      byGender = byDisability;
    }
    // Fourth
    if (selection.level !== ''){
      byLevel = byGender.filter(isLevel(selection));
    }else{
      byLevel = byGender;
    }
    // Final Filter: Type
    if (selection.type !== ''){
      final = byLevel.filter(isOfType(selection));
    }else{
      final = byLevel;
    }
    setpScholarships(final);

  // scholarships.forEach(element => {
  //   if (filterScholarship(element, selection)) {
  //     //console.log("Filtered");
  //   } else {
  //     //console.log("Not filtered");
  //     const newScholarship = {
  //       title: element.title,
  //       type: element.type,
  //       description: element.description,
  //       deadline: element.deadline,
  //       amount: element.amount,
  //       ethnicity: '',
  //       gender: '',
  //       levelofstudy: '',
  //       disability: '',
  //       applink: element.applink,
  //       appemail: element.appemail,
  //     }
  //     if (newScholarship.deadline === undefined || !newScholarship.deadline || newScholarship.deadline.length === 0) {
  //       newScholarship.deadline = 'None';
  //     }
  //     if (newScholarship.applink === undefined || !newScholarship.applink || newScholarship.applink.length === 0) {
  //       newScholarship.applink = 'Not provided';
  //     }
  //     if (newScholarship.appemail === undefined || !newScholarship.appemail || newScholarship.appemail.length === 0) {
  //       newScholarship.appemail = 'Not provided';
  //     }
  //     if (element.ethnicity === undefined || element.ethnicity.length === 0) {
  //       newScholarship.ethnicity = 'Any';
  //     } else {
  //       element.ethnicity.forEach(eth => {
  //         if (newScholarship.ethnicity.length > 0) {
  //           newScholarship.ethnicity = newScholarship.ethnicity + ', ';      
  //         }
  //         newScholarship.ethnicity = newScholarship.ethnicity + eth;
  //       });
  //     }

  //     if (element.gender === undefined || element.gender.length === 0) {
  //       newScholarship.gender = 'Any';
  //     } else {
  //       element.gender.forEach(eth => {
  //         if (newScholarship.gender.length > 0) {
  //           newScholarship.gender = newScholarship.gender + ', ';
  //         }
  //         newScholarship.gender = newScholarship.gender + eth;
  //       });
  //     }

  //     if (element.levelofstudy === undefined || element.levelofstudy.length === 0) {
  //       newScholarship.levelofstudy = 'Any';
  //     } else {
  //       element.levelofstudy.forEach(eth => {
  //         if (newScholarship.levelofstudy.length > 0) {
  //           newScholarship.levelofstudy = newScholarship.levelofstudy + ', ';
  //         }
  //         newScholarship.levelofstudy = newScholarship.levelofstudy + eth;
  //       });
  //     }

  //     if (element.disability === undefined || element.disability.length === 0) {
  //       newScholarship.disability = 'Any';
  //     } else {
  //       element.disability.forEach(eth => {
  //         if (newScholarship.disability.length > 0) {
  //           newScholarship.disability = newScholarship.disability + ', ';
  //         }
  //         newScholarship.disability = newScholarship.disability + eth;
  //       });
  //     }
  //     // store value in filtered array
  //     filteredResults.push(newScholarship); 

  //     // pScholarships.push(newScholarship);      
  //   }

  // });
  // console.log("filtered Results", filteredResults);
  // after finalizing 'for each' loop
  //pass container array (filteredResults) into tracked state pScholarships.
  //  setpScholarships(filteredResults);

  }

      // function to clear filters and re-render page
      const clear = () => {
        setEthnicity('');
        setDisability('');
        setGender('');
        setLevel('');
        setType('');

        handleSubmit();
      }



  // loading
  if(loading){
    return(
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }
  // loaded
  return (
    <div>
      {/* Form to render the filters */}
      <form action="">
        {/* ethnicities */}
        <select className="filters" name="ethnicities" id="ethnicities" onChange={handleSelect} >
          {ethnicities.map((ethnicity) => (
            <option value={ethnicity}>{ethnicity}</option>
          ))}
        </select>
        {/* disabilities */}
        <select className="filters" name="disabilities" id="disabilities" onChange={handleSelect}>
          {disabilities.map((disability) => (
            <option value={disability}>{disability}</option>
          ))}
        </select>
        {/* levels of study */}
        <select className="filters" name="levels-of-study" id="levels" onChange={handleSelect}>
          {levels.map((level) => (
            <option value={level}>{level}</option>
          ))}
        </select>
        {/* genders */}
        <select className="filters" name="genders" id="genders" onChange={handleSelect}>
          {genders.map((gender) => (
            <option value={gender}>{gender}</option>
          ))}
        </select>
        {/* types of funding */}
        <select className="filters" name="types" id="types" onChange={handleSelect}>
          {types.map((type) => (
            <option value={type}>{type}</option>
          ))}
        </select>
        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
        <button type="submit" className="btn btn-primary" onClick={clear}>Clear Preferences</button>
      </form>
      {/* render results of (filtered) search */}
      <div>
        {/* {console.log(pScholarships)} */}
        {pScholarships.map((scholarship) => (
          // console.log('working')
           
          <ScholarshipCard key={scholarship._id} scholarship={scholarship} />
          

        ))}
      </div>
    </div>
  )
}

export default SearchResults;