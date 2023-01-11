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

export const ADD_BUDGET_EVENT = gql`
  mutation addBudgetEvent($eventTitle: String!, $eventValue: String!, $eventType: String!, $eventFrequency: [eventFrequencyi]!, $vitalEvent: Boolean, $eventCategory: String, $totalEventValue: String, $eventAPR: String, $eventDate: String, $iouInfo: [IOUi!]) {
    addBudgetEvent(eventTitle: $eventTitle, eventValue: $eventValue, eventType: $eventType, eventFrequency: $eventFrequency, vitalEvent: $vitalEvent, eventCategory: $eventCategory, totalEventValue: $totalEventValue, eventAPR: $eventAPR, eventDate: $eventDate, iouInfo: $iouInfo) {
      _id
      budgetEvents {
        _id
        eventTitle
        eventValue
        eventType
        eventFrequency {
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
        vitalEvent
        eventCategory
        totalEventValue
        eventAPR
        iouInfo {
          _id
          iouTitle
          iouValue
          iouPaid
        }
        eventDate
      }
    }
  }
`;

export const UPDATE_BUDGET_EVENT = gql`
mutation updateBudgetEvent($_id: String!, $eventTitle: String, $eventValue: String, $vitalEvent: Boolean, $eventCategory: String, $totalEventValue: String, $eventAPR: String, $eventDate: String){
  updateBudgetEvent(_id: $_id, eventTitle: $eventTitle, eventValue: $eventValue, vitalEvent: $vitalEvent, eventCategory: $eventCategory, totalEventValue: $totalEventValue, eventAPR: $eventAPR, eventDate: $eventDate){
    _id
    budgetEvents {
      _id
      eventTitle
      eventValue
      eventType
      eventFrequency {
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
      vitalEvent
      eventCategory
      totalEventValue
      eventAPR
      iouInfo {
        _id
        iouTitle
        iouValue
        iouPaid
      }
      eventDate
    }
  }
}
`;


export const REMOVE_BUDGET_EVENT = gql`
  mutation removeBudgetEvent($_id: String!) {
    removeBudgetEvent(_id: $_id){
      _id
    }
  }
`;

export const ADD_HIST_EVENT = gql`
mutation addHistEvent($histTitle: String!, $histType: String!, $histValue: String!, $histCategory: String, $histDate: String!, $histID: String){
  addHistEvent(histTitle: $histTitle, histType: $histType, histValue: $histValue, histCategory: $histCategory, histDate: $histDate, histID: $histID){
    _id
      histEvents {
        _id
        histID
        histTitle
        histType
        histValue
        histCategory
        histDate
      }
  }
}
`;

export const UPDATE_HIST_EVENT = gql`
mutation updateHistEvent($_id: String!, $histTitle: String, $histType: String, $histValue: String, $histCategory: String, $histDate: String, $histID: String, ){
  updateHistEvent(_id: $_id, histTitle: $histTitle, histType: $histType, histValue: $histValue, histCategory: $histCategory, histDate: $histDate, histID: $histID){
    _id
      histEvents {
        _id
        histID
        histTitle
        histType
        histValue
        histCategory
        histDate
      }
  }
}
`;


export const REMOVE_HIST_EVENT = gql`
  mutation removeHistEvent($_id: String!) {
    removeHistEvent(_id: $_id){
      _id
    }
  }
`;