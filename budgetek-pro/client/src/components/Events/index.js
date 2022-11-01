import React, { useState, useEffect } from "react";
import Auth from '../../utils/auth';
import { useDispatch, useSelector } from 'react-redux'
import { from, useQuery } from "@apollo/client";
import { QUERY_INCOMES, QUERY_EXPENSES} from '../../utils/queries'

function EventsList() {
    const incomesStore = useSelector((state) => state.incomes);
    const incomes = incomesStore.incomes;



    return (
        <div className="eventsListCont">
            <div className="eventsListTitle">
                <h2>Upcoming Budget Events</h2>
            </div>
            <div className="ULCont">
                <div className="eventsListIULCont">
                    <h4>Income Events</h4>
                    <ul className="eventsListIUL">

                    </ul>
                </div>
                <div className="eventsListEULCont">
                    <h4>Expense Events</h4>
                    <ul className="eventsListEUL">

                    </ul>
                </div>
            </div>
        </div>
    )
}

export default EventsList;