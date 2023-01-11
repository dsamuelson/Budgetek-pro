import React, { useState, useEffect } from "react";
import Auth from '../../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_EVENTS} from '../../utils/queries';
import { PDDDformat, idbPromise } from "../../utils/helpers";
import { REMOVE_BUDGET_EVENT } from "../../utils/mutations";
import { useDispatch, useSelector } from 'react-redux'

function ExpensesList() {

    const dispatch = useDispatch()
    const {loading: expenseLoading, data: expenseData, refetch: expenseDataRefetch} = useQuery(QUERY_EVENTS)
    const iandEMToggleStore = useSelector((state) => state.modalValue);
    const iandEMValue = iandEMToggleStore.modalValue;
    const expensesListStore = useSelector((state) => state.expenses);
    const expensesList = expensesListStore.expenses
    const [showItemizedList, setShowItemizedList] = useState([{id: "", open: false}])
    const loggedIn = Auth.loggedIn();

    const [removeExpense] = useMutation(REMOVE_BUDGET_EVENT)
        
    useEffect(() => {
        expenseDataRefetch()
        if (expenseData){
            dispatch({
                type: 'ADD_EXPENSES',
                expenses: expenseData.me.budgetEvents.filter(budgetEvent => {return budgetEvent.eventType === 'expense'})
              })
        }
    },[expenseLoading, expenseData, iandEMValue, expenseDataRefetch, dispatch])

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
        idbPromise('budgetEvents', 'delete', { _id: ident})
        expenseDataRefetch()
    }

    async function editExpenseHandler(e, ident) {
        e.preventDefault();
        console.log(ident)
        dispatch({
            type: "TOGGLE_MODAL",
            modalValue: "EditExpense"
        })
        dispatch({
            type:"EDIT_THIS_EVENT",
            currentEdit: ident
        })
    }

    return (
        <div className="expensesTable">
            {loggedIn && expensesList && (
                <div> 
                <table className="expenseTable">
                    <thead>
                        <tr>
                            <th title="Name of the Expense?">Title</th>
                            <th title="How much is the Expense?">Value</th>
                            <th title="How Often does this come up?">Frequency</th>
                            <th title="Has this been Itemized?">Itemized</th>
                            <th title="What is the category for this Expense?">Category</th>
                            <th title="When does this need to be payed?">Next Due On</th>
                            <th title="Remove Expense">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expensesList.map((expense) => {
                            return (
                                <React.Fragment key={expense._id}>
                                    <tr>
                                        <td>{expense.eventTitle} {expense.vitalEvent && `(Vital)`}</td>
                                        <td>{expense.eventValue}<br></br>{expense.totalEventValue &&`(${expense.totalEventValue})`}</td>
                                        <td>{expense.eventFrequency[0].frequency}</td>
                                        <td onClick={() => setShowItemizedList([{id: expense._id, open: !showItemizedList[0].open}])}>{expense.iouInfo.length > 0 && expense.iouInfo.length}</td>
                                        <td>{expense.eventCategory}</td>
                                        <td>{`${PDDDformat(expense.eventDate)}`}</td>
                                        <td><button onClick={(e) => removeExpenseHandler(e, expense._id)} className="itemDelete">X</button><button onClick={(e) => editExpenseHandler(e, expense)} className="itemEdit">E</button></td>
                                    </tr>
                                    {showItemizedList[0].id === expense._id && showItemizedList[0].open && expense.iouInfo.length > 0 && (
                                        <tr>
                                            <td colSpan={7}>
                                            <table className="subTableItemized">
                                                <thead>
                                                        <tr>
                                                            <th><h4>Title</h4></th>
                                                            <th><h4>Value</h4></th>
                                                            <th><h4>Paid</h4></th>
                                                        </tr>
                                                </thead>
                                                <tbody>
                                                    {expense.iouInfo.map((itemizedEntry) => {
                                                        return (
                                                            <tr
                                                            key={itemizedEntry._id}>
                                                                    <td>{itemizedEntry.iouTitle}</td>
                                                                    <td>{itemizedEntry.iouValue}</td>
                                                                    <td><input type='checkbox' checked={itemizedEntry.iouPaid} disabled={true}/></td>
                                                            </tr>
                                                        )
                                                    })}   
                                                </tbody>                                                  
                                                </table>
                                            </td>
                                        </tr>         
                                    )}
                                </React.Fragment>
                            ) 
                        })}
                    </tbody>
                </table>
                </div>
            )}
            <button onClick={EModalToggle} className='modalButton'>Add Expense</button>
        </div>

    )
}

export default ExpensesList;