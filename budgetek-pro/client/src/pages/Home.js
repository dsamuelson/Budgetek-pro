import React, {useState} from "react";
import Calendar from 'react-calendar';
import IncomesList from "../components/Incomes";
import ExpensesList from "../components/Expenses";
import { useSelector } from 'react-redux';


const Home = () => {

  const [date, setDate] = useState(new Date())
  const IandEtoggleStore = useSelector((state) => state.iande);
  const IandEtoggle = IandEtoggleStore.iande;

  return (
    <div className="homeCont">
      {IandEtoggle ? (
        <IncomesList />
      ) : (
        <ExpensesList />
      )}
      <div className="calendarCont">
     <Calendar onChange={setDate} value={date}/>
      </div>
    </div>
  );
};

export default Home;