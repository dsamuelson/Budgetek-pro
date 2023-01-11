import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  {
    user {
      username
      email
    }
  }
`;

export const QUERY_EVENTS = gql`
  {
    me {
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
        eventDate
        iouInfo {
          _id
          iouTitle
          iouValue
          iouPaid
        }
      }
      totalExpense
      totalIncome
      totalDebt
    }
  }
`;

export const QUERY_HIST_EVENTS = gql`
  {
    me {
      histEvent {
        _id
        histID
        histTitle
        histType
        histValue
        histCategory
        histDates
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
            eventDate
            iouInfo {
              _id
              iouTitle
              iouValue
              iouPaid
            }
          }
          histEvents {
            _id
            histID
            histTitle
            histType
            histValue
            histCategory
            histDates
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