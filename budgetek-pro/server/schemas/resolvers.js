const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        getSingleUser: async (parent, { username }) => {
            const userData = await User.findOne({ username })
                .select('-__v -password')
                .populate('incomes')
                .populate('expenses');
      
            return userData;
          },
          getAllUsers: async () => {
            const userArray = await User.find({})
                .select('-__v -password')
                .populate('incomes')
                .populate('expenses');
            return userArray;
          },
          me: async (parent, args, context) => {
            if (context.user) {
              const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password')
                .populate('incomes')
                .populate('expenses');
      
              return userData;
            }
            throw new AuthenticationError('Not logged In');
          },
    },
    Mutation: {
        createUser: async (parent, args) => {
          const user = await User.create(args);
          const token = signToken(user);
          return { token, user };
        },
        login: async (parent, { email, password }) => {
          const user = await User.findOne({ email });
    
          if (!user) {
            throw new AuthenticationError('Incorrect Credentials');
          }
    
          const correctPw = await user.isCorrectPassword(password);
    
          if (!correctPw) {
            throw new AuthenticationError('Incorrect Credentials');
          }
    
          const token = signToken(user);
          return { token, user };
        },
        addIncome: async (parent, args, context) => {
            if (context.user) {
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                {
                  $addToSet: {
                    incomes: {
                      incomeTitle: args.incomeTitle,
                      incomeValue: args.incomeValue,
                      incomeFrequency: args.incomeFrequency,
                      primaryIncome: args.primaryIncome,
                      payDay: args.payDay
                    },
                  },
                },
                { new: true },
              )
                .select('-__v -password')
                .populate('incomes');
      
              return updatedUser;
            }
      
            throw new AuthenticationError('You must be logged in');
          },
          addExpense: async (parent, args, context) => {
            if (context.user) {
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                {
                  $addToSet: {
                    expenses: {
                      expenseTitle: args.expenseTitle,
                      expenseValue: args.expenseValue,
                      expenseFrequency: args.expenseFrequency,
                      vitalExpense: args.vitalExpense,
                      expenseCategory: args.expenseCategory,
                      dueDate: args.dueDate
                    },
                  },
                },
                { new: true },
              )
                .select('-__v -password')
                .populate('expenses');
      
              return updatedUser;
            }
      
            throw new AuthenticationError('You must be logged in');
          },
    }
}

module.exports = resolvers