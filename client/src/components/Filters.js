import React from 'react'
import { useState } from 'react';

function Filters() {
const ethnicities = ["Black","Indigeneous","Asian","Hispanic", "Any"];
const disabilities = ["Physical","Intellectual","Learning", "None"];
const levels = ["Graduate","High School","Post-Secondary","Post-Graduate"];
const types = ["Award","Bursary","Essay","Fund","Scholarship"];

const [ethnicity, setEthnicity ] = useState('Any');
const [disability, setDisability ] = useState('None');
const [level, setLevel ] = useState('Post-Secondary');
const [type, setType ] = useState('Scholarship');


const handleSelect = (e) =>{
    const selected = e.target.value;
    switch (e.target.name){
        case "ethnicities": 
            setEthnicity(selected);
        case "disabilities":
            setDisability(selected);
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
