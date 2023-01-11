import React from "react";
import { useQuery } from '@apollo/client';
import { QUERY_EVENTS } from '../../utils/queries';
import { useSelector, useDispatch } from 'react-redux';
import Auth from '../../utils/auth'

function OverviewBar() {

    const {loading: eventsLoading, data: eventsData} = useQuery(QUERY_EVENTS)
    const loggedIn = Auth.loggedIn();
    const IandEtoggleStore = useSelector((state) => state.iande);
    const IandEtoggle = IandEtoggleStore.iande;
    const dispatch = useDispatch();
    
    function budgetTotal() {
        let expenses = eventsData.me.totalExpense;
        let incomes = eventsData.me.totalIncome;
        let budgetValue = parseFloat(incomes - expenses).toFixed(2);

        if (budgetValue <= 0) {
            budgetValue = `(- ${Math.abs(budgetValue).toFixed(2)})`
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
                { eventsLoading ? (
                    <p className="incomeValue">Loading...</p>
                ) : (
                <p className="incomeValue">{eventsData.me.totalIncome}</p>
                )}
            </div>
            <div className="expenseBox">
                <h2 className="expenseTitle"
                    onClick={viewExpenses}>Expenses</h2>
                { eventsLoading ? (
                    <p className="expenseValue">Loading...</p>
                ) : ( 
                <p className="expenseValue">{eventsData.me.totalExpense}</p>
                )}
            </div>
            <div className="totalsBox">
                <h2 className="totalsTitle">Totals</h2>
                { eventsLoading ? (
                    <p className="totalsValue">Loading...</p>
                ) : (
                    <div className="totalsValue">
                        <p>Monthly: {budgetTotal()}</p>
                        <p>Total Debt: {eventsData.me.totalDebt}</p>
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