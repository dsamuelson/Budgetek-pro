import React, { useState, useEffect } from "react";
import Auth from '../../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_INCOMES} from '../../utils/queries';

function IncomesList() {

    const {loading: incomeLoading, data: incomeData} = useQuery(QUERY_INCOMES)
    const [incomesList, setIncomesList] = useState([])
    const loggedIn = Auth.loggedIn();

    useEffect(() => {
        if (!incomeLoading) {
            setIncomesList(incomeData.me.incomes)
        }
        console.log(incomesList)
    },[incomeLoading, incomeData, incomesList.length])

    return (
        <div>
            {loggedIn && (
                <ul className="elementsCont">
                    {incomesList && incomesList.map((income, i) => {
                        return (
                            <li
                            key={income._id}>{income.incomeTitle}</li>
                        )
                    })}
                    <li><button>Add Income</button></li>
                </ul>
            )}
            
        </div>
    )
}

export default IncomesList;