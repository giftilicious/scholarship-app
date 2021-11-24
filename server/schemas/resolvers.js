const { AuthenticationError } = require('apollo-server-express');
const { User, Scholarship } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('definedScholarships');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('definedScholarships');
    },
    allScholarships: async () => {
      return Scholarship.find().sort({ createdAt: -1 });
    },
    scholarship: async (parent, { scholarshipId }) => {
      return Scholarship.findOne({ _id: scholarshipId });
    },
  },

  Mutation: {
    addUser: async (parent, { username, usertype, email, password }) => {
      const user = await User.create({ username, usertype, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addScholarship: async (parent, { username, title, type, description, deadline, amount, ethnicity, disability,levelofstudy, gender, applink, appemail}) => {
      console.log(username)
      console.log(title)
   
      const scholarship = await Scholarship.create({ title, type, description, deadline, amount, ethnicity, disability,levelofstudy, gender, applink, appemail});

      await User.findOneAndUpdate(
        { username: username },
        { $addToSet: { definedScholarships: scholarship._id } }
      );

      return scholarship;
    },
    deleteScholarship: async (parent, { username, scholarshipId }) => {
      console.log(scholarshipId);
      await User.findOneAndUpdate(
        { username: username },
        { $pull: { definedScholarships: scholarshipId } }
      );
      return Scholarship.findOneAndDelete({ _id: scholarshipId });
    },
    pickScholarship: async (parent, { username, scholarshipId}) => {
  
      await User.findOneAndUpdate(
        { username: username },
        { $addToSet: { pickedScholarships: scholarshipId } }
      );

      return User.findOne({ username }).populate('pickedScholarships');
    },
    dropScholarship: async (parent, { username, scholarshipId }) => {
      console.log(scholarshipId);
      await User.findOneAndUpdate(
        { username: username },
        { $pull: { pickedScholarships: scholarshipId } }
      );
      return User.findOne({ username }).populate('pickedScholarships');
    },
  },
};

module.exports = resolvers;
