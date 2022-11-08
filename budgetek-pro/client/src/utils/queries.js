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
        incomeInterest
        incomeFrequency {
          _id
          frequency
          isSameDay
          countWeekends
          hasCustom
          nValue
          nUnit
          day
          month
        }
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
        expenseFrequency {
          _id
          frequency
          isSameDay
          countWeekends
          hasCustom
          nValue
          nUnit
          day
          month
        }
        vitalExpense
        expenseCategory
        totalExpenseValue
        expenseAPR
        dueDate
        iouInfo {
          _id
          iouTitle
          iouValue
          iouPaid
        }
      }
      totalExpense
      totalDebt
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
            incomeInterest
            incomeFrequency {
              _id
              frequency
              isSameDay
              countWeekends
              hasCustom
              nValue
              nUnit
              day
              month
            }
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
            expenseFrequency {
              _id
              frequency
              isSameDay
              countWeekends
              hasCustom
              nValue
              nUnit
              day
              month
            }
            vitalExpense
            expenseCategory
            totalExpenseValue
            expenseAPR
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
          totalDebt
      }
    }
`;