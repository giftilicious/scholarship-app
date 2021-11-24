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
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_THOUGHT = gql`
  mutation addThought($thoughtText: String!, $thoughtAuthor: String!) {
    addThought(thoughtText: $thoughtText, thoughtAuthor: $thoughtAuthor) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment(
    $thoughtId: ID!
    $commentText: String!
    $commentAuthor: String!
  ) {
    addComment(
      thoughtId: $thoughtId
      commentText: $commentText
      commentAuthor: $commentAuthor
    ) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
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
  $value: Int!
  $deadline: String!
  $ethnicity: [String!]
  $disability: [String!]
  $levelofstudy: [String!]
  $gender: [String!]
  $applink: String
  $appemail: String
) {
  addScholarship(
    username: $username
    title: $title
    type: $type
    description: $description
    value: $value
    deadline: $deadline
    ethnicity: $ethnicity
    disability: $disability
    levelofstudy: $levelofstudy
    gender: $gender
    applink: $applink
    appemail: $appemail
  ) {
    title
    type
    description
    value
    ethnicity
    disability
    levelofstudy
    gender
    applink
    appemail
  }
}
`;

