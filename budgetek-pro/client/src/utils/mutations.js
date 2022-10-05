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
mutation addExpense($expenseTitle: String!, $expenseValue: String!, $expenseFrequency: String!, $vitalExpense: Boolean, $expenseCategory: String, $dueDate: String) {
  addExpense(expenseTitle: $expenseTitle, expenseValue: $expenseValue, expenseFrequency: $expenseFrequency, vitalExpense: $vitalExpense, expenseCategory: $expenseCategory, dueDate: $dueDate) {
    _id
    expenseTitle
    expenseValue
    expenseFrequency
    vitalExpense
    expenseCategory
    dueDate
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
mutation addIncome($incomeTitle: String!, $incomeValue: String!, $incomeFrequency: String!, $primaryIncome: Boolean!, $payDay: String) {
  addIncome(incomeTitle: $incomeTitle, incomeValue: $incomeValue, incomeFrequency: $incomeFrequency, primaryIncome: $primaryIncome, payDay: $payDay) {
    _id
    incomeTitle
    incomeValue
    incomeFrequency
    primaryIncome
    payDay
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