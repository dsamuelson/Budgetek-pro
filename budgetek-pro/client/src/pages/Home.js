import React, {useState} from "react";
import Calendar from 'react-calendar';


const Home = () => {
  const [date, setDate] = useState(new Date())
  return (
    <div className="homeCont">
      <ul className="elementsCont"></ul>
      <div className="calendarCont">
     <Calendar onChange={setDate} value={date}/>
      </div>
    </div>
  );
};

export default Home;