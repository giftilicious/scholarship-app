import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import makeAnimated from "react-select/animated";
import { components } from "react-select";
import MySelect from "./MySelect.js";
import { ethnicityOptions, genderOptions, disabilityOptions, levelofstudyOptions } from "./data.js";
import { Dropdown, Option } from "./Dropdown";

import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';


import { ADD_SCHOLARSHIP } from '../../utils/mutations';

import Auth from '../../utils/auth';

const OptionEthnicity = props => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

const MultiValueEthnicity = props => (
  <components.MultiValue {...props}>
    <span>{props.data.label}</span>
  </components.MultiValue>
);

const animatedComponentsEthnicity = makeAnimated();

const OptionGender = props => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

const MultiValueGender = props => (
  <components.MultiValue {...props}>
    <span>{props.data.label}</span>
  </components.MultiValue>
);

const animatedComponentsGender = makeAnimated();

const OptionDisability = props => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

const MultiValueDisability = props => (
  <components.MultiValue {...props}>
    <span>{props.data.label}</span>
  </components.MultiValue>
);

const animatedComponentsDisability = makeAnimated();

const OptionLevelofstudy = props => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

const MultiValueLevelofstudy = props => (
  <components.MultiValue {...props}>
    <span>{props.data.label}</span>
  </components.MultiValue>
);

const animatedComponentsLevelofstudy = makeAnimated();


const ScholarshipForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [amount, setAmount] = useState(0);
  const [deadline, setDeadline] = useState('');
  const [ethnicity, setEthnicity] = useState(['']);
  const [disability, setDisability] = useState(['']);
  const [levelofstudy, setLevelofstudy] = useState(['']);
  const [gender, setGender] = useState(['']);
  const [applink, setApplink] = useState('');
  const [appemail, setAppemail] = useState('');
  const [optionSelectedEthnicity, setOptionSelectedEthnicity] = useState(null);
  const [optionSelectedGender, setOptionSelectedGender] = useState(null);
  const [optionSelectedDisability, setOptionSelectedDisability] = useState(null);
  const [optionSelectedLevelofstudy, setOptionSelectedLevelofstudy] = useState(null);

  const [addScholarship, { error }] = useMutation(ADD_SCHOLARSHIP);

  const handleFormSubmit = async (event) => {
    event.preventDefault();


    try {

      const varObj = {
        username: Auth.getUser().data.username, title: title, type: type, description: description, deadline: deadline, amount: amount, ethnicity: ethnicity, disability: disability,
        levelofstudy: levelofstudy,
        gender: gender,
        applink: applink,
        appemail: appemail
      };

      const { data } = await addScholarship({
        variables: { ...varObj },
      });

      setTitle('');
      window.location.assign('/');
    } catch (err) {
      console.log("Cannot insert scholarship")
      console.error(err);

    }
  };

  const handleTypeSelect = (e) => {
    setType(e.target.value);
  };

  const handleSelectEthnicity = selected => {
    setOptionSelectedEthnicity(selected);

    const ethnicities = [];
    if (selected && selected.length > 0) {
      selected.forEach(element => {
        ethnicities.push(element.value);
      });
    }
    setEthnicity(ethnicities);
  };

  const handleSelectGender = selected => {
    setOptionSelectedGender(selected);

    const genders = [];
    if (selected && selected.length > 0) {
      selected.forEach(element => {
        genders.push(element.value);
      });
    }
    setGender(genders);
  };

  const handleSelectDisability = selected => {
    setOptionSelectedDisability(selected);

    const disabilities = [];
    if (selected && selected.length > 0) {
      selected.forEach(element => {
        disabilities.push(element.value);
      });
    }
    setDisability(disabilities);
  };

  const handleSelectLevelofstudy = selected => {
    setOptionSelectedLevelofstudy(selected);

    const levels = [];
    if (selected && selected.length > 0) {
      selected.forEach(element => {
        levels.push(element.value);
      });
    }
    setLevelofstudy(levels);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'description' && value.length <= 280) {
      setDescription(value);
    } else if (name === 'title') {
      setTitle(value);
    } else if (name === 'amount') {
      setAmount(Number(value));
    } else if (name === 'deadline') {
      setDeadline(value);
    } else if (name === 'applink') {
      setApplink(value);
    } else if (name === 'appemail') {
      setAppemail(value);
    }

  };

  return (
    <div>
      <h4>New Scholarship</h4>

      {Auth.loggedIn() ? (
        <>
        <Form.Floating onSubmit={handleFormSubmit}>
          <FloatingLabel controlId="titleInput" label="Title" className="mb-3">
            <Form.Control 
              className="form-input"
              placeholder="Title"
              name="title"
              type="text"
              value={title}
              onChange={handleChange}
            />
          </FloatingLabel>
          <FloatingLabel controlId="descriptionInput" label="Description" className="mb-3">
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: '100px' }}
            />
          </FloatingLabel>
          <FloatingLabel controlId="typeInput" label="Type" className="mb-3">
            <Form.Select aria-label="Select scholarship type" onChange={handleTypeSelect}>
              <option selected>Select Type...</option>
              <option value="Scholarship">Scholarship</option>
              <option value="Bursary">Bursary</option>
              <option value="Award">Bursary</option>
            </Form.Select>
          </FloatingLabel>
          <div>
                <label className="">Level of study</label>
                <MySelect
                  className="mb-3"
                  options={levelofstudyOptions}
                  isMulti
                  closeMenuOnSelect={false}
                  hideSelectedOptions={false}
                  components={{ OptionLevelofstudy, MultiValueLevelofstudy, animatedComponentsLevelofstudy }}
                  onChange={handleSelectLevelofstudy}
                  allowSelectAll={true}
                  value={optionSelectedLevelofstudy} />
              </div>
            <div>
              <label className="">Ethnicity</label>
              <MySelect
                className="mb-3"
                options={ethnicityOptions}
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                components={{ OptionEthnicity, MultiValueEthnicity, animatedComponentsEthnicity }}
                onChange={handleSelectEthnicity}
                allowSelectAll={true}
                value={optionSelectedEthnicity} />
            </div>
            <div>
              <label className="">Gender</label>
              <MySelect
                className="mb-3"
                options={genderOptions}
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                components={{ OptionGender, MultiValueGender, animatedComponentsGender }}
                onChange={handleSelectGender}
                allowSelectAll={true}
                value={optionSelectedGender} />
            </div>
            <div>
              <label className="">Disability</label>
              <MySelect
                className="mb-3"
                options={disabilityOptions}
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                components={{ OptionDisability, MultiValueDisability, animatedComponentsDisability }}
                onChange={handleSelectDisability}
                allowSelectAll={true}
                value={optionSelectedDisability} />
            </div>  
            <FloatingLabel controlId="amountInput" label="Amount" className="mb-3">
              <Form.Control 
                className="form-input"
                placeholder="Amount"
                name="amount"
                type="text"
                value={amount}
                onChange={handleChange}
              />
            </FloatingLabel>
            <FloatingLabel controlId="deadline" label="Deadline" className="mb-3">
              <Form.Control 
                className="form-input"
                placeholder="Deadline"
                name="deadline"
                id="deadline"
                type="date"
                value={deadline}
                onChange={handleChange}
              />
            </FloatingLabel>
            <FloatingLabel controlId="linkInput" label="Link to Scholarship" className="mb-3">
              <Form.Control 
                className="form-input"
                placeholder="Link"
                name="applink"
                id="applink"
                type="text"
                value={applink}
                onChange={handleChange}
              />
            </FloatingLabel>
            <FloatingLabel controlId="amountInput" label="Contact Email" className="mb-3">
              <Form.Control 
                className="form-input"
                placeholder="Contact Email"
                name="appemail"
                id="appemail"
                type="email"
                value={appemail}
                onChange={handleChange}
              />
            </FloatingLabel>
            <Button type="submit" className="btn btn-primary btn-block py-3" onClick={handleFormSubmit}>  
              ADD AWARD
            </Button>
        </Form.Floating>
        </>
      ) : (
        <p>
          You need to be logged in to share add a scholarship. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default ScholarshipForm;

