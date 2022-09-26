import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_EXPENSES, QUERY_INCOMES} from '../../utils/queries';
import Auth from '../../utils/auth'

function OverviewBar() {

    const {loading, data} = useQuery(QUERY_ME)
    const {loading: expenseLoading, data: expenseData} = useQuery(QUERY_EXPENSES)
    const {loading: incomeLoading, data: incomeData} = useQuery(QUERY_INCOMES)
    console.log(data)
    console.log(expenseData)
    console.log(incomeData)

    return (
        <div className="OBCont">
            <h2 className="incomeTitle">Incomes</h2>
            <p className="incomeValue">$$$$</p>
            <h2 className="expenseTitle">Expenses</h2>
            <p className="expenseValue">$$$$$</p>
            <h2 className="totalsTitle">Totals</h2>
            <p className="totalsValue">$$$</p>
            <div className="savResTitle">
                <h3>Residuals</h3>
                <p className="resValue">$$$</p>
                <h3>Savings</h3>
                <p className="savValue">$$$</p>
            </div>
        </div>
    )
}

export default OverviewBar;