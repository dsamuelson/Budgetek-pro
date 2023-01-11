import React, { useEffect, useState } from "react";
import Auth from '../../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_EVENTS} from '../../utils/queries';
import { REMOVE_BUDGET_EVENT } from "../../utils/mutations";
import { PDDDformat, idbPromise } from "../../utils/helpers";
import { useDispatch, useSelector } from 'react-redux'

function IncomesList() {

    const dispatch = useDispatch();
    const {loading: incomeLoading, data: incomeData, refetch: incomeDataRefetch } = useQuery(QUERY_EVENTS)
    const iandEMToggleStore = useSelector((state) => state.modalValue);
    const iandEMValue = iandEMToggleStore.modalValue;
    const incomesListStore = useSelector((state) => state.incomes);
    const incomesList = incomesListStore.incomes
    const loggedIn = Auth.loggedIn();
    const [showItemizedList, setShowItemizedList] = useState([{id: "", open: false}])
    const [removeIncome] = useMutation(REMOVE_BUDGET_EVENT);

    useEffect(() => {
        incomeDataRefetch()
        if (incomeData){
            dispatch({
                type: 'ADD_INCOMES',
                incomes: incomeData.me.budgetEvents.filter(budgetEvent => {return budgetEvent.eventType === 'income'})
              })
        }
        
    },[incomeLoading, incomeData, iandEMValue, incomeDataRefetch, dispatch])

    function iModalToggle() {
        dispatch({
            type: "TOGGLE_MODAL",
            modalValue: 'Income'
        })
    }

    async function removeIncomeHandler(e, ident) {
        e.preventDefault();
        try{ 
            await removeIncome({
            variables: {
                _id: ident
            }
        })} catch (error) {
            console.log(error);
        }
        idbPromise('budgetEvents', 'delete', {_id: ident})
        incomeDataRefetch()
    }

    async function editIncomeHandler(e, ident) {
        e.preventDefault();
        console.log(ident)
        dispatch({
            type: "TOGGLE_MODAL",
            modalValue: "EditIncome"
        })
        dispatch({
            type:"EDIT_THIS_EVENT",
            currentEdit: ident
        })
    }

    return (
        <div className="incomesTable">
            {loggedIn && incomesList && (
                <div>
                <table className="incomeTable">
                    <thead>
                        <tr>
                            <th title="Where is the income from?">Title</th>
                            <th title="How much will/do you get paid?">Value</th>
                            <th title="Has this been Itemized">Itemized</th>
                            <th title="How often does this pay?">Frequency</th>
                            <th title="When do you get paid?">Next Pay Date</th>
                            <th title="Remove Income">Delete/Edit</th>
                        </tr>
                    </thead>
                    <tbody>                        
                            {incomesList.map((income) => {
                                return (
                                    <React.Fragment key={income._id}>
                                        <tr 
                                        >
                                            <td>{income.eventTitle} {income.vitalEvent === true && `(Primary)`}</td>
                                            <td>{income.eventValue}</td>
                                            <td onClick={() => setShowItemizedList([{id: income._id, open: !showItemizedList[0].open}])}>{income.iouInfo.length > 0 && income.iouInfo.length}</td>
                                            <td>{income.eventFrequency[0].frequency}</td>
                                            <td>{`${PDDDformat(income.eventDate)}`}</td>
                                            <td><button onClick={(e) => removeIncomeHandler(e, income._id)} className="itemDelete">X</button><button onClick={(e) => editIncomeHandler(e, income)} className="itemEdit">E</button></td>
                                        </tr>
                                        {showItemizedList[0].id === income._id && showItemizedList[0].open && income.iouInfo.length > 0 && (
                                            <tr>
                                                <td colSpan={5}>
                                                <table className="subTableItemized">
                                                    <thead>
                                                            <tr>
                                                                <th><h4>Title</h4></th>
                                                                <th><h4>Value</h4></th>
                                                                <th><h4>Paid</h4></th>
                                                            </tr>
                                                    </thead>
                                                    <tbody>
                                                        {income.iouInfo.map((itemizedEntry) => {
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
            <button onClick={iModalToggle} className='modalButton'>Add Income</button>
        </div>
    )
}

export default IncomesList;