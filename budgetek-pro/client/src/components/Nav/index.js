import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
// import { useMutation, useQuery } from "@apollo/client";
// import { QUERY_EXPENSES, QUERY_INCOMES} from '../../utils/queries';
// import { UPDATE_EXPENSE, UPDATE_INCOME } from '../../utils/mutations';
// import { addDate } from "../../utils/helpers";

function Nav() {
  //----updates next Pay/Due Date----//
  // const {loading: expenseLoading, data: expenseData, refetch: expenseDataRefetch} = useQuery(QUERY_EXPENSES)
  // const [updateExpense] = useMutation(UPDATE_EXPENSE);
  // const {loading: incomeLoading, data: incomeData, refetch: incomeDataRefetch } = useQuery(QUERY_INCOMES)
  // const [ updateIncome ] = useMutation(UPDATE_INCOME);

  // useEffect(() => {
  //   if (Auth.loggedIn() && expenseData) {
  //       for (let i = 0 ; i < expenseData.me.expenses.length ; i++) {
  //         const uUnit = expenseData.me.expenses[i]
  //         if (new Date().getTime() > parseInt(uUnit.dueDate)) {
  //           if (uUnit.expenseFrequency[0].frequency === 'monthly' && uUnit.expenseFrequency[0].isSameDay === 'sameDay') {
  //             updatePDDDDate(uUnit, addDate(1, 'months', new Date(parseInt(uUnit.dueDate)).getTime()))
  //           }
  //         }
  //       }
  //       expenseDataRefetch()
  //   }
  //   if (Auth.loggedIn() && incomeData) {
  //       for (let i = 0 ; i < incomeData.me.incomes.length ; i++) {
  //         const uUnit = incomeData.me.incomes[i]
  //         if (new Date().getTime() > parseInt(uUnit.payDay)) {
  //           if (uUnit.incomeFrequency[0].frequency === 'monthly' && uUnit.incomeFrequency[0].isSameDay === 'sameDay') {
  //             updatePDDDDate(uUnit, addDate(1, 'months', new Date(parseInt(uUnit.payDay)).getTime()))
  //           }
  //         }
  //       }
  //       incomeDataRefetch()
  //   }
  // }, [expenseData, expenseLoading, incomeData, incomeLoading]);

  // async function updatePDDDDate(uUnit, newDate) {
  //   if (uUnit.__typename === "Expenses") {
  //     try {
  //       await updateExpense({
  //           variables: {
  //               _id: uUnit._id,
  //               dueDate: newDate.toString()
  //           }
  //       });
  //     } catch (error) {
  //         console.log(error);
  //     }  
  //   }
  //   if (uUnit.__typename === "Incomes") {
  //     try {
  //       await updateIncome({
  //           variables: {
  //               _id: uUnit._id,
  //               payDay: newDate.toString()
  //           }
  //       });
  //     } catch (error) {
  //         console.log(error);
  //     }  
  //   }
  // }

  //----End of Pay/Due date update function----//

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/signup">
              Signup
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/login">
              Login
            </Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className="headerBar">
      <h1 className="Budgetek-Title">
        <Link to="/">
          Budgetek
        </Link>
      </h1>
      <nav>
        {showNavigation()}
      </nav>
    </header>
  );
}

export default Nav;