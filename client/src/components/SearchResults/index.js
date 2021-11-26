import React from 'react';
import { useState } from 'react';
// import {useQuery} from '@apollo/client';
import {ScholarshipList, ScholarshipCard} from '';

function Search() {
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
    // Query according to filer selection
    // const {loading, data} = useQuery(QUERY_FILTERED_SCHOLARSHIPS, {

    //     ethinicity: ethnicity,
    //     disability: disability,
    //     gender: gender,
    //     level: level,
    //     type: type
    // });
    // const filteredList = data?.filteredScholarships || [];


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

export default Search;
