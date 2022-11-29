import React, {useState, useEffect} from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import IncomesList from "../components/Incomes";
import ExpensesList from "../components/Expenses";
import IandEModal from "../components/IandEModal";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_EXPENSES, QUERY_INCOMES } from "../utils/queries";
import { UPDATE_EXPENSE, UPDATE_INCOME } from '../utils/mutations';
import { addDate, idbPromise, compareDate } from "../utils/helpers";
import { useSelector, useDispatch } from 'react-redux';
import Auth from "../utils/auth";
import EventsList from "../components/Events";
import GraphsView from "../components/Graphs";



const Home = () => {
  
  const [date, setDate] = useState(new Date())
  const [budgetEventsList, setBudgetEventsList] = useState([])
  const [graphsData, setGraphsData] = useState([])
  const [tempEventArray, setEventTempArray] = useState([])
  const [tempGraphArray, setTempGraphArray] = useState([])
  const dispatch = useDispatch();
  const loggedIn = Auth.loggedIn()
  const {loading: incomeLoading, data: incomeData, refetch: incomeDataRefetch } = useQuery(QUERY_INCOMES)
  const {loading: expenseLoading, data: expenseData, refetch: expenseDataRefetch} = useQuery(QUERY_EXPENSES)
  const IandEtoggleStore = useSelector((state) => state.iande);
  const IandEtoggle = IandEtoggleStore.iande;
  const modalValueStore = useSelector((state) => state.modalValue);
  const modalValue = modalValueStore.modalValue;
  const incomesStore = useSelector((state) => state.incomes);
  const incomes = incomesStore.incomes;
  const expensesStore = useSelector((state) => state.expenses);
  const expenses = expensesStore.expenses;

  const [ updateIncome ] = useMutation(UPDATE_INCOME);
  const [ updateExpense ] = useMutation(UPDATE_EXPENSE);


    useEffect(() => {
      if (loggedIn) {
        expenseDataRefetch()
      if (expenseData) {
          dispatch({
              type: 'ADD_EXPENSES',
              expenses: expenseData.me.expenses
          })
          expenseData.me.expenses.forEach((idbExpense) => {
              idbPromise('expenses', 'put', idbExpense)
          })
      } else if (!expenseLoading) {
          idbPromise('expenses', 'get').then((idbExpenses) => {
              dispatch({
                  type: "ADD_EXPENSES",
                  expnenses: idbExpenses
              })
          })
      }
    }
  },[expenseLoading, expenseData, IandEtoggle, loggedIn, expenseDataRefetch, dispatch])

  useEffect(() => {
    if (loggedIn) {
    incomeDataRefetch()
    if (incomeData) {
        dispatch({
            type: 'ADD_INCOMES',
            incomes: incomeData.me.incomes
        })
        incomeData.me.incomes.forEach((idbIncome) => {
            idbPromise('incomes', 'put', idbIncome)
        })
    } else if (!incomeLoading) {
        idbPromise('incomes', 'get').then((idbIncomes) => {
            dispatch({
                type: 'ADD_INCOMES',
                incomes: idbIncomes
            })
        })
    }
  }
  },[incomeLoading, incomeData, IandEtoggle, loggedIn, incomeDataRefetch, dispatch])

  function updatebudgetEventsList(base) {
    let bdoeID = base.doeID
    let bID = base.iandeEvent._id;
    let bEvent = base.iandeEvent.incomeTitle || base.iandeEvent.expenseTitle;
    let bValue = base.iandeEvent.incomeValue || base.iandeEvent.expenseValue;
    let bClass = base.eventClass;
    let bDateofEvent = base.dateofEvent;

    let baseData = [{doeID: bdoeID, id: bID, iandeEvent: bEvent, iandeValue: bValue, eventClass: bClass, dateofEvent: bDateofEvent}]
    if (!budgetEventsList.some(e => e.doeID === bdoeID) && !budgetEventsList.some(e=> e.doeID === undefined)){
      if (bDateofEvent > (new Date().getTime() - 86400000) && (bDateofEvent < new Date(addDate(7, 'days', new Date().getTime())).getTime())) {
        setEventTempArray((prev) => [...prev, ...baseData])
      } 
    }
    if (!graphsData.some(e => e.doeID === bdoeID) && !graphsData.some(e=> e.doeID === undefined)){
      if (new Date().getMonth() === new Date(parseInt(bDateofEvent)).getMonth()) {
        setTempGraphArray((prev) => [...prev, base])
      } 
    }
    
  }

  function isDesiredDate(uUnit, currentDate) {
    currentDate.setHours(0,0,0,0)
    let eventFValue = uUnit.incomeFrequency ? uUnit.incomeFrequency[0] : uUnit.expenseFrequency[0]
    let eventDate = new Date(parseInt(uUnit.payDay || uUnit.dueDate))
    if (eventFValue.frequency === "monthly") {
      eventDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), new Date(parseInt(uUnit.payDay || uUnit.dueDate)).getDate())
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

    if (eventDate.toDateString() === currentDate.toDateString() || currentDate.toDateString() === lastMonthEvent.toDateString() ||(eventFValue.frequency === 'other' && compareDate(eventnValue, eventnUnit, eventDate, currentDate.getTime())) || (eventFValue.frequency === 'daily') || (eventFValue.frequency === 'yearly' && parseInt(currentDate.getMonth()) === parseInt(eventFValue.month) && parseInt(currentDate.getDate()) === parseInt(eventFValue.day))) {
      return true;
    }

    if (eventFValue.frequency === 'monthly' && currentDate.getDate() === eventDate.getDate()) {
      return  true;
    }

    return false;
  }

  async function updatePDDDDate(uUnit, newDate) {
    // console.log(uUnit, new Date(newDate).toDateString())
    //   if (uUnit.__typename === "Expenses") {
    //     try {
    //       await updateExpense({
    //           variables: {
    //               _id: uUnit._id,
    //               dueDate: newDate.toString()
    //           }
    //       });
    //     } catch (error) {
    //         console.log(error);
    //     }  
    //   }
    //   if (uUnit.__typename === "Incomes") {
    //     try {
    //       await updateIncome({
    //           variables: {
    //               _id: uUnit._id,
    //               payDay: newDate.toString()
    //           }
    //       });
    //     } catch (error) {
    //         console.log(error);
    //     }  
    //   }
    }

  useEffect (() => {
    const uniqueEvents = [...new Map(tempEventArray.map((m) => [m.doeID, m])).values()];
    setBudgetEventsList(...[uniqueEvents])
  }, [tempEventArray, setEventTempArray])

  useEffect (() => {
    const uniqueGraphs = [...new Map(tempGraphArray.map((m) => [m.doeID, m])).values()];
    setGraphsData(...[uniqueGraphs])
  }, [tempGraphArray, setTempGraphArray])

  if (loggedIn) {
  return (
    <div className="homeCont">
      {IandEtoggle ? (
        <IncomesList />
      ) : (
        <ExpensesList />
      )}
      {modalValue !== 'None' && (
        <IandEModal />
      )}
      <div className="calendarCont">
     <Calendar 
        onChange={setDate} 
        value={date}
        tileContent={({ date, view }) => {
          let iandeContent = []
          if (view === 'month') {

            for (let i = 0; i < incomes.length; i ++) {
              if(isDesiredDate(incomes[i], date)) {
                iandeContent.push({id: incomes[i]._id, iandeEvent: incomes[i], eventClass: 'incomeLI', dateofEvent: date.getTime()})
                updatebudgetEventsList(({doeID: incomes[i]._id + date.getTime(), eventClass: 'incomeLI', dateofEvent: date.getTime(), iandeEvent: {...incomes[i]}}))
              }
              // let iFrequency = incomes[i].incomeFrequency[0]
              // let iEventDate = new Date(incomes[i].payDay)

            //   if (iFrequency.countWeekends === 'preWeekends') {
            //     while (iEventDate.getDay() === 0 || iEventDate.getDay() === 6) {
            //       iEventDate = iEventDate.setDate(iEventDate.getDate() - 1)
            //       console.log(iEventDate)
            //     }
            //   }

            //   if ((iFrequency.frequency === 'once' && date.toDateString() === new Date(parseInt(incomes[i].payDay)).toDateString()) || (iFrequency.frequency === 'daily') || (iFrequency.frequency === 'monthly' && ((iFrequency.isSameDay !== "lastDay" && parseInt(date.getDate()) === parseInt(iFrequency.day)) || (iFrequency.isSameDay === "lastDay" && date.getTime() === new Date(date.getFullYear(), date.getMonth() + 1, 0).getTime()))) || (iFrequency.frequency === 'yearly' && parseInt(date.getMonth()) === parseInt(iFrequency.month) && parseInt(date.getDate()) === parseInt(iFrequency.day))) {

            //     iandeContent.push({id: incomes[i]._id, iandeEvent: incomes[i], eventClass: 'incomeLI', dateofEvent: date.getTime()})
            //     updatebudgetEventsList(({doeID: incomes[i]._id + date.getTime(), eventClass: 'incomeLI', dateofEvent: date.getTime(), iandeEvent: {...incomes[i]}}))
            //   }

            //   if ((iFrequency.frequency === 'other') && (date.toDateString() === new Date(parseInt(incomes[i].payDay)).toDateString() || compareDate(parseInt(iFrequency.nValue), iFrequency.nUnit, parseInt(incomes[i].payDay), date.getTime()))) {
            //     iandeContent.push({doeId: incomes[i]._id + date.toDateString(), id: incomes[i]._id, iandeEvent: incomes[i], eventClass: 'incomeLI', dateofEvent: date.getTime()})
            //     updatebudgetEventsList(({doeID: incomes[i]._id + date.getTime(), eventClass: 'incomeLI', dateofEvent: date.getTime(), iandeEvent: {...incomes[i]}}))
            //   }

            }

            for (let i = 0; i < expenses.length; i ++) {
              if(isDesiredDate(expenses[i], date)) {
                iandeContent.push({id: expenses[i]._id, iandeEvent: expenses[i], eventClass: 'expenseLI', dateofEvent: date.getTime()})
                updatebudgetEventsList(({doeID: expenses[i]._id + date.getTime(), eventClass: 'expenseLI', dateofEvent: date.getTime(), iandeEvent: {...expenses[i]}}))
              }
            //   let eFrequency = expenses[i].expenseFrequency[0]
              
            //   if ((eFrequency.frequency === 'once' && date.toDateString() === new Date(parseInt(expenses[i].dueDate)).toDateString()) || (eFrequency.frequency === 'daily') || (eFrequency.frequency === 'monthly' && parseInt(date.getDate()) === parseInt(eFrequency.day)) || (eFrequency.frequency === 'yearly' && parseInt(date.getMonth()) === parseInt(eFrequency.month) && parseInt(date.getDate()) === parseInt(eFrequency.day))) {
            //     iandeContent.push({id: expenses[i]._id, iandeEvent: expenses[i], eventClass: 'expenseLI', dateofEvent: date.getTime()})
            //     updatebudgetEventsList(({doeID: expenses[i]._id + date.getTime(), eventClass: 'expenseLI', dateofEvent: date.getTime(), iandeEvent: {...expenses[i]}}))              
            //   }

            //   if ((eFrequency.frequency === 'other') && ((date.toDateString() === new Date(parseInt(expenses[i].dueDate)).toDateString()) || (compareDate(parseInt(eFrequency.nValue), eFrequency.nUnit, parseInt(expenses[i].dueDate), date.getTime())))) {
            //     iandeContent.push({doeId: expenses[i]._id + date.toDateString(), id: expenses[i]._id, iandeEvent: expenses[i], eventClass: 'expenseLI', dateofEvent: date.getTime()})
            //     updatebudgetEventsList(({doeID: expenses[i]._id + date.getTime(), eventClass: 'expenseLI', dateofEvent: date.getTime(), iandeEvent: {...expenses[i]}}))              
            //   }

            }

          }
          if (iandeContent) {
            return (
              <div>
                <ul className="calendarViewUL">
                {iandeContent.map((iandeUnit) => {                  
                  return (
                    <li
                    key={iandeUnit.id}>{iandeUnit.iandeEvent.expenseTitle || iandeUnit.iandeEvent.incomeTitle}: <span className={iandeUnit.eventClass}>${iandeUnit.iandeEvent.expenseValue || iandeUnit.iandeEvent.incomeValue}</span></li>
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
      <div className="eventsCont">
        <EventsList events={budgetEventsList}/>
      </div>
      <div className="graphsCont">
        <GraphsView graphData={graphsData}/>
      </div>
    </div>
  );
} else {
  return (
    <div className="mBLoggedIn">
      <h2>Welcome to Budgetek!</h2>
      <p>In order to proceed please log in!</p>
    </div>
  )
}
};

export default Home;