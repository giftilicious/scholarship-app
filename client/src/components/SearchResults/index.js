import React from 'react';
import { useState } from 'react';
import {useQuery} from '@apollo/client';
import ScholarshipCard from '../ScholarshipCard';
import { QUERY_SCHOLARSHIPS } from '../../utils/queries';

const filterScholarship = (element,filter) => {
    if (!(element.ethnicity===undefined || element.ethnicity.length===0)&&(filter.ethnicity && filter.ethnicity.length>0)){
      let found =false;
        element.ethnicity.forEach(ele => {
        if (ele===filter.ethnicity){
            found = true;
          console.log("Same"+ ele + filter.ethnicity)
        } else {
          console.log("Not same" + ele + filter.ethnicity)
        }
      });
      if (!found){
        return true;
      }
    }
    if (!(element.gender===undefined || element.gender.length===0)&&(filter.gender && filter.gender.length>0)){
        let found =false;
        element.gender.forEach(ele => {
        if (ele===filter.gender){
            found = true;
          console.log("Same"+ ele + filter.gender)
        } else {
          console.log("Not same" + ele + filter.gender)
        }
      });
      if (!found){
        return true;
      }
    }
    if (!(element.disability===undefined || element.disability.length===0)&&(filter.disability && filter.disability.length>0)){
        let found =false;
        element.disability.forEach(ele => {
        if (ele===filter.disability){
            found = true;
          console.log("Same"+ ele + filter.disability)
        } else {
          console.log("Not same" + ele + filter.disability)
        }
      });
      if (!found){
        return true;
      }
    }
    if (!(element.levelofstudy===undefined || element.levelofstudy.length===0)&&(filter.levelofstudy && filter.levelofstudy.length>0)){
        let found =false;
        element.levelofstudy.forEach(ele => {
        if (ele===filter.levelofstudy){
            found = true;
          console.log("Same"+ ele + filter.levelofstudy)
        } else {
          console.log("Not same" + ele + filter.levelofstudy)
        }
      });
      if (!found){
        return true;
      }
    }
    if (!(element.type===undefined || element.type.length===0)&&(filter.type && filter.type.length>0)){
      if (!(element.type!=filter.type)){
        return true;
      }
    }
  
    return false;
  }

const SearchResults = () => {
    // Arrays for storing filter options
const ethnicities = ["Black","Indigeneous","Asian"];
const disabilities = ["Physical","Intellectual","Learning Difference"];
const genders = ["Female", "Male", "Gender Diverse"];
const levels = ["High School","Post-Secondary"];
const types = ["Bursary", "Scholarship"];

// Tracking states of each filter
const [ethnicity, setEthnicity ] = useState('Ethnicity');
const [disability, setDisability ] = useState('Disability');
const [gender, setGender ] = useState('Gender');
const [level, setLevel ] = useState('Level of study');
const [type, setType ] = useState('Type of funding');

// Handler for all states
    const handleSelect = (e) =>{
        const selected = e.target.value;
        switch (e.target.name){
            case "ethnicities": 
                setEthnicity(selected);
            case "disabilities":
                setDisability(selected);
            case "genders":
                setGender(selected);
            case "levels-of-study":
                setLevel(selected);
            case "types":
                setType(selected);
        }  
    
    }
    // Object with all selected filters
    const selection = {
        ethinicity: ethnicity,
        disability: disability,
        gender: gender,
        level: level,
        type: type
    }

    const { loading, data } = useQuery(QUERY_SCHOLARSHIPS);
  const scholarships = data?.allScholarships || [];

  const filter = {ethnicity:'African Canadian', gender:'',disability:'',levelofstudy:'',type:''}
  
  const pScholarships = [];
  scholarships.forEach(element => {
    if (filterScholarship(element,filter)){
      //console.log("Filtered");
    } else {
      //console.log("Not filtered");
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
    }
    
  });

    const filteredList = pScholarships;
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
            {/* types of funding */}
            <select className="filters" name="types" id="types" onChange={handleSelect}>
                {types.map((type) => (
                    <option value={type}>{type}</option>
                ))}                   
            </select>            
        </form>
        {/* render results of (filtered) search */}
        <div>
            {filteredList.map((scholarship) => (
                <ScholarshipCard scholarship={scholarship} filters={selection}/>
            ))}
        </div>
    </div>
    )
}

export default SearchResults;
