import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query user($username: String!) {
  user(username: $username) {
    _id
    username
  usertype
    email
  definedScholarships{
          _id
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
  pickedScholarships{
          _id
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

export const QUERY_SCHOLARSHIP = gql`
query scholarship($scholarshipId: ID!) {
  scholarship(scholarshipId: $scholarshipId) {
      _id
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
`;




