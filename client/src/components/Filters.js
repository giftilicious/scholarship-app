import React from 'react'

function Filters() {
const demographics = ["","","","",""];
const levels = ["","","","",""];
const types = ["","","","",""];
const deadlines = [];
const values = [];

    return (
        <div>            
            <form action="">
                <select className="filters" name="demographics" id="demographics">
                    {demographics.map((demography) => (
                        <option value={demography}>{demography}</option>
                    ))}                   
                </select>
                <select className="filters" name="levels-of-study" id="levels">
                    {levels.map((level) => (
                        <option value={level}>{level}</option>
                    ))}                   
                </select>
                <select className="filters" name="types" id="types">
                    {types.map((type) => (
                        <option value={type}>{type}</option>
                    ))}                   
                </select>
                <select className="filters" name="deadlines" id="deadlines">
                    {deadlines.map((deadline) => (
                        <option value={deadline}>{deadline}</option>
                    ))}                   
                </select>
                <select className="filters" name="values" id="values">
                    {values.map((value) => (
                        <option value={value}>{value} $</option>
                    ))}                   
                </select>
            </form>
        </div>
    )
}

export default Filters
