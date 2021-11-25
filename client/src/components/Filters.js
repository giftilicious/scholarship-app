import React from 'react'
import { useState } from 'react';

function Filters() {
const ethnicities = ["Black","Indigeneous","Asian"];
const disabilities = ["Physical","Intellectual","Learning Difference"];
const genders = ["Female", "Male", "Gender Diverse"];
const levels = ["High School","Post-Secondary"];
const types = ["Bursary", "Scholarship"];

const [ethnicity, setEthnicity ] = useState('Ethnicity');
const [disability, setDisability ] = useState('Disability');
const [gender, setGender ] = useState('Gender');
const [level, setLevel ] = useState('Level of study');
const [type, setType ] = useState('Type of funding');


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

    return (
        <div>            
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
                 {/* genders */}
                 <select className="filters" name="genders" id="genders" onChange={handleSelect}>
                    {genders.map((gender) => (
                        <option value={gender}>{gender}</option>
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
                {/* application deadlines */}
                <select className="filters" name="deadlines" id="deadlines">
                    {deadlines.map((deadline) => (
                        <option value={deadline}>{deadline}</option>
                    ))}                   
                </select>
                {/* funding values or amounts */}
                <select className="filters" name="values" id="values">
                    {values.map((value) => (
                        <option value={value}>{value} &#36;</option>
                    ))}                   
                </select>
            </form>
        </div>
    )
}

export default Filters
