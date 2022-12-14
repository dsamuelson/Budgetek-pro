import React, { useEffect, useState } from "react";
import Auth from '../../utils/auth';

function EventsList(props) {
    const [ useProps, setProps ] = useState(props)
    const [ incomeEvents, setIncomeEvents ] = useState([])
    const [ expenseEvents, setExpenseEvents ] = useState([])
    const [ incomeEventsTotal, setIncomeEventsTotal ] = useState(0.00)
    const [ expenseEventsTotal, setExpenseEventsTotal ] = useState(0.00)

    useEffect(() => {
        setProps(props)
    })

    useEffect(() => {
        let incomeTempArray = []
        let expenseTempArray = []
        if (useProps.events) {
            useProps.events.map((ievents) => {
                if (ievents.eventClass === 'incomeLI') {
                    incomeTempArray.push(ievents)
                } else if (ievents.eventClass === 'expenseLI') {
                    expenseTempArray.push(ievents)
                }
            })
            setIncomeEvents(incomeTempArray)
            setExpenseEvents(expenseTempArray)
        }
    },[useProps, setProps])

    useEffect(() => {
        setExpenseEventsTotal(0.00)
        setIncomeEventsTotal(0.00)
        console.log(incomeEvents.length)
        for (let i = 0 ; i < incomeEvents.length ; i++) {
            setIncomeEventsTotal(incomeEventsTotal => incomeEventsTotal + parseFloat(incomeEvents[i].iandeValue))
        }
        for (let i = 0; i < expenseEvents.length ; i ++) {
            setExpenseEventsTotal(expenseEventsTotal => expenseEventsTotal + parseFloat(expenseEvents[i].iandeValue))
        }
    }, [incomeEvents, expenseEvents, setExpenseEvents, setIncomeEvents])


    const loggedIn = Auth.loggedIn();

    return (
        
        <div className="eventsListCont">
            { loggedIn && (
                <div>
                    <div className="eventsListTitle">
                        <h2>Upcoming Budget Events</h2>
                    </div>
                    <div className="ULCont">
                        <div className="eventsListIULCont">
                            <h4>Income Events ({incomeEventsTotal.toFixed(2)})</h4>
                            <ul className="eventsListIUL">
                                {incomeEvents.length && incomeEvents.map((ievents) => {
                                        return (
                                            <li 
                                            key = {ievents.doeID}>{ievents.iandeEvent} paying on {new Date(ievents.dateofEvent).toLocaleDateString()} for ${ievents.iandeValue}</li>
                                        )
                                })}
                            </ul>
                        </div>
                        <div className="eventsListEULCont">
                            <h4>Expense Events ({expenseEventsTotal.toFixed(2)})</h4>
                            <ul className="eventsListEUL">
                            {expenseEvents.length && expenseEvents.map((ievents) => {
                                        return (
                                            <li 
                                            key = {ievents.doeID}>{ievents.iandeEvent} due on {new Date(ievents.dateofEvent).toLocaleDateString()} for ${ievents.iandeValue}</li>
                                        )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
        
    )
}

export default EventsList;