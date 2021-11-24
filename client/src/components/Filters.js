import React from 'react'

function Filters() {
const ethnicities = ["Black","Indigeneous","Asian","Hispanic"];
const disabilities = ["Physical","Intellectual","Learning"];
const levels = ["Graduate","High School","Post-Secondary","Post-Graduate"];
const types = ["Award","Bursary","Essay","Fund","Scholarship"];
const deadlines = ["15 January", "1 February", "1 March", "1 June", "1 August"];
const values = ["1000", "2000","3000","4000", "5000", "8000","10000", "12000", "15000"];

    return (
        <div>            
            <form action="">
                {/* ethnicities */}
                <select className="filters" name="ethnicities" id="ethnicities">
                    {ethnicities.map((ethnicity) => (
                        <option value={ethnicity}>{ethnicity}</option>
                    ))}                   
                </select>
                {/* disabilities */}
                <select className="filters" name="disabilities" id="disabilities">
                    {disabilities.map((disability) => (
                        <option value={disability}>{disability}</option>
                    ))}                   
                </select>
                {/* levels of study */}
                <select className="filters" name="levels-of-study" id="levels">
                    {levels.map((level) => (
                        <option value={level}>{level}</option>
                    ))}                   
                </select>
                {/* types of funding */}
                <select className="filters" name="types" id="types">
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
