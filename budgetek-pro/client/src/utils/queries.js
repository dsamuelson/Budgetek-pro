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
        _id
        incomeTitle
        incomeValue
        incomeFrequency
        primaryIncome
        payDay
        uomePayInfo {
          _id
          uomeTitle
          uomeValue
          uomePaid
        }
      }
      totalIncome
    }
  }
`;

export const QUERY_EXPENSES = gql`
  {
    me {
      expenses {
        _id
        expenseTitle
        expenseValue
        expenseFrequency
        vitalExpense
        expenseCategory
        dueDate
        iouInfo {
          _id
          iouTitle
          iouValue
          iouPaid
        }
      }
      totalExpense
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
            uomePayInfo {
              _id
              uomeTitle
              uomeValue
              uomePaid
            }
          }
          expenses {
            _id
            expenseTitle
            expenseValue
            expenseFrequency
            vitalExpense
            expenseCategory
            dueDate
            iouInfo {
              _id
              iouTitle
              iouValue
              iouPaid
            }
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
          totalIncome
      }
    }
`;