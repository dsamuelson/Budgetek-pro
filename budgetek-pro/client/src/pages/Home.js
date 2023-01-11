import React, {useState, useEffect} from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import IncomesList from "../components/Incomes";
import ExpensesList from "../components/Expenses";
import IandEModal from "../components/IandEModal";
import EditModal from "../components/EditModal";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_EVENTS, QUERY_HIST_EVENTS } from "../utils/queries";
import { ADD_HIST_EVENT, UPDATE_BUDGET_EVENT } from '../utils/mutations';
import { addDate, idbPromise, compareDate, nextDate } from "../utils/helpers";
import { useSelector, useDispatch } from 'react-redux';
import Auth from "../utils/auth";
import EventsList from "../components/Events";
import GraphsView from "../components/Graphs";
import CalendarModal from "../components/CalendarModal";

const Home = () => {
  
  const [date, setDate] = useState(new Date())
  const [budgetEventsList, setBudgetEventsList] = useState([])
  const [graphsData, setGraphsData] = useState([])
  const [histData, setHistData] = useState([])
  const [tempEventArray, setEventTempArray] = useState([])
  const [tempGraphArray, setTempGraphArray] = useState([])
  const [tempHistArray, setTempHistArray] = useState([])
  const dispatch = useDispatch();
  const loggedIn = Auth.loggedIn()
  const {loading: eventsLoading, data: eventsData, refetch: eventsDataRefetch } = useQuery(QUERY_EVENTS)
  const {loading: histLoading, data: dbHistData, refetch: dbHistDataRefetch} = useQuery(QUERY_HIST_EVENTS)
  const IandEtoggleStore = useSelector((state) => state.iande);
  const IandEtoggle = IandEtoggleStore.iande;
  const modalValueStore = useSelector((state) => state.modalValue);
  const modalValue = modalValueStore.modalValue;
  const incomesStore = useSelector((state) => state.incomes);
  const incomes = incomesStore.incomes;
  const expensesStore = useSelector((state) => state.expenses)
  const expenses = expensesStore.expenses;
  const calcontValStore = useSelector((state) => state.calcontVal);
  const calcontVal = calcontValStore.calcontVal;
  const [calcontItems, setCalcontItems] = useState([])

  const [ addHistEvent ] = useMutation(ADD_HIST_EVENT)
  const [ updateBudgetEvent ] = useMutation(UPDATE_BUDGET_EVENT);


    useEffect(() => {
      if (loggedIn) {
        eventsDataRefetch()
      if (eventsData) {
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
      }
    }
  },[eventsLoading, eventsData, IandEtoggle, loggedIn, eventsDataRefetch, dispatch])

  function updatebudgetEventsList(base) {
    let bdoeID = base.doeID
    let bID = base.iandeEvent._id;
    let bEvent = base.iandeEvent.eventTitle;
    let bValue = base.iandeEvent.eventValue;
    let bClass = base.iandeEvent.eventType;
    let hClass = base.iandeEvent.eventType;
    let bDateofEvent = base.dateofEvent;
    let hCategory = base.iandeEvent.eventCategory

    let baseData = [{doeID: bdoeID, id: bID, iandeEvent: bEvent, iandeValue: bValue, eventClass: bClass, dateofEvent: bDateofEvent}]
    let bhistData = [{histID: bdoeID, histTitle: bEvent, histValue: bValue, histType: hClass, histCategory: hCategory, histDate: bDateofEvent}]

    if (!budgetEventsList.some(e => e.doeID === bdoeID) && !budgetEventsList.some(e=> e.doeID === undefined)){
      if (bDateofEvent > (new Date().getTime() - 86400000) && (bDateofEvent < new Date(addDate(7, 'days', new Date().getTime())).getTime())) {
        setEventTempArray((prev) => [...prev, ...baseData])
      } 
    }
    if (!graphsData.some(e => e.doeID === bdoeID) && !graphsData.some(e=> e.doeID === undefined)){
      if (new Date().getMonth() === new Date(bDateofEvent).getMonth()) {
        setTempGraphArray((prev) => [...prev, base])
      } 
    }
    if (!tempHistArray.some(e => e.histID === bdoeID) && !tempHistArray.some(e=> e.histID === undefined)){
      if (new Date(bDateofEvent).getMonth() === new Date().getMonth()) {
        setTempHistArray((prev) => [...prev, ...bhistData])
      } 
    }
  }
  //----Check calendar dates to display events----//
  function isDesiredDate(uUnit, currentDate) {
    currentDate.setHours(0,0,0,0)
    let eventFValue = uUnit.eventFrequency[0]
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
      if ( new Date(parseInt(uUnit.eventDate)).getTime() < new Date().getTime() ) {
        let nextEventDate = new Date(nextDate(uUnit))
        updatePDDDDate(uUnit, nextEventDate)
      }
      return true;
    }

    return false;
  }
