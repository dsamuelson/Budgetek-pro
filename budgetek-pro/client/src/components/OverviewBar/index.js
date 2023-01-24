import React from "react";
import { useQuery } from '@apollo/client';
import { QUERY_EVENTS } from '../../utils/queries';
import { useSelector, useDispatch } from 'react-redux';
import graphSVG from '../../assets/icons/pie-chart-svgrepo-com.svg'
import Auth from '../../utils/auth'

function OverviewBar() {
    const {loading: eventsLoading, data: eventsData} = useQuery(QUERY_EVENTS)
    const loggedIn = Auth.loggedIn();
    const IandEtoggleStore = useSelector((state) => state.toggles);
    const IandEtoggle = IandEtoggleStore.iande;
    const dispatch = useDispatch();
    
    function budgetTotal() {
        let expenses = eventsData.me.totalExpense;
        let incomes = eventsData.me.totalIncome;
        let budgetValue = parseFloat(incomes - expenses).toFixed(2);

        if (budgetValue < 0) {
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
        <div className="overviewBar">
        {loggedIn && (
        <div className="OBCont">
            <div className="incomeBox">
                <div className="OBTitlesCont">
                    <h2 className="incomeTitle" onClick={viewIncome} title="Show Incomes Table">Incomes</h2>
                    <img src={graphSVG} alt="Show Income breakdown" title="Show Income breakdown" onClick={() => {dispatch({ type: 'TOGGLE_BU_MODAL', buVal: 'mIncomes'})}} className="graphsIcon"/>
                </div>
                { eventsLoading ? (
                    <p className="incomeValue">Loading...</p>
                ) : (
                <p className="incomeValue">{eventsData.me.totalIncome}</p>
                )}
            </div>
            <div className="expenseBox">
                <div className="OBTitlesCont">
                    <h2 className="expenseTitle" onClick={viewExpenses} title="Show Expenses Table">Expenses</h2>
                    <img src={graphSVG} alt="Show Expenses breakdown" title="Show Expenses breakdown" onClick={() => {dispatch({ type: 'TOGGLE_BU_MODAL', buVal: 'mExpenses'})}} className="graphsIcon"/>
                </div>
                { eventsLoading ? (
                    <p className="expenseValue">Loading...</p>
                ) : ( 
                <p className="expenseValue">{eventsData.me.totalExpense}</p>
                )}
            </div>
            <div className="totalsBox">
                <div className="OBTitlesCont">
                    <h2 className="totalsTitle">Totals</h2>
                    <img src={graphSVG} alt="Show Total Expenses breakdown" title="Show Total Expenses breakdown" onClick={() => {dispatch({ type: 'TOGGLE_BU_MODAL', buVal: 'mTotal'})}} className="graphsIcon"/>
                </div>
                { eventsLoading ? (
                    <p className="totalsValue">Loading...</p>
                ) : (
                    <div className="totalsValue">
                        <p>Monthly: {budgetTotal()}</p>
                        <p>Total Debt: {eventsData.me.totalDebt}</p>
                    </div>
                    
                )}
            </div>                        
        </div>
        )}
        </div>
    )
}

export default OverviewBar;