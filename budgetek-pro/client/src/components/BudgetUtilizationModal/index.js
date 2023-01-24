import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Doughnut } from 'react-chartjs-2'
import { 
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title, 
    ArcElement,
    Filler, 
    Tooltip, 
    Legend } from 'chart.js';

function BudgetUtilizationModal() {
    const dispatch = useDispatch()

    const categoriesBreakdownStore = useSelector((state) => state.internalEvents)
    const toggleStore = useSelector((state) => state.toggles)
    const categoryBreakdownToggle = toggleStore.buVal

    let dGraphInputData = {};

    if (categoryBreakdownToggle === "mIncomes") {
        dGraphInputData = categoriesBreakdownStore.monthlyIncomeperCategory
    } else if (categoryBreakdownToggle === "mExpenses") {
        dGraphInputData = categoriesBreakdownStore.monthlyExpensesperCategory
    } else {
        dGraphInputData = categoriesBreakdownStore.totalDebtPerCategory
    }

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        ArcElement, 
        Tooltip, 
        Filler,
        Legend
    );
     
    const doughnutData = {
        labels: [...Object.keys(dGraphInputData)],
        datasets: [
            {
            label: 'Utilization by Category',
            data: [...Object.values(dGraphInputData)],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 0, 127, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 0, 127, 1)',
            ],
            borderWidth: 1,
            },
        ],
    };

    return (
        <div className="buModal">    
            <p onClick={() => {dispatch({type: "TOGGLE_BU_MODAL", buVal: "None"})}} className="calContx">x</p>
            <h2>Budget Utilization Per Category ({categoryBreakdownToggle === "mTotal" ? "Total Debt" : "Monthly"})</h2>
            <div><Doughnut data={doughnutData}/></div>
        </div>
    )
}

export default BudgetUtilizationModal;