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
                .populate('histEvents');
            if (!userData) {
              const userDataEmail = await User.findOne({email: username})
                .select('-__v -password')
                .populate('budgetEvents')
                .populate('histEvents');
              return userDataEmail
            }
            return userData;
          },
          getAllUsers: async () => {
            const userArray = await User.find({})
                .select('-__v -password')
                .populate('budgetEvents')
                .populate('histEvents');
            return userArray;
          },
          me: async (parent, args, context) => {
            if (context.user) {
              const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password')
                .populate('budgetEvents')
                .populate('histEvents');
      
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
          addHistEvent: async (parent, args, context) => {
            console.log(args)
            if (context.user) {
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                {
                  $addToSet: {
                    histEvents: {
                      histID: args.histID,
                      eventID: args.eventID,
                      histTitle: args.eventTitle,
                      histValue: args.eventValue,
                      histType: args.eventType,
                      histFrequency: args.eventFrequency,
                      histVitalEvent: args.vitalEvent,
                      histCategory: args.eventCategory,
                      totalHistEventValue: args.totalEventValue,
                      histAPR: args.eventAPR,
                      histDate: args.eventDate,
                      histIOUInfo: [...args.iouInfo]
                    },
                  },
                },
                { runValidators: true, new: true },
              )
                .select('-__v -password')
                .populate('histEvents')
                .catch(response => {
                  console.log(response)
                })
      
              return updatedUser;
            }
      
            throw new AuthenticationError('You must be logged in');
          },
          updateHistEvent: async (parent, args, context) => {
            if (context.user) {
              let tempVals = [];
              for (let i = 0 ; i < Object.keys(args).length; i ++) {
                let oKeys = Object.keys(args)[i];
                let oVals = Object.values(args)[i];
                tempVals.push({[`histEvent.$.${oKeys}`]: oVals})
              }
              let vals = {...tempVals.reduce(((r, c) => Object.assign(r, c)), {})}
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id, "histEvents.histID": args.histID },
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
                  $pull: {histEvents: { histID: args.histID } || { _id: args._id }}
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
            console.log(args)
            if (context.user) {
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                {
                  $addToSet: {
                    budgetEvents: {
                      eventTitle: args.eventTitle,
                      eventValue: args.eventValue,
                      eventType: args.eventType,
                      eventFrequency: args.eventFrequency,
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
          rsUdata: async (parent, args, context) => {
            if (context.user) {
              const refreshedUser = await User.findOneAndUpdate(
                {_id: context.user._id},
                {
                  $set: {
                    bankAccounts: [],
                    budgetEvents: [],
                    histEvents: []
                  }
                },
                { new: true }
              )
              .select('-__v -password')
              return refreshedUser
            }
            throw new AuthenticationError("You Don't have Authorization to do this")
          },
          rsBEdata: async (parent, args, context) => {
            if (context.user) {
              const refreshedUser = await User.findOneAndUpdate(
                {_id: context.user._id},
                {
                  $set: {
                    budgetEvents: []
                  }
                },
                { new: true }
              )
              .select('-__v -password')
              return refreshedUser
            }
            throw new AuthenticationError("You Don't have Authorization to do this")
          },
          rsHEdata: async (parent, args, context) => {
            if (context.user) {
              const refreshedUser = await User.findOneAndUpdate(
                {_id: context.user._id},
                {
                  $set: {
                    histEvents: []
                  }
                },
                { new: true }
              )
              .select('-__v -password')
              return refreshedUser
            }
            throw new AuthenticationError("You Don't have Authorization to do this")
          },
          rsBAdata: async (parent, args, context) => {
            if (context.user) {
              const refreshedUser = await User.findOneAndUpdate(
                {_id: context.user._id},
                {
                  $set: {
                    bankAccounts: []
                  }
                },
                { new: true }
              )
              .select('-__v -password')
              return refreshedUser
            }
            throw new AuthenticationError("You Don't have Authorization to do this")
          },
    }
}

module.exports = resolvers