import React, {useState, useEffect} from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import IncomesList from "../components/Incomes";
import ExpensesList from "../components/Expenses";
import IandEModal from "../components/IandEModal";
import OverviewBar from "../components/OverviewBar"
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_EVENTS } from "../utils/queries";
import { ADD_HIST_EVENT, UPDATE_BUDGET_EVENT } from '../utils/mutations';
import { idbPromise, compareDate, nextDate } from "../utils/helpers";
import { useSelector, useDispatch } from 'react-redux';
import Auth from "../utils/auth";
import EventsList from "../components/Events";
import GraphsView from "../components/Graphs";
import CalendarModal from "../components/CalendarModal";
import BudgetUtilizationModal from "../components/BudgetUtilizationModal";

const Home = () => {
  const [date, setDate] = useState(new Date())
  const [ meID, setMeID ] = useState('')
  const dispatch = useDispatch();
  const loggedIn = Auth.loggedIn()
  const {loading: eventsLoading, data: eventsData, refetch: eventsDataRefetch } = useQuery(QUERY_EVENTS)
  const stateTogglesStore = useSelector((state) => state.toggles)
  const IandEtoggle = stateTogglesStore.iande;
  const modalValue = stateTogglesStore.modalValue;
  const calcontVal = stateTogglesStore.calcontVal;
  const buVal = stateTogglesStore.buVal;
  const [calcontItems, setCalcontItems] = useState([])

  const [ addHistEvent ] = useMutation(ADD_HIST_EVENT)
  const [ updateBudgetEvent ] = useMutation(UPDATE_BUDGET_EVENT);


  useEffect(() => {
    if (loggedIn) {
    if (eventsData) {
      setMeID(eventsData.me._id)
      dispatch({
        type: "SHOW_MONTHLY_DEBT_CATEGORIES",
        monthlyExpensesperCategory: eventsData.me.monthlyCatagoryDebt
      })
      dispatch({
        type: "SHOW_MONTHLY_INCOME_CATEGORIES",
        monthlyIncomeperCategory: eventsData.me.monthlyCatagoryIncome
      })
      dispatch({
        type: "SHOW_TOTAL_DEBT_CATEGORIES",
        totalDebtPerCategory: eventsData.me.debtTotalperCatagory
      })
      dispatch({
        type: 'ADD_INCOMES',
        incomes: eventsData.me.budgetEvents.filter(budgetEvent => {return budgetEvent.eventType === 'income'})
      })
      dispatch({
        type: 'ADD_EXPENSES',
        expenses: eventsData.me.budgetEvents.filter(budgetEvent => {return budgetEvent.eventType === 'expense'})
      })
      eventsData.me.budgetEvents.forEach((idbEvent) => {
          idbPromise('budgetEvents', 'put', idbEvent)
      })
      dispatch({
        type: 'ADD_TO_HIST',
        histEvents: eventsData.me.histEvents
      })
      eventsData.me.histEvents.forEach((idbHistEvent) => {
          idbPromise('histEvents', 'put', idbHistEvent)
      }) 
    } else if (!eventsLoading) {
        idbPromise('budgetEvents', 'get').then((idbEvents) => {
            dispatch({
                type: "ADD_INCOMES",
                incomes: idbEvents.filter(budgetEvent => {return budgetEvent.eventType === 'income'})
            })
            dispatch({
              type: "ADD_EXPENSES",
              expenses: idbEvents.filter(budgetEvent => {return budgetEvent.eventType === 'expense'})
            })
        })
        idbPromise('histEvents', 'get').then((idbHistEvents) => {
          dispatch({
              type: "ADD_TO_HIST",
              histEvents: idbHistEvents
          })
        })
      }
    }
  },[eventsLoading, eventsData, IandEtoggle, loggedIn, eventsDataRefetch, dispatch])

  const eventsStore = useSelector((state) => state.internalEvents);
  const incomes = eventsStore.incomes;
  const expenses = eventsStore.expenses;
  const historyEvents = eventsStore.histEvents;

  //----Check calendar dates to display events----//
  function isDesiredDate(uUnit, currentDate) {
    currentDate.setHours(0,0,0,0)
    let eventFValue = uUnit.eventFrequency
    let eventDate = new Date(parseInt(uUnit.eventDate))
    if (eventFValue.frequency === "monthly") {
      eventDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), new Date(parseInt(uUnit.eventDate)).getDate())
    }
    eventDate.setHours(0,0,0,0)
    let eventnUnit = eventFValue.nUnit
    let eventnValue = eventFValue.nValue
    let lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
    let lastMonthEvent = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0)
    lastDay.setHours(0,0,0,0)

    if (eventFValue.isSameDay === 'lastDay') {
      eventDate = new Date(lastDay)
    }

    let onWeekend = eventDate.getDay() === 6 || eventDate.getDay() === 0
    let lMonWeekend = lastMonthEvent.getDay() === 6 || lastMonthEvent.getDay() === 0

    if (onWeekend && eventFValue.countWeekends === 'preWeekends') {
      while (eventDate.getDay() === 6 || eventDate.getDay() === 0) {
        eventDate = new Date(eventDate.setDate(eventDate.getDate() - 1))
      }
    } else if (onWeekend && eventFValue.countWeekends === 'postWeekends') {
      while (eventDate.getDay() === 6 || eventDate.getDay() === 0) {
        eventDate = new Date(eventDate.setDate(eventDate.getDate() + 1))
      }
    }

    if (lMonWeekend && eventFValue.countWeekends === 'postWeekends') {
      while (lastMonthEvent.getDay() === 6 || lastMonthEvent.getDay() === 0) {
        lastMonthEvent = new Date(lastMonthEvent.setDate(lastMonthEvent.getDate() + 1))
      }
    }

    if (eventDate.toDateString() === currentDate.toDateString() || currentDate.toDateString() === lastMonthEvent.toDateString() ||(eventFValue.frequency === 'other' && compareDate(eventnValue, eventnUnit, eventDate, currentDate.getTime())) || (eventFValue.frequency === 'daily') || (eventFValue.frequency === 'monthly' && currentDate.getDate() === eventDate.getDate()) || (eventFValue.frequency === 'yearly' && parseInt(currentDate.getMonth()) === parseInt(eventFValue.month) && parseInt(currentDate.getDate()) === parseInt(eventFValue.day))) {
      return true;
    }

    return false;
  }
