import React from 'react';
import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import ScholarshipCard from '../ScholarshipCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { QUERY_SCHOLARSHIPS } from '../../utils/queries';

const SearchResults = () => {
  // Arrays for storing filter options
  const ethnicities = ["", "Black", "Indigenous", "Asian"];
  const disabilities = ["", "Physical", "Intellectual", "Learning Difference"];
  const genders = ["", "Female", "Male", "Gender Diverse"];
  const levels = ["", "High School", "Post-Secondary"];
  const types = ["", "Bursary", "Scholarship", "Award"];

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
        console.log("Sorry, we could not find what you are looking for");
    }
    console.log('selection in handler', selection);
  }
 
  

  // Query for all available scholarships. Returns [Scholarship].
  const { loading, data } = useQuery(QUERY_SCHOLARSHIPS);
  
  const [filteredSc, setFilteredSc] = useState([]);
 
  const [pScholarships, setpScholarships] = useState([]);
  
  useEffect(()=> {
    if(!loading){
      setpScholarships([...data.allScholarships]);
      setFilteredSc([...data.allScholarships]);     
    }
  }, [loading, data])
  
  
  // console.log('pScholarships instantiation',pScholarships);
  
  const handleSubmit = () =>{

    let scholarships = [...pScholarships];
    //Arrays to hold successive filtered data
    let byEthnicity = [];
    let byDisability = [];
    let byGender = [];
    let byLevel = [];
    let final = [];

    console.log('selection in handler', selection);

    // Functions to implement filter tests:
      // returns true if one of the ethnicities matches the ethnicity filter
      // nested callback function inside anonymous function to be able to pass in two arguments in the array.filter() method
   function isEthnicity (selection){
     return function (element){
       let found=false;
       if (element.ethnicity.length===0){
         return true;
       } else if (element.ethnicity.length===1 && element.ethnicity[0].length===0){
        return true;
      }
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
      if (element.disability.length===0){
        return true;
      } else if (element.disability.length===1 && element.disability[0].length===0){
        return true;
      }
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
      if (element.gender.length===0){
        return true;
      } else if (element.gender.length===1 && element.gender[0].length===0){
        return true;
      }
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
      if (element.levelofstudy.length===0){
        return true;
      } else if (element.levelofstudy.length===1 && element.levelofstudy[0].length===0){
        return true;
      }
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
      byEthnicity =[...scholarships];
    }
    // Second Filter: Disability
    if (selection.disability !== ''){
      byDisability = byEthnicity.filter(isDisability(selection));
    }else{
      byDisability = [...byEthnicity];
    }
    // Third
    if (selection.gender !== ''){
      byGender = byDisability.filter(isGender(selection));
    }else{
      byGender = [...byDisability];
    }
    // Fourth
    if (selection.level !== ''){
      byLevel = byGender.filter(isLevel(selection));
    }else{
      byLevel = [...byGender];
    }
    // Final Filter: Type
    if (selection.type !== ''){
      final = byLevel.filter(isOfType(selection));
    }else{
      final = [...byLevel];
    }
    setFilteredSc([...final]);

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
    <Container fluid>
      {/* Form to render the filters */}
      <Form.Floating>
        <Row sm={6}>
          <Col>
            <FloatingLabel controlId="ethnicities" label="Ethnicity">
              <Form.Select name="ethnicities" id="ethnicities" aria-label="Filter Scholarships by Ethnicity" onChange={handleSelect}>
                {ethnicities.map((ethnicity, i) => (
                  <option key={i} value={ethnicity}>{ethnicity}</option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="disabilities" label="Special Needs">
              <Form.Select name="disabilities" id="disabilities" aria-label="Filter Scholarships by Disability" onChange={handleSelect}>
                {disabilities.map((disability, i) => (
                  <option key={i} value={disability}>{disability}</option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="levels" label="Education">
              <Form.Select name="levels-of-study" id="levels" aria-label="Filter Scholarships by Level of Education" onChange={handleSelect}>
                {levels.map((level, i) => (
                          <option key={i} value={level}>{level}</option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="genders" label="Gender">
              <Form.Select name="genders" id="genders" aria-label="Filter Scholarships by Gender" onChange={handleSelect}>
                {genders.map((gender, i) => (
                  <option key={i} value={gender}>{gender}</option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="types" label="Funding">
              <Form.Select name="types" id="types" aria-label="Filter Scholarships by Funding Type" onChange={handleSelect}>
                {types.map((type, i) => (
                  <option key={i} value={type}>{type}</option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Col>
        </Row>

        <Button variant="primary" type="button" id="sbmtBtnS" onClick={handleSubmit}>Submit</Button>
        <Button variant="primary" type="submit" id="clrBtnS" onClick={clear}>Clear</Button>
      </Form.Floating>

      <Row xs={1} md={2} lg={4}>
        {filteredSc.length > 0 && filteredSc.map((scholarship) => {
          console.log(scholarship._id);
         return <ScholarshipCard key={scholarship._id} scholarship={scholarship} />       
        })}
      </Row>
    </Container>
   )
}

export default SearchResults;

// <div className= "container">
// <div className="row">

//   <div className="col-12 col-lg-9 col-xl-10 ">
//     <div className="row">
//       <div className="col-12 col-lg-4 col-xl-1">
//         <label htmlFor="ethnicities" id="ethnicitiesL" className= "fl-label">Ethnicity</label>
//         <select name="ethnicities" id="ethnicities" onChange={handleSelect} >
//           {ethnicities.map((ethnicity, i) => (
//             <option key={i} value={ethnicity}>{ethnicity}</option>
//           ))}
//         </select>
//       </div>
//       <div className="col-12 col-lg-4 col-xl-3">
//       <label htmlFor="disabilities" className= "fl-label" id= "disabilitiesL">Special Needs</label>
//         <select name="disabilities" id="disabilities" onChange={handleSelect}>
//           {disabilities.map((disability, i) => (
//             <option key={i} value={disability}>{disability}</option>
//           ))}
//         </select>
//       </div>
//       <div className="col-12 col-lg-4 col-xl-2">
//       <label htmlFor="levels" className= "fl-label">Level</label>
//         <select name="levels-of-study" id="levels" onChange={handleSelect}>
//           {levels.map((level, i) => (
//             <option key={i} value={level}>{level}</option>
//           ))}
//         </select>
//       </div>
//       <div className="col-12 col-lg-4 col-xl-2">
//       <label htmlFor="genders" id="gendersL" className= "fl-label">Gender</label>
//         <select name="genders" id="genders" onChange={handleSelect}>
//           {genders.map((gender, i) => (
//             <option key={i} value={gender}>{gender}</option>
//           ))}
//         </select>
//       </div>
//       <div className="col-12 col-lg-4 col-xl-2">
//       <label htmlFor="types" className= "fl-label">Funding</label>
//         <select name="types" id="types" onChange={handleSelect}>
//           {types.map((type, i) => (
//             <option key={i} value={type}>{type}</option>
//           ))}
//         </select>
//       </div>
//     </div>
//   </div>

//   <div className="col-12 col-lg-3 col-xl-2">
//     <div className="row">
//         <div className="col-6">
//           <button type="button" className="btn btn-primary" id="sbmtBtnS" onClick={handleSubmit}>Submit</button>
//         </div>
//         <div className="col-6">
//           <button type="submit" className="btn btn-primary" id= "clrBtnS" onClick={clear}>Clear</button>
//         </div>
//       </div>
//     </div>
// </div>

// </div>