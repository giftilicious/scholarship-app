import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $usertype: String!, $email: String!, $password: String!) {
    addUser(username: $username, usertype: $usertype, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_SCHOLARSHIP = gql`
mutation addScholarship(
  $username: String!
  $title: String!
  $type: String!
  $description: String
  $deadline: String!
  $amount: Int!
  $ethnicity: [String!]
  $disability: [String!]
  $levelofstudy: [String!]
  $gender: [String!]
  $applink: String
  $appemail: String
) 
{
  addScholarship(
    username: $username
    title: $title
    type: $type
    description: $description
    deadline: $deadline
    amount: $amount
    ethnicity: $ethnicity
    disability: $disability
    levelofstudy: $levelofstudy
    gender: $gender
    applink: $applink
    appemail: $appemail
  ) 
  {
    title
    type
  }
}
`;

export const DELETE_SCHOLARSHIPS = gql`
mutation deleteScholarship($username: String!,$scholarshipId: ID!) 
{
  deleteScholarship(username:$username, scholarshipId:$scholarshipId)
  {
    title
  } 
}
`;
export const PICK_SCHOLARSHIPS = gql`
mutation pickScholarship($username: String! $scholarshipId: ID!)
{
  pickScholarship(
    username: $username
    scholarshipId: $scholarshipId
  ) 
  {
    _id
      username
    	usertype
      email
      definedScholarships {
        title
        type
        description
        amount
        ethnicity
        disability
        levelofstudy
        gender
        applink
        appemail
      }
      pickedScholarships {
        title
        type
        description
        amount
        ethnicity
        disability
        levelofstudy
        gender
        applink
        appemail
      }
    }
  }
`;
export const DROP_SCHOLARSHIPS = gql`
mutation dropScholarship($username: String! $scholarshipId: ID!)
{
  dropScholarship(username: $username scholarshipId: $scholarshipId)
  {
    _id
      username
    	usertype
      email
      definedScholarships {
        title
        type
        description
        amount
        ethnicity
        disability
        levelofstudy
        gender
        applink
        appemail
      }
      pickedScholarships {
        title
        type
        description
        amount
        ethnicity
        disability
        levelofstudy
        gender
        applink
        appemail
      }
    }
  }
`;
