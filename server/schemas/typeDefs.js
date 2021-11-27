const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    usertype: String
    email: String
    password: String
    definedScholarships: [Scholarship]!
    pickedScholarships: [Scholarship]!
  }

  type Scholarship {
    _id: ID
    title: String
    type: String
    description: String
    amount: Int
    deadline: String
    ethnicity: [String]
    disability: [String]
    levelofstudy: [String]
    gender: [String]
    applink: String
    appemail: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    allScholarships: [Scholarship]
    scholarship(scholarshipId: ID!): Scholarship
    me: User
  }

  type Mutation {
    addUser(username: String!, usertype: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    deleteScholarship(username:String!,scholarshipId:ID!): Scholarship
    pickScholarship(username:String!,scholarshipId:ID!): User
    dropScholarship(username:String!,scholarshipId:ID!): User
    addScholarship(username:String!,title: String!, type: String!, description: String, deadline: String!, amount: Int!, ethnicity:[String!], disability: [String!],levelofstudy: [String!], gender: [String!], applink: String, appemail: String): Scholarship
  }
`;

module.exports = typeDefs;
