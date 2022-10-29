import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation createUser(
    $username: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      username: $username
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_EXPENSE = gql`
  mutation addExpense($expenseTitle: String!, $expenseValue: String!, $expenseFrequency: String!, $vitalExpense: Boolean, $expenseCategory: String, $totalExpenseValue: String, $dueDate: String, $iouInfo: [IOUi!]) {
    addExpense(expenseTitle: $expenseTitle, expenseValue: $expenseValue, expenseFrequency: $expenseFrequency, vitalExpense: $vitalExpense, expenseCategory: $expenseCategory, totalExpenseValue: $totalExpenseValue, dueDate: $dueDate, iouInfo: $iouInfo) {
      _id
      expenses {
        _id
        iouInfo {
          _id
          iouTitle
          iouValue
          iouPaid
        }
      }
    }
  }
`;

export const REMOVE_EXPENSE = gql`
  mutation removeExpense($_id: String!) {
    removeExpense(_id: $_id){
      _id
    }
  }
`;

export const ADD_INCOME = gql`
  mutation addIncome($incomeTitle: String!, $incomeValue: String!, $incomeFrequency: [incomeFrequencyi]!, $primaryIncome: Boolean!, $payDay: String, $uomePayInfo: [UOMEi!]) {
    addIncome(incomeTitle: $incomeTitle, incomeValue: $incomeValue, incomeFrequency: $incomeFrequency, primaryIncome: $primaryIncome, payDay: $payDay, uomePayInfo: $uomePayInfo) {
      _id
      incomes {
        _id
        incomeTitle
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
        uomePayInfo {
          _id
          uomeTitle
          uomeValue
          uomePaid
        }
      }
    }
  }
`;

export const REMOVE_INCOME = gql`
  mutation removeIncome($_id: String!) {
    removeIncome(_id: $_id) {
      _id
    }
  }
`;

export const ADD_UOME = gql`
  mutation addUOME($uomeId: String!, $uomePayInfo: [UOMEi!]!) {
    addUOMe(uomeId: $uomeId, uomePayInfo: $uomePayInfo) {
      _id
      incomes {
        incomeTitle
        uomePayInfo {
          _id
          uomeTitle
          uomeValue
          uomePaid
        }
      }
    }
  }
`;

export const REMOVE_UOME = gql`
  mutation removeUOMe($id: String!, $incomeId: String!) {
    removeUOMe(_id: $id, incomeId: $incomeId) {
      _id
      incomes {
        _id
        incomeTitle
        uomePayInfo {
          _id
          uomeTitle
          uomeValue
          uomePaid
        }
      }
    }
  }
`;