//=========================================//

//----Update Pay Day or Due Date to the next closest event and send old event to History----//

  useEffect(() => {
    let uUnitArray = [...incomes, ...expenses]
    for (let i = 0; i < uUnitArray.length; i++) {
      if ( new Date(parseInt(uUnitArray[i].eventDate)).getTime() < new Date().getTime() ){
        let nextEventDate = new Date(nextDate(uUnitArray[i]))
        updatePDDDDate(uUnitArray[i], nextEventDate)
        if (eventsData.me.budgetEvents > 0) {
          addHistHandler(uUnitArray[i], new Date(parseInt(uUnitArray[i].eventDate)).getTime())
        }
        
      } 
    }
  }, [incomes, expenses, historyEvents])

  async function updatePDDDDate(uUnit, newDate) {
      if (uUnit) {
        try {
          await updateBudgetEvent({
              variables: {
                  _id: uUnit._id,
                  eventDate: newDate.toString()
              }
          });
        } catch (error) {
            console.log(error);
        }  
      }
    }
//===========================================//

  async function addHistHandler(event, histDate) {
    
    if (!histDate){
      histDate = new Date().getTime()
      histDate.setHours(0,0,0,0)
    }
    let histId = "UID" + meID + "EID" + event._id + "D" + histDate.toString()
    let histIDCompare = [];
    if (eventsData.me.histEvents.length > 0) {
      histIDCompare = eventsData.me.histEvents.filter((event) => {return event.histID === histId})
    }
    if (!eventsLoading && histIDCompare.length === 0){
      let histIOU = () => {
        let iouArray = []
        for (let i = 0; i < event.iouInfo.length; i++) {
          let iouObj = {
            iouTitle: event.iouInfo[i].iouTitle,
            iouValue: event.iouInfo[i].iouValue,
            iouPaid: event.iouInfo[i].iouPaid
          }
          iouArray.push(iouObj)
        }
        return iouArray;
      }
  
      try {
          await addHistEvent({
            variables: {
              histID: histId,
              eventID: event._id,
              eventTitle: event.eventTitle,
              eventValue: event.eventValue,
              eventType: event.eventType,
              eventFrequency:{
                frequency: event.eventFrequency.frequency,
                isSameDay:event.eventFrequency.isSameDay,
                countWeekends: event.eventFrequency.countWeekends,
                hasCustom: event.eventFrequency.hasCustom,
                nValue: event.eventFrequency.nValue,
                nUnit: event.eventFrequency.nUnit,
                day: event.eventFrequency.day,
                month: event.eventFrequency.month,
              },
              vitalEvent: event.vitalEvent,
              eventCategory: event.eventCategory,
              totalEventValue: event.totalEventValue,
              eventAPR: event.eventAPR,
              eventDate: event.eventDate,
              iouInfo: histIOU()
            }
          })
          eventsDataRefetch()
      } catch (e) {
          console.error(e)
      }
    }  
  }

  if (loggedIn) {
  return (
    <div className="homeCont">
      <OverviewBar />
      {IandEtoggle ? (
        <IncomesList />
      ) : (
        <ExpensesList />
      )}
      {(modalValue === 'Income' || modalValue === "Expense") && (
        <IandEModal />
      )}
      {buVal !== 'None' ? (
        <BudgetUtilizationModal />
      ) : null }
      <div className="calendarCont" onClick={(e)=>{
        if (e.target.localName) {
          let contentText = '';
          let contentDate = ``;
          if (e.target.localName === `li`) {
            contentDate = e.target.ownerDocument.activeElement.firstChild.ariaLabel
            contentText = e.target.parentElement.innerText
          } else if (e.target.localName === `span`) {
            contentDate = e.target.ownerDocument.activeElement.firstChild.ariaLabel
            contentText = e.target.parentElement.parentElement.innerText
          } else if (e.target.localName === `abbr`) {
            contentDate = e.target.ariaLabel
            contentText = e.target.parentElement.lastChild.innerText
          } else if (e.target.localName === `button`) {
            contentDate = e.target.firstChild.ariaLabel
            contentText = e.target.lastChild.innerText
          }
          setCalcontItems([contentDate, contentText])
        }
        }}>
     <Calendar 
        onChange={setDate} 
        value={date}
        onClickDay={() => {
          dispatch({
            type: 'TOGGLE_CALCONT_MODAL',
            calcontVal: true
          })
        }}
        tileContent={({ date, view }) => {
          let iandeContent = [...incomes, ...expenses]
            return (
              <div>
                <ul className="calendarViewUL">
                  {iandeContent.map((iandeUnit) => {
                    if (isDesiredDate(iandeUnit, date)) {
                      return (
                        <li
                        key={iandeUnit._id}>{iandeUnit.eventTitle}: <span className={iandeUnit.eventType + 'LI'} >${iandeUnit.eventValue}</span></li>
                      )
                    }                 
                    return null
                })}
                </ul>
              </div>
            )
          // }
        }}
        calendarType={"US"}
      /> 
      </div>
      {calcontVal && <div className="calContCont">
        <CalendarModal tileContent={calcontItems}/>
      </div>}
      <div className="eventsCont">
        <EventsList/>
      </div>
      <div className="graphsCont">
         <GraphsView/>
      </div>
    </div>
  );
} else {
  return (
    <div className="mBLoggedIn">
      <h2>Welcome to Budgetek!</h2>
      <p>In order to proceed please log in or Sign up!</p>
    </div>
  )
}
};

export default Home;