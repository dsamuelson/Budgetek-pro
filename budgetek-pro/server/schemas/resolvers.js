const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        getSingleUser: async (parent, {username}) => {
          console.log(username)
            const userData = await User.findOne({username})
                .select('-__v -password')
                .populate('incomes')
                .populate('expenses')
                .populate('bankAccounts');
            if (!userData) {
              const userDataEmail = await User.findOne({email: username})
                .select('-__v -password')
                .populate('incomes')
                .populate('expenses')
                .populate('bankAccounts');
              return userDataEmail
            }
            return userData;
          },
          getAllUsers: async () => {
            const userArray = await User.find({})
                .select('-__v -password')
                .populate('incomes')
                .populate('expenses')
                .populate('bankAccounts');
            return userArray;
          },
          me: async (parent, args, context) => {
            if (context.user) {
              const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password')
                .populate('incomes')
                .populate('expenses')
                .populate('bankAccounts');
      
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
        login: async (parent, { username, password}) => {
          let user = await User.findOne({ username });
          
          if (!user) {
              user = await User.findOne({ email: username })
              if(!user) {
                throw new AuthenticationError('Incorrect Credentials');
              }
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
          addUOMe: async (parent, args, context) => {
            console.log([...args.uomePayInfo])
            if (context.user) {
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id, "incomes._id": args.uomeId},
                {
                  $addToSet: {
                    "incomes.$.uomePayInfo": [...args.uomePayInfo]
                  }
                },
                { new: true },
              )
                .select('-__v -password')
                .populate('incomes');
      
              return updatedUser;
            }
      
            throw new AuthenticationError('You must be logged in');
          },
          removeIncome: async (parent, args, context) => {
            if (context.user) {
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id},
                {
                  $pull: {incomes: { _id: args._id }}
                },
                { new: true }
              )
              .select('-__v')
              .populate('incomes')
              return updatedUser
            }
            throw new AuthenticationError('You must be logged in')
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
          removeExpense: async (parent, args, context) => {
            if (context.user) {
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id},
                {
                  $pull: { expenses: { _id: args._id }}
                },
                { new: true }
              )
              .select('-__v')
              .populate('expenses')
              return updatedUser
            }
            throw new AuthenticationError('You must be logged in')
          },
          addBankAccount: async (parent, args, context) => {
            if (context.user) {
              const updatedAccount = await user.findOneAndUpdate(
                {_id: context.user._id},
                {
                  $addToSet: {
                    bankAccounts: {
                      bankName: args.bankName,
                      accountIdentifier: args.accountIdentifier,
                      checkingValue: args.checkingValue,
                      savingsAccount: args.savingsAccount,
                      savingsValue: args.savingsValue
                    }
                  }
                },
                { new: true }
              )
                .select('-__v')
                .populate('bankAccounts');

              return updatedAccount;
            }
            throw new AuthenticationError('You Must be logged in')
          }
    }
}

module.exports = resolvers