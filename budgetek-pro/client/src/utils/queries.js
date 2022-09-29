import { gql } from '@apollo/client';

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      username
      email
    }
  }
`;

export const QUERY_INCOMES = gql`
  {
    me {
      incomes {
        incomeTitle
        incomeValue
        incomeFrequency
        primaryIncome
        payDay
      }
    }
  }
`;

export const QUERY_EXPENSES = gql`
  {
    me {
      expenses {
        expenseTitle
        expenseValue
        expenseFrequency
        vitalExpense
        expenseCategory
        dueDate
      }
    }
  }
`;

export const QUERY_ME = gql`
    {
      me {
          _id
          username
          email
          incomes {
            _id
            incomeTitle
            incomeValue
            incomeFrequency
            primaryIncome
            payDay
          }
          expenses {
            _id
            expenseTitle
            expenseValue
            expenseFrequency
            vitalExpense
            expenseCategory
            dueDate
          }
          bankAccounts {
            _id
            bankName
            accountIdentifier
            checkingValue
            savingsAccount
            savingsValue
          }
          totalExpense
      }
    }
`;