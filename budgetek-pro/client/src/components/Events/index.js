import React, { useEffect, useState } from "react";
import { addDate, subtractDate } from "../../utils/helpers";
import { useSelector } from 'react-redux';
import Auth from '../../utils/auth';

function EventsList() {
    const eventsStore = useSelector((state) => state.internalEvents);
    const incomes = eventsStore.incomes;
    const expenses = eventsStore.expenses;
    const [ eventTimeWindow, setEventTimeWindow ] = useState(() => {return 7})
    const [ incomeEvents, setIncomeEvents ] = useState([])
    const [ expenseEvents, setExpenseEvents ] = useState([])
    const [ incomeEventsTotal, setIncomeEventsTotal ] = useState(0.00)
    const [ expenseEventsTotal, setExpenseEventsTotal ] = useState(0.00)

    useEffect(() => {
       setIncomeEvents(incomes.filter((event) => {return parseInt(event.eventDate) < addDate(eventTimeWindow, 'days', new Date()).getTime() && parseInt(event.eventDate) > subtractDate(1, 'days', new Date())}))
       setExpenseEvents(expenses.filter((event) => {return parseInt(event.eventDate) < addDate(eventTimeWindow, 'days', new Date()).getTime() && parseInt(event.eventDate) > subtractDate(1, 'days', new Date())}))
    },[incomes, expenses, eventTimeWindow, setEventTimeWindow])

    useEffect(() => {
        setExpenseEventsTotal(0.00)
        setIncomeEventsTotal(0.00)
        for (let i = 0 ; i < incomeEvents.length ; i++) {
            setIncomeEventsTotal(incomeEventsTotal => incomeEventsTotal + parseFloat(incomeEvents[i].eventValue))
        }
        for (let i = 0; i < expenseEvents.length ; i ++) {
            setExpenseEventsTotal(expenseEventsTotal => expenseEventsTotal + parseFloat(expenseEvents[i].eventValue))
        }
    }, [incomeEvents, expenseEvents, setExpenseEvents, setIncomeEvents])


    const loggedIn = Auth.loggedIn();

    return (
        
        <div className="eventsListCont">
            { loggedIn && (
                <div>
                    <div className="eventsListTitle">
                        <h2>Upcoming Budget Events</h2>
                        <div className="eventWindowButtons">
                            <button onClick={() => setEventTimeWindow(7)}>7 Days</button>
                            <button onClick={() => setEventTimeWindow(14)}>14 Days</button>
                            <button onClick={() => setEventTimeWindow(30)}>30 Days</button>
                        </div>
                        
                    </div>
                    <div className="ULCont">
                        <div className="eventsListIULCont">
                            <h4>Income Events ({incomeEventsTotal.toFixed(2)})</h4>
                            <ul className="eventsListIUL">
                                {incomeEvents.length ? incomeEvents.map((ievents) => {
                                        return (
                                            <li 
                                            key = {ievents._id + ievents.eventDate}>{ievents.eventTitle} paying on {new Date(parseInt(ievents.eventDate)).toLocaleDateString()} for ${ievents.eventValue}</li>
                                        )
                                }) : <li>No Incomes Within the next {eventTimeWindow.toString()} Days</li>}
                            </ul>
                        </div>
                        <div className="eventsListEULCont">
                            <h4>Expense Events ({expenseEventsTotal.toFixed(2)})</h4>
                            <ul className="eventsListEUL">
                            {expenseEvents.length ? expenseEvents.map((ievents) => {
                                        return (
                                            <li 
                                            key = {ievents._id + ievents.eventDate}>{ievents.eventTitle} Due on {new Date(parseInt(ievents.eventDate)).toLocaleDateString()} for ${ievents.eventValue}</li>
                                        )
                                }) : <li>No Expenses Within the next {eventTimeWindow.toString()} Days</li>}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
        
    )
}

export default EventsList;