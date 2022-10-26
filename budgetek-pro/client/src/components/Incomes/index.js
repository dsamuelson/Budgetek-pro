import React, { useEffect, useState } from "react";
import Auth from '../../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_INCOMES} from '../../utils/queries';
import { REMOVE_INCOME } from "../../utils/mutations";
import { formatDate, idbPromise } from "../../utils/helpers";
import { useDispatch, useSelector } from 'react-redux'

function IncomesList() {

    const dispatch = useDispatch();
    const {loading: incomeLoading, data: incomeData, refetch: incomeDataRefetch } = useQuery(QUERY_INCOMES)
    const iandEMToggleStore = useSelector((state) => state.modalValue);
    const iandEMValue = iandEMToggleStore.modalValue;
    const incomesListStore = useSelector((state) => state.incomes);
    const incomesList = incomesListStore.incomes;
    const loggedIn = Auth.loggedIn();
    const [showItemizedList, setShowItemizedList] = useState([{id: "", open: false}])
    const [removeIncome] = useMutation(REMOVE_INCOME);
    

    useEffect(() => {
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
    },[incomeLoading, incomeData, iandEMValue, dispatch])

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
        idbPromise('incomes', 'delete', {_id: ident})
        incomeDataRefetch()
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
                            <th title="When do you get paid?">Pay Date</th>
                            <th title="Remove Income">Delete</th>
                        </tr>
                    </thead>
                    <tbody>                        
                            {incomesList.map((income) => {
                                return (
                                    <React.Fragment key={income._id}>
                                        <tr 
                                        >
                                            <td>{income.incomeTitle}</td>
                                            <td>{income.incomeValue}</td>
                                            <td onClick={() => setShowItemizedList([{id: income._id, open: !showItemizedList[0].open}])}>{income.uomePayInfo.length > 0 && income.uomePayInfo.length}</td>
                                            <td>{income.incomeFrequency[0].frequency}</td>
                                            <td>{`${formatDate(income.payDay)}`}</td>
                                            <td><button onClick={(e) => removeIncomeHandler(e, income._id)}>x</button></td>
                                        </tr>
                                        {showItemizedList[0].id === income._id && showItemizedList[0].open && income.uomePayInfo.length > 0 && (
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
                                                        {income.uomePayInfo.map((itemizedEntry) => {
                                                            return (
                                                                <tr
                                                                key={itemizedEntry._id}>
                                                                        <td>{itemizedEntry.uomeTitle}</td>
                                                                        <td>{itemizedEntry.uomeValue}</td>
                                                                        <td><input type='checkbox' checked={itemizedEntry.uomePaid} disabled={true}/></td>
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
                <button onClick={iModalToggle}>Add Income</button>
                </div>
            )}
        </div>
    )
}

export default IncomesList;