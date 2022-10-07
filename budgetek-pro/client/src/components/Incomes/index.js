import React, { useEffect } from "react";
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
        <div>
            {loggedIn && incomesList && (
                <div>
                <table className="incomeTable">
                    <thead>
                        <tr>
                            <th title="Where is the income from?">Title</th>
                            <th title="How much will/do you get paid?">Value</th>
                            <th title="How often does this pay?">Frequency</th>
                            <th title="When do you get paid?">Pay Date</th>
                            <th title="Remove Income">Delete</th>
                        </tr>
                    </thead>
                    <tbody>                        
                            {incomesList.map((income) => {
                                return (
                                    <tr 
                                    key={income._id}>
                                        <td>{income.incomeTitle}</td>
                                        <td>{income.incomeValue}</td>
                                        <td>{income.incomeFrequency}</td>
                                        <td>{`${formatDate(income.payDay)}`}</td>
                                        <td><button onClick={(e) => removeIncomeHandler(e, income._id)}>x</button></td>
                                    </tr>
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