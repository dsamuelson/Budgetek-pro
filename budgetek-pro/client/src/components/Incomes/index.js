import React, { useState, useEffect } from "react";
import Auth from '../../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_INCOMES} from '../../utils/queries';
import { REMOVE_INCOME } from "../../utils/mutations";
import { formatDate } from "../../utils/helpers";
import { useDispatch } from 'react-redux'

function IncomesList() {

    const dispatch = useDispatch();
    const {loading: incomeLoading, data: incomeData} = useQuery(QUERY_INCOMES)
    const [incomesList, setIncomesList] = useState([])
    const loggedIn = Auth.loggedIn();

    const [removeIncome] = useMutation(REMOVE_INCOME);
    

    useEffect(() => {
        if (incomeData) {
            setIncomesList(incomeData.me.incomes)
        }
        
    },[incomeLoading, incomeData, incomesList.length])

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