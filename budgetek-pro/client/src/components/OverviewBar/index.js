import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { QUERY_EXPENSES, QUERY_INCOMES} from '../../utils/queries';
import { useSelector, useDispatch } from 'react-redux';
import Auth from '../../utils/auth'

function OverviewBar() {

    const {loading: expenseLoading, data: expenseData} = useQuery(QUERY_EXPENSES)
    const {loading: incomeLoading, data: incomeData} = useQuery(QUERY_INCOMES)
    const loggedIn = Auth.loggedIn();
    const IandEtoggleStore = useSelector((state) => state.iande);
    const IandEtoggle = IandEtoggleStore.iande;
    const dispatch = useDispatch();
    
    function budgetTotal() {
        let expenses = expenseData.me.totalExpense;
        let incomes = incomeData.me.totalIncome;
        let budgetValue = parseFloat(incomes - expenses).toFixed(2);

        if (budgetValue <= 0) {
            budgetValue = `(${Math.abs(budgetValue).toFixed(2)})`
        }

        return budgetValue
    }

    function viewExpenses() {
        if (IandEtoggle) {
            dispatch({
                type: 'TOGGLE_IANDE',
                iande: false
            })
        }
    }

    function viewIncome() {
        if (!IandEtoggle) {
            dispatch({
                type: 'TOGGLE_IANDE',
                iande: true
            })
        }
    }

    return (
        <div>
        {loggedIn && (
        <div className="OBCont">
            <div className="incomeBox">
                <h2 className="incomeTitle"
                    onClick={viewIncome}>Incomes</h2>
                { incomeLoading ? (
                    <p className="incomeValue">Loading...</p>
                ) : (
                <p className="incomeValue">{incomeData.me.totalIncome}</p>
                )}
            </div>
            <div className="expenseBox">
                <h2 className="expenseTitle"
                    onClick={viewExpenses}>Expenses</h2>
                { expenseLoading ? (
                    <p className="expenseValue">Loading...</p>
                ) : ( 
                <p className="expenseValue">{expenseData.me.totalExpense}</p>
                )}
            </div>
            <div className="totalsBox">
                <h2 className="totalsTitle">Totals</h2>
                { incomeLoading || expenseLoading ? (
                    <p className="totalsValue">Loading...</p>
                ) : (
                    <div className="totalsValue">
                        <p>{budgetTotal()}</p>
                        <p>Total Debt:{expenseData.me.totalDebt}</p>
                    </div>
                    
                )}
            </div>            
            <div className="savResTitle">
                <h3>Residuals</h3>
                <p className="resValue">$$$</p>
                <h3>Savings</h3>
                <p className="savValue">$$$</p>
            </div>
            
        </div>
        )}
        </div>
    )
}

export default OverviewBar;