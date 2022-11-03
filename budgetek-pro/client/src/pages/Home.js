import React, {useState, useEffect} from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import IncomesList from "../components/Incomes";
import ExpensesList from "../components/Expenses";
import IandEModal from "../components/IandEModal";
import { useQuery } from "@apollo/client";
import { QUERY_EXPENSES, QUERY_INCOMES } from "../utils/queries";
import { addDate, idbPromise } from "../utils/helpers";
import { useSelector, useDispatch } from 'react-redux';
import Auth from "../utils/auth";
import EventsList from "../components/Events";
import GraphsView from "../components/Graphs";



const Home = () => {
  
  const [date, setDate] = useState(new Date())
  const [budgetEventsList, setBudgetEventsList] = useState([])
  const [tempArray, setTempArray] = useState([])
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
    let bID = base.id;
    let bEvent = base.iandeEvent;
    let bValue = base.iandEValue;
    let bClass = base.eventClass;
    let bDateofEvent = base.dateofEvent;

    let baseData = [{doeID: bdoeID, id: bID, iandeEvent: bEvent, iandeValue: bValue, eventClass: bClass, dateofEvent: bDateofEvent}]
    if (!budgetEventsList.some(e => e.doeID === bdoeID) && !budgetEventsList.some(e=> e.doeID === undefined)){
      if (bDateofEvent > (new Date().getTime() - 86400000) && (bDateofEvent < new Date(addDate(7, 'days', new Date().getTime())).getTime())) {
        setTempArray((prev) => [...prev, ...baseData])
      }  
    }
    
  }

  useEffect (() => {
    const unique = [...new Map(tempArray.map((m) => [m.doeID, m])).values()];
    setBudgetEventsList(...[unique])
  }, [tempArray, setTempArray])

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
              let iFrequency = incomes[i].incomeFrequency[0]
              let unitIMath = false;
              if (iFrequency.frequency === 'other') {
                if (iFrequency.nUnit === 'days') {
                  unitIMath = (Math.round(( date.getTime()/86400000 - parseInt(incomes[i].payDay)/86400000)%(parseInt(iFrequency.nValue)))) === parseInt(iFrequency.nValue) - 1
                }
                if (iFrequency.nUnit === 'months') {
                  unitIMath = parseInt(date.getDate()) === parseInt(iFrequency.day) && (date.getMonth()%parseInt(iFrequency.nValue)) === 0;
                }
                if (iFrequency.nUnit === 'years') {
                  unitIMath = parseInt(date.getDate()) === parseInt(iFrequency.day) && (date.getFullYear() - new Date(parseInt(incomes[i].payDay)).getFullYear())%parseInt(iFrequency.nValue) === 0 && date.getMonth() === new Date(parseInt(incomes[i].payDay)).getMonth();
                }
              }
              if (iFrequency.frequency === 'daily') {
                iandeContent.push({id: incomes[i]._id, iandeEvent: incomes[i].incomeTitle, iandEValue: incomes[i].incomeValue, eventClass: 'incomeLI', dateofEvent: date.getTime()})
                updatebudgetEventsList(({doeID: incomes[i]._id + date.getTime(), id: incomes[i]._id, iandeEvent: incomes[i].incomeTitle, iandEValue: incomes[i].incomeValue, eventClass: 'incomeLI', dateofEvent: date.getTime()}))
              }
              if (iFrequency.frequency === 'monthly' && parseInt(date.getDate()) === parseInt(iFrequency.day)) {
                iandeContent.push({id: incomes[i]._id, iandeEvent: incomes[i].incomeTitle, iandEValue: incomes[i].incomeValue, eventClass: 'incomeLI', dateofEvent: date.getTime()})
                updatebudgetEventsList(({doeID: incomes[i]._id + date.getTime(), id: incomes[i]._id, iandeEvent: incomes[i].incomeTitle, iandEValue: incomes[i].incomeValue, eventClass: 'incomeLI', dateofEvent: date.getTime()}))
              }
              if (iFrequency.frequency === 'yearly' && parseInt(date.getMonth()) === parseInt(iFrequency.month) && parseInt(date.getDate()) === parseInt(iFrequency.day)) {
                iandeContent.push({id: incomes[i]._id, iandeEvent: incomes[i].incomeTitle, iandEValue: incomes[i].incomeValue, eventClass: 'incomeLI', dateofEvent: date.getTime()})
                updatebudgetEventsList(({doeID: incomes[i]._id + date.getTime(), id: incomes[i]._id, iandeEvent: incomes[i].incomeTitle, iandEValue: incomes[i].incomeValue, eventClass: 'incomeLI', dateofEvent: date.getTime()}))
              }
              if ((iFrequency.frequency === 'other') && (date.toDateString() === new Date(parseInt(incomes[i].payDay)).toDateString() || unitIMath)) {
                iandeContent.push({id: incomes[i]._id, iandeEvent: incomes[i].incomeTitle, iandEValue: incomes[i].incomeValue, eventClass: 'incomeLI', dateofEvent: date.getTime()})
                updatebudgetEventsList(({doeID: incomes[i]._id + date.getTime(), id: incomes[i]._id, iandeEvent: incomes[i].incomeTitle, iandEValue: incomes[i].incomeValue, eventClass: 'incomeLI', dateofEvent: date.getTime()}))
              }
            }
            for (let i = 0; i < expenses.length; i ++) {
              let eFrequency = expenses[i].expenseFrequency[0]
              let unitEMath = false;
              if (eFrequency.frequency === 'other') {
                if (eFrequency.nUnit === 'days') {
                  unitEMath = (Math.round(( date.getTime()/86400000 - parseInt(expenses[i].dueDate)/86400000)%(parseInt(eFrequency.nValue)))) === parseInt(eFrequency.nValue) - 1
                }
                if (eFrequency.nUnit === 'months') {
                  unitEMath = parseInt(date.getDate()) === parseInt(eFrequency.day) && (date.getMonth()%parseInt(eFrequency.nValue)) === 0;
                }
                if (eFrequency.nUnit === 'years') {
                  unitEMath = parseInt(date.getDate()) === parseInt(eFrequency.day) && (date.getFullYear() - new Date(parseInt(expenses[i].dueDate)).getFullYear())%parseInt(eFrequency.nValue) === 0 && date.getMonth() === new Date(parseInt(expenses[i].dueDate)).getMonth();
                }
              }
              if (eFrequency.frequency === 'daily') {
                iandeContent.push({id: expenses[i]._id, iandeEvent: expenses[i].expenseTitle, iandEValue: expenses[i].expenseValue, eventClass: 'expenseLI', dateofEvent: date.getTime()})
                updatebudgetEventsList(({doeID: expenses[i]._id + date.getTime(), id: expenses[i]._id, iandeEvent: expenses[i].expenseTitle, iandEValue: expenses[i].expenseValue, eventClass: 'expenseLI', dateofEvent: date.getTime()}))
              }
              if (eFrequency.frequency === 'monthly' && parseInt(date.getDate()) === parseInt(eFrequency.day)) {
                iandeContent.push({id: expenses[i]._id, iandeEvent: expenses[i].expenseTitle, iandEValue: expenses[i].expenseValue, eventClass: 'expenseLI', dateofEvent: date.getTime()})
                updatebudgetEventsList(({doeID: expenses[i]._id + date.getTime(), id: expenses[i]._id, iandeEvent: expenses[i].expenseTitle, iandEValue: expenses[i].expenseValue, eventClass: 'expenseLI', dateofEvent: date.getTime()}))
              }
              if (eFrequency.frequency === 'yearly' && parseInt(date.getMonth()) === parseInt(eFrequency.month) && parseInt(date.getDate()) === parseInt(eFrequency.day)) {
                iandeContent.push({id: expenses[i]._id, iandeEvent: expenses[i].expenseTitle, iandEValue: expenses[i].expenseValue, eventClass: 'expenseLI', dateofEvent: date.getTime()})
                updatebudgetEventsList(({doeID: expenses[i]._id + date.getTime(), id: expenses[i]._id, iandeEvent: expenses[i].expenseTitle, iandEValue: expenses[i].expenseValue, eventClass: 'expenseLI', dateofEvent: date.getTime()}))
              }
              if ((eFrequency.frequency === 'other') && (date.toDateString() === new Date(parseInt(expenses[i].dueDate)).toDateString() || unitEMath)) {
                iandeContent.push({doeId: expenses[i]._id + date.toDateString(), id: expenses[i]._id, iandeEvent: expenses[i].expenseTitle, iandEValue: expenses[i].expenseValue, eventClass: 'expenseLI', dateofEvent: date.getTime()})
                updatebudgetEventsList(({doeID: expenses[i]._id + date.getTime(), id: expenses[i]._id, iandeEvent: expenses[i].expenseTitle, iandEValue: expenses[i].expenseValue, eventClass: 'expenseLI', dateofEvent: date.getTime()}))
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
                    key={iandeUnit.id}>{iandeUnit.iandeEvent}: <span className={iandeUnit.eventClass}>${iandeUnit.iandEValue}</span></li>
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
        <GraphsView />
      </div>
    </div>
  );
} else {
  return (
    <div className="mBLoggedIn">
      <h2>You Must be logged in first!</h2>
    </div>
  )
}
};

export default Home;