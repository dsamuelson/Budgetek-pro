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
                      incomeInterest: args.incomeInterest,
                      incomeFrequency: [...args.incomeFrequency],
                      primaryIncome: args.primaryIncome,
                      payDay: args.payDay,
                      uomePayInfo: [...args.uomePayInfo]
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
          updateIncome: async (parent, args, context) => {
            if (context.user) {
              let tempVals = [];
              for (let i = 0 ; i < Object.keys(args).length; i ++) {
                let oKeys = Object.keys(args)[i];
                let oVals = Object.values(args)[i];
                tempVals.push({[`incomes.$.${oKeys}`]: oVals})
              }
              let vals = {...tempVals.reduce(((r, c) => Object.assign(r, c)), {})}
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id, "incomes._id": args._id },
                {...vals},
                { new: true},
              )
                .select('-__v -password')
                .populate('incomes');
      
              return updatedUser;
            }
      
            throw new AuthenticationError('You must be logged in');
          },
          addUOMe: async (parent, args, context) => {
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
          removeUOMe: async (parent, args, context) => {
            if (context.user) {
              const updatedUser = await User.findOneAndUpdate(
                {_id: context.user._id, 'incomes._id': args.incomeId},
                {
                  $pull: { "incomes.$.uomePayInfo": {_id: args._id}}
                },
                { new: true }
              )
              .select('-__v')
              .populate('incomes')

              return updatedUser;
            }
            throw new AuthenticationError('You must be logged in')
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
                      expenseFrequency: [...args.expenseFrequency],
                      vitalExpense: args.vitalExpense,
                      expenseCategory: args.expenseCategory,
                      totalExpenseValue: args.totalExpenseValue,
                      expenseAPR: args.expenseAPR,
                      dueDate: args.dueDate,
                      iouInfo: [...args.iouInfo]
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
          updateExpense: async (parent, args, context) => {
            if (context.user) {
              let tempVals = [];
              for (let i = 0 ; i < Object.keys(args).length; i ++) {
                let oKeys = Object.keys(args)[i];
                let oVals = Object.values(args)[i];
                tempVals.push({[`expenses.$.${oKeys}`]: oVals})
              }
              let vals = {...tempVals.reduce(((r, c) => Object.assign(r, c)), {})}
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id, "expenses._id": args._id },
                {...vals},
                { new: true},
              )
                .select('-__v -password')
                .populate('expenses');
      
              return updatedUser;
            }
      
            throw new AuthenticationError('You must be logged in');
          },
          addIOU: async (parent, args, context) => {
            if (context.user) {
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id, "expenses._id": args.iouId},
                {
                  $addToSet: {
                    "expenses.$.iouInfo": [...args.iouInfo]
                  }
                },
                { new: true },
              )
                .select('-__v -password')
                .populate('expenses');
      
              return updatedUser;
            }
      
            throw new AuthenticationError('You must be logged in');
          },
          removeIOU: async (parent, args, context) => {
            if (context.user) {
              const updatedUser = await User.findOneAndUpdate(
                {_id: context.user._id, 'expenses._id': args.expenseId},
                {
                  $pull: { "expenses.$.iouInfo": {_id: args._id}}
                },
                { new: true }
              )
              .select('-__v')
              .populate('expenses')

              return updatedUser;
            }
            throw new AuthenticationError('You must be logged in')
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
              const updatedAccount = await User.findOneAndUpdate(
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