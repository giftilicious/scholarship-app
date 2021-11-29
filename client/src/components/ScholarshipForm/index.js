import React, { useState, Component } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import makeAnimated from "react-select/animated";
import { components } from "react-select";
import MySelect from "./MySelect.js";
import { ethnicityOptions, genderOptions, disabilityOptions, levelofstudyOptions } from "./data.js";
import { Dropdown, Option } from "./Dropdown";


import { ADD_SCHOLARSHIP, DELETE_SCHOLARSHIPS } from '../../utils/mutations';

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
    console.log(Auth.getUser().data)
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
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <label for="title" className="col-3 col-lg-3">Title</label>
              <input type="text"
                value={title}
                className="col-9 col-lg-6"
                id="title"
                name="title"
                onChange={handleChange}
                placeholder="The title of your scholarship..." />
              <label for="description" className="col-3 col-lg-3">Description</label>
              <textarea
                name="description"
                placeholder="Description of the scholarship"
                value={description}
                className="form-input w-100 col-9 col-lg-6"
                onChange={handleChange}
                style={{ lineHeight: '1.5', resize: 'vertical' }
                }
              ></textarea>

              <Dropdown
                formLabel="Type of Scholarship"
                onChange={handleTypeSelect}
              >
                <Option selected value="Click to see options" />
                <Option value="Scholarship" />
                <Option value="Bursary" />
                <Option value="Award" />
              </Dropdown>
              <div>
                <label for="amount" className="col-3 col-lg-3">Amount</label>
                <input type="text"
                  value={amount}
                  className="col-9 col-lg-6"
                  id="amount"
                  name="amount"
                  onChange={handleChange}
                  placeholder="The grant amount..." />
              </div>
              <div>
                <label className="col-3 col-lg-3">Ethnicity</label>

                <MySelect
                  className="col-9 col-lg-6"
                  options={ethnicityOptions}
                  isMulti
                  closeMenuOnSelect={false}
                  hideSelectedOptions={false}
                  components={{ OptionEthnicity, MultiValueEthnicity, animatedComponentsEthnicity }}
                  onChange={handleSelectEthnicity}
                  allowSelectAll={true}
                  value={optionSelectedEthnicity}
                />
              </div>
              <div>
                <label className="col-3 col-lg-3">Gender</label>

                <MySelect
                  className="col-9 col-lg-6"
                  options={genderOptions}
                  isMulti
                  closeMenuOnSelect={false}
                  hideSelectedOptions={false}
                  components={{ OptionGender, MultiValueGender, animatedComponentsGender }}
                  onChange={handleSelectGender}
                  allowSelectAll={true}
                  value={optionSelectedGender}
                />
              </div>
              <div>
                <label className="col-3 col-lg-3">Disability</label>

                <MySelect
                  className="col-9 col-lg-6"
                  options={disabilityOptions}
                  isMulti
                  closeMenuOnSelect={false}
                  hideSelectedOptions={false}
                  components={{ OptionDisability, MultiValueDisability, animatedComponentsDisability }}
                  onChange={handleSelectDisability}
                  allowSelectAll={true}
                  value={optionSelectedDisability}
                />
              </div>
              <div>
                <label className="col-3 col-lg-3">Level of Study</label>

                <MySelect
                  className="col-9 col-lg-6"
                  options={levelofstudyOptions}
                  isMulti
                  closeMenuOnSelect={false}
                  hideSelectedOptions={false}
                  components={{ OptionLevelofstudy, MultiValueLevelofstudy, animatedComponentsLevelofstudy }}
                  onChange={handleSelectLevelofstudy}
                  allowSelectAll={true}
                  value={optionSelectedLevelofstudy}
                />
              </div>
              <label for="deadline" className="col-3 col-lg-3">Deadline</label>
              <input type="date"
                value={deadline}
                className="col-9 col-lg-6"
                id="deadline"
                name="deadline"
                onChange={handleChange} />

            </div>

            <label for="applink" className="col-3 col-lg-3">Application Link</label>
              <input type="applink"
                value={applink}
                className="col-9 col-lg-6"
                id="applink"
                name="applink"
                onChange={handleChange}
                placeholder="Link to apply..." />
                <label for="applink" className="col-3 col-lg-3">Application e-mail</label>
              <input type="appemail"
                value={appemail}
                className="col-9 col-lg-6"
                id="appemail"
                name="appemail"
                onChange={handleChange}
                placeholder="Email address to apply..." />
              

            <div className="col-12 col-lg-9">
              <button className="btn btn-primary btn-block py-3" onClick={handleFormSubmit} type="submit">
                Add Scholarship
              </button>
            </div>
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your thoughts. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default ScholarshipForm;
