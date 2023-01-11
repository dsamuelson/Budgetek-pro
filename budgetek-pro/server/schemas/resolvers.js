const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        getSingleUser: async (parent, {username}) => {
          console.log(username)
            const userData = await User.findOne({username})
                .select('-__v -password')
                .populate('budgetEvents')
                .populate('bankAccounts');
            if (!userData) {
              const userDataEmail = await User.findOne({email: username})
                .select('-__v -password')
                .populate('budgetEvents')
                .populate('bankAccounts');
              return userDataEmail
            }
            return userData;
          },
          getAllUsers: async () => {
            const userArray = await User.find({})
                .select('-__v -password')
                .populate('budgetEvents')
                .populate('bankAccounts');
            return userArray;
          },
          me: async (parent, args, context) => {
            if (context.user) {
              const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password')
                .populate('budgetEvents')
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
          addHistEvents: async (parent, args, context) => {
            if (context.user) {
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                {
                  $addToSet: {
                    histEvents: {
                      histID: args.histID,
                      histTitle: args.histTitle,
                      histType: args.histType,
                      histValue: args.histValue,
                      histDates: args.histDate,
                      histCategory: args.histCategory,
                    },
                  },
                },
                { new: true },
              )
                .select('-__v -password')
                .populate('histEvents');
      
              return updatedUser;
            }
      
            throw new AuthenticationError('You must be logged in');
          },
          updateHistEvents: async (parent, args, context) => {
            if (context.user) {
              let tempVals = [];
              for (let i = 0 ; i < Object.keys(args).length; i ++) {
                let oKeys = Object.keys(args)[i];
                let oVals = Object.values(args)[i];
                tempVals.push({[`histEvent.$.${oKeys}`]: oVals})
              }
              let vals = {...tempVals.reduce(((r, c) => Object.assign(r, c)), {})}
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id, "histEvents._id": args._id },
                {...vals},
                { new: true},
              )
                .select('-__v -password')
                .populate('histEvents');
      
              return updatedUser;
            }
      
            throw new AuthenticationError('You must be logged in');
          },
          removeHistEvent: async (parent, args, context) => {
            if (context.user) {
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id},
                {
                  $pull: {histEvents: { _id: args._id }}
                },
                { new: true }
              )
              .select('-__v')
              .populate('histEvents')
              return updatedUser
            }
            throw new AuthenticationError('You must be logged in')
          },
          addBudgetEvent: async (parent, args, context) => {
            if (context.user) {
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                {
                  $addToSet: {
                    budgetEvents: {
                      eventTitle: args.eventTitle,
                      eventValue: args.eventValue,
                      eventType: args.eventType,
                      eventFrequency: [...args.eventFrequency],
                      vitalEvent: args.vitalEvent,
                      eventCategory: args.eventCategory,
                      totalEventValue: args.totalEventValue,
                      eventAPR: args.eventAPR,
                      eventDate: args.eventDate,
                      iouInfo: [...args.iouInfo]
                    },
                  },
                },
                { new: true },
              )
                .select('-__v -password')
                .populate('budgetEvents');
      
              return updatedUser;
            }
      
            throw new AuthenticationError('You must be logged in');
          },
          updateBudgetEvent: async (parent, args, context) => {
            if (context.user) {
              let tempVals = [];
              for (let i = 0 ; i < Object.keys(args).length; i ++) {
                let oKeys = Object.keys(args)[i];
                let oVals = Object.values(args)[i];
                tempVals.push({[`budgetEvents.$.${oKeys}`]: oVals})
              }
              let vals = {...tempVals.reduce(((r, c) => Object.assign(r, c)), {})}
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id, "budgetEvents._id": args._id },
                {...vals},
                { new: true},
              )
                .select('-__v -password')
                .populate('budgetEvents');
      
              return updatedUser;
            }
      
            throw new AuthenticationError('You must be logged in');
          },
          addIOU: async (parent, args, context) => {
            if (context.user) {
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id, "budgetEvents._id": args.iouId},
                {
                  $addToSet: {
                    "budgetEvents.$.iouInfo": [...args.iouInfo]
                  }
                },
                { new: true },
              )
                .select('-__v -password')
                .populate('budgetEvents');
      
              return updatedUser;
            }
      
            throw new AuthenticationError('You must be logged in');
          },
          removeIOU: async (parent, args, context) => {
            if (context.user) {
              const updatedUser = await User.findOneAndUpdate(
                {_id: context.user._id, 'budgetEvents._id': args.expenseId},
                {
                  $pull: { "budgetEvents.$.iouInfo": {_id: args._id}}
                },
                { new: true }
              )
              .select('-__v')
              .populate('budgetEvents')

              return updatedUser;
            }
            throw new AuthenticationError('You must be logged in')
          },
          removeBudgetEvent: async (parent, args, context) => {
            if (context.user) {
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id},
                {
                  $pull: { budgetEvents: { _id: args._id }}
                },
                { new: true }
              )
              .select('-__v')
              .populate('budgetEvents')
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