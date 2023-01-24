import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  {
    user {
      username
      email
    }
  }
`;

export const QUERY_BUDGET_EVENTS = gql`
  {
    me {
      _id
      budgetEvents {
        _id
        eventTitle
        eventValue
        eventType
        eventFrequency {
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
      monthlyCatagoryDebt
      debtTotalperCatagory
      monthlyCatagoryIncome
    }
  }
`;

export const QUERY_EVENTS = gql`
  {
    me {
      _id
      budgetEvents {
        _id
        eventTitle
        eventValue
        eventType
        eventFrequency {
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
        eventID
        histTitle
        histValue
        histType
        histFrequency {
          frequency
          isSameDay
          countWeekends
          hasCustom
          nValue
          nUnit
          day
          month
        }
        histVitalEvent
        histCategory
        totalHistEventValue
        histAPR
        histIOUInfo {
          _id
          iouTitle
          iouValue
          iouPaid
        }
        histDate
      }
      totalExpense
      totalIncome
      totalDebt
      monthlyCatagoryDebt
      debtTotalperCatagory
      monthlyCatagoryIncome
    }
  }
`;

export const QUERY_HIST_EVENTS = gql`
  {
    me {
      _id
      histEvents {
        _id
        histID
        eventID
        histTitle
        histValue
        histType
        histFrequency {
          frequency
          isSameDay
          countWeekends
          hasCustom
          nValue
          nUnit
          day
          month
        }
        histVitalEvent
        histCategory
        totalHistEventValue
        histAPR
        histIOUInfo {
          _id
          iouTitle
          iouValue
          iouPaid
        }
        histDate
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
            eventID
            histTitle
            histValue
            histType
            histFrequency {
              frequency
              isSameDay
              countWeekends
              hasCustom
              nValue
              nUnit
              day
              month
            }
            histVitalEvent
            histCategory
            totalHistEventValue
            histAPR
            histIOUInfo {
              _id
              iouTitle
              iouValue
              iouPaid
            }
            histDate
          }
          totalExpense
          totalIncome
          totalDebt
          monthlyCatagoryDebt
          debtTotalperCatagory
          monthlyCatagoryIncome
      }
    }
`;