//=========================================//

//----Update Pay Day or Due Date to the next closest event----//
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

  useEffect (() => {
    const uniqueEvents = [...new Map(tempEventArray.map((m) => [m.doeID, m])).values()];
    setBudgetEventsList(...[uniqueEvents])
  }, [tempEventArray, setEventTempArray])

  useEffect (() => {
    const uniqueGraphs = [...new Map(tempGraphArray.map((m) => [m.doeID, m])).values()];
    setGraphsData(...[uniqueGraphs])
  }, [tempGraphArray, setTempGraphArray])

  useEffect (() => {
    const uniqueHist = [...new Map(tempHistArray.map((m) => [m.histID, m])).values()];
    setHistData(...[uniqueHist])
  }, [tempHistArray, setTempHistArray])

  // useEffect(() => {
  //   console.log(tempHistArray)
  //   console.log(histData)
  // },[setHistData, histData])

  // async function addtoHistory(e) {
  //   e.preventDefault();
  //       try {
  //           await addHistEvent({
  //               variables: {
  //                   histID: iModalTitle,
  //                   histTitle: iModalValue.toString(),
  //                   histType: iModalInterest.toString(),
  //                   histValue: iModalFrequency,
  //                   histCategory: iModalPrimary,
  //                   histDate: payDayDate,
  //               }
                
  //           });
  //       } catch (error) {
  //           console.log(error);
  //       }
  // }

  if (loggedIn) {
  return (
    <div className="homeCont">
      {IandEtoggle ? (
        <IncomesList />
      ) : (
        <ExpensesList />
      )}
      {(modalValue === 'Income' || modalValue === "Expense") && (
        <IandEModal />
      )}
      {/* {(modalValue === 'EditIncome' || modalValue === "EditExpense") && (
        <EditModal />
      )} */}
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
          let iandeContent = []
          if (view === 'month') {

            for (let i = 0; i < incomes.length; i ++) {
              if(isDesiredDate(incomes[i], date)) {
                iandeContent.push({id: incomes[i]._id, iandeEvent: incomes[i], dateofEvent: date.getTime()})
                updatebudgetEventsList(({doeID: incomes[i]._id + date.getTime(), dateofEvent: date.getTime(), iandeEvent: {...incomes[i]}}))
              }
            }

            for (let i = 0; i < expenses.length; i ++) {
              if(isDesiredDate(expenses[i], date)) {
                iandeContent.push({id: expenses[i]._id, iandeEvent: expenses[i], dateofEvent: date.getTime()})
                updatebudgetEventsList(({doeID: expenses[i]._id + date.getTime(), dateofEvent: date.getTime(), iandeEvent: {...expenses[i]}}))
              }
            }
          }
          if (iandeContent) {
            return (
              <div>
                <ul className="calendarViewUL">
                {iandeContent.map((iandeUnit) => {                
                  return (
                    <li
                    key={iandeUnit.id}>{iandeUnit.iandeEvent.eventTitle}: <span className={iandeUnit.iandeEvent.eventType + 'LI'} >${iandeUnit.iandeEvent.eventValue}</span></li>
                  )
                })}
                </ul>
              </div>
            )
          }
        }}
        calendarType={"US"}
      />
      </div>
      {calcontVal && <div className="calContCont">
        <CalendarModal tileContent={calcontItems}/>
      </div>}
      <div className="eventsCont">
        <EventsList events={budgetEventsList}/>
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