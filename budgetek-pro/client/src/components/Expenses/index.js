import React, { useState, useEffect } from "react";
import Auth from '../../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_EXPENSES} from '../../utils/queries';
import { formatDate } from "../../utils/helpers";
import { REMOVE_EXPENSE } from "../../utils/mutations";
import { useDispatch } from 'react-redux'

function ExpensesList() {

    const dispatch = useDispatch()
    const {loading: expenseLoading, data: expenseData} = useQuery(QUERY_EXPENSES)
    const [expensesList, setExpensesList] = useState([])
    const loggedIn = Auth.loggedIn();

    const [removeExpense] = useMutation(REMOVE_EXPENSE)

    useEffect(() => {
        if (!expenseLoading) {
            setExpensesList(expenseData.me.expenses)
        }
    },[expenseLoading, expenseData, expensesList.length, removeExpense])

    function EModalToggle() {
        dispatch({
            type: "TOGGLE_MODAL",
            modalValue: "Expense"
        })
    }

    async function removeExpenseHandler(e, ident) {
        e.preventDefault();
        try{ 
            await removeExpense({
            variables: {
                _id: ident
            }
        });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            {loggedIn && expensesList && (
                <div>
                <table className="expenseTable">
                    <thead>
                        <tr>
                            <th title="Name of the Expense?">Title</th>
                            <th title="How much is the Expense?">Value</th>
                            <th title="How Often does this come up?">Frequency</th>
                            <th title="Is this Vital or can it be Ignored?">Vital</th>
                            <th title="What is the category for this Expense?">Category</th>
                            <th title="When does this need to be payed?">Due Date</th>
                            <th title="Remove Expense">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expensesList.map((expense) => {
                            return (
                                <tr
                                key={expense._id}>
                                    <td>{expense.expenseTitle}</td>
                                    <td>{expense.expenseValue}</td>
                                    <td>{expense.expenseFrequency}</td>
                                    <td>{expense.vitalExpense}</td>
                                    <td>{expense.expenseCategory}</td>
                                    <td>{`${formatDate(expense.dueDate)}`}</td>
                                    <td><button onClick={(e) => removeExpenseHandler(e, expense._id)}>x</button></td>
                                </tr>
                            ) 
                        })}
                    </tbody>
                </table>
                <button onClick={EModalToggle}>Add Expense</button>
                </div>
            )}
        </div>
    )
}

export default ExpensesList;