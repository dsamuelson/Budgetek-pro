import React, { useState, useEffect } from "react";
import Auth from '../../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_EXPENSES} from '../../utils/queries';

function ExpensesList() {

    const {loading: expenseLoading, data: expenseData} = useQuery(QUERY_EXPENSES)
    const [expensesList, setExpensesList] = useState([])
    const loggedIn = Auth.loggedIn();

    useEffect(() => {
        if (!expenseLoading) {
            setExpensesList(expenseData.me.expenses)
        }
        console.log(expensesList)
    },[expenseLoading, expenseData, expensesList.length])

    return (
        <div>
            {loggedIn && (
                <ul className="elementsCont">
                    {expensesList && expensesList.map((expense, i) => {
                        return (
                            <li
                            key={expense._id}>{expense.expenseTitle}</li>
                        )
                        
                    })}
                    <li><button>Add Expense</button></li>
                </ul>
            )}
        </div>
    )
}

export default ExpensesList;