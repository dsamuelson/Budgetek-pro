import React, { useEffect, useState } from "react";
import Auth from '../../utils/auth';
import { compareDate } from "../../utils/helpers";
import { useQuery } from "@apollo/client";
import { QUERY_EXPENSES, QUERY_INCOMES } from "../../utils/queries";
import { Doughnut, Line } from 'react-chartjs-2'
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

function GraphsView() {
  

  const {loading: incomeLoading, data: incomeData, refetch: incomeDataRefetch } = useQuery(QUERY_INCOMES)
  const {loading: expenseLoading, data: expenseData, refetch: expenseDataRefetch} = useQuery(QUERY_EXPENSES)
  const [ tempGraphsArray, setTempGraphsArray ] = useState([]);
  const [ iEvents, setIEvents] = useState([]);
  const [ eEvents, setEEvents] = useState([]);
  const [ uGraphsData, setUGraphsData] = useState([]);
  const [ graphsData, setGraphsData] = useState([]); 


  useEffect(() => {
    incomeDataRefetch()
    expenseDataRefetch()
    if (!incomeLoading && !expenseLoading) {
      setTempGraphsArray([...incomeData.me.incomes, ...expenseData.me.expenses])
    }
  }, [incomeLoading, incomeData, incomeDataRefetch, expenseLoading, expenseData, expenseDataRefetch])

  useEffect(() => {
    if (tempGraphsArray.length){
      for (let i = 0; i < tempGraphsArray.length; i++) {
        yearlyValue(tempGraphsArray[i])
      }
    }
    
  },[tempGraphsArray])

  function yearlyValue(uUnit) {
    if (uUnit) {
      for (let i = 0; i < 365; i++ ) {
        let currentDate = new Date().setDate(new Date().getDate() - [i])
        currentDate = new Date(currentDate)
        let eventFValue = uUnit.incomeFrequency ? uUnit.incomeFrequency[0] : uUnit.expenseFrequency[0];
        let eventDate = new Date(parseInt(uUnit.payDay || uUnit.dueDate))
        if (eventFValue.frequency === "monthly") {
          eventDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), new Date(parseInt(uUnit.payDay || uUnit.dueDate)).getDate())
        }
        eventDate.setHours(0,0,0,0)
        let eventnUnit = eventFValue.nUnit
        let eventnValue = eventFValue.nValue
        let lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
        lastDay.setHours(0,0,0,0)

        if (eventFValue.isSameDay === 'lastDay') {
          eventDate = new Date(lastDay)
        }

        let onWeekend = eventDate.getDay() === 6 || eventDate.getDay() === 0

        if (onWeekend && eventFValue.countWeekends === 'preWeekends') {
          while (eventDate.getDay() === 6 || eventDate.getDay() === 0) {
            eventDate = new Date(eventDate.setDate(eventDate.getDate() - 1))
          }
        } else if (onWeekend && eventFValue.countWeekends === 'postWeekends') {
          while (eventDate.getDay() === 6 || eventDate.getDay() === 0) {
            eventDate = new Date(eventDate.setDate(eventDate.getDate() + 1))
          }
        }
        if (eventDate.toDateString() === currentDate.toDateString() ||(eventFValue.frequency === 'other' && compareDate(eventnValue, eventnUnit, eventDate, currentDate.getTime())) || (eventFValue.frequency === 'daily') || (eventFValue.frequency === 'monthly' && currentDate.getDate() === eventDate.getDate()) || (eventFValue.frequency === 'yearly' && parseInt(currentDate.getMonth()) === parseInt(eventFValue.month) && parseInt(currentDate.getDate()) === parseInt(eventFValue.day))) {
          setGraphsData((prev) => [...prev, {eventID: eventDate.getTime()+uUnit._id, date: eventDate.getTime(), event: uUnit}])
        }      
      }
    }
  }

  useEffect(() => {
    const uniqueGraphs = [...new Map(graphsData.map((m) => [m.eventID, m])).values()];
    setUGraphsData(...[uniqueGraphs])
  },[graphsData, setGraphsData])

  useEffect(() => {
    for (let i = 0; i < uGraphsData.length; i ++) {
      if (uGraphsData[i].event.__typename === 'Incomes' && !iEvents.some(e => e.eventID === uGraphsData[i].eventID) && !iEvents.some(e=> e.eventID === undefined)) {
        iEvents.push(uGraphsData[i])
      } else if (uGraphsData[i].event.__typename === 'Expenses' && !eEvents.some(e => e.eventID === uGraphsData[i].eventID) && !eEvents.some(e=> e.eventID === undefined)) {
        eEvents.push(uGraphsData[i])
      }
    }
  },[uGraphsData, setUGraphsData, iEvents, eEvents])
  
  const loggedIn = Auth.loggedIn();

  
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

    //----Line Graph setup----//
    const lineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
            position: 'top',
            },
            title: {
            display: true,
            text: 'Incomes vs Expenses'
            },
        },
    }

    const lgraphlabels =  ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const lineData = {
        labels: lgraphlabels,
        datasets: [
          {
            label: 'Expenses',
            data: lgraphlabels.map((label, index) => {
              let monthTotal = 0;
              for (let i = 0 ; i < eEvents.length ; i ++) {
                if (new Date(eEvents[i].date).getMonth() === index)
                monthTotal += parseInt(eEvents[i].event.expenseValue)
                
              }
              return monthTotal;
            }),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Incomes',
            data: lgraphlabels.map((label, index) => {
              let monthTotal = 0;
              for (let i = 0 ; i < iEvents.length ; i ++) {
                if (new Date(iEvents[i].date).getMonth() === index)
                monthTotal += parseInt(iEvents[i].event.incomeValue)
              }
              return monthTotal;
            }),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
    };
    //++++End of Line Graph Setup++++//
    //----Doughnut Graph Setup----//
    const dDataLabels = [];
    for (let i = 0 ; i < eEvents?.length ; i ++) {
      if (eEvents[i].event.expenseCategory) {
        dDataLabels.push({dLabel: eEvents[i].event.expenseCategory, dValue: eEvents[i].event.expenseValue})
      }
    }

    let dDataLabelsres = dDataLabels.reduce((c, v) => {
      c[v.dLabel] = (c[v.dLabel] || 0) + parseFloat(v.dValue);
      return c;
    }, {});

    let aDataSetfinal = () => {
      const aDataSet = [];
      for (let i = 0 ; i < uGraphsData?.length ; i ++) {
        if (new Date(uGraphsData[i].date).getFullYear() === new Date().getFullYear())
        aDataSet.push({dLabel: new Date(uGraphsData[i].date).getMonth(), dValueup: uGraphsData[i].event.incomeValue || 0, dValuedown: uGraphsData[i].event.expenseValue || 0})
      }
      let aDataSetres = aDataSet.reduce((c, v) => {
        c[v.dLabel] = (c[v.dLabel] || 0) + parseFloat(v.dValueup) - parseFloat(v.dValuedown);
        return c;
      }, {});
      aDataSetres = Object.values(aDataSetres)
      let aDsetFinal = []
      let total = 0.00
      for (let i = 0; i < aDataSetres.length; i++) {
        total += aDataSetres[i]
        total = parseFloat(total.toFixed(2))
        aDsetFinal.push(total); 
      }
      return aDsetFinal
    }

    const doughnutData = {
        labels: [...Object.keys(dDataLabelsres)],
        datasets: [
            {
            label: 'Utilization by Category',
            data: [...Object.values(dDataLabelsres)],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
            },
        ],
    };
    //++++End of Doughnut Graph Setup++++//
    //----Area Graph Setup----//

    const areaOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Total Budget Fluctuation'
          },
        },
    };

    const areaData = {
        labels: lgraphlabels,
        datasets: [
          {
            fill: true,
            label: 'Total Budget',
            data: // lgraphlabels.map((label, index) => {
            //   let tGraphTotal = 0;
            //   for (let i = 0; i< iEvents.length; i++) {
            //     if (new Date(iEvents[i].date).getMonth() === index) {
            //       tGraphTotal += parseInt(iEvents[i].event.incomeValue)
            //     }
            //   }
            //   for (let i = 0 ; i < eEvents.length ; i ++) {
            //     if (new Date(eEvents[i].date).getMonth() === index) {
            //       tGraphTotal -= parseInt(eEvents[i].event.expenseValue)
            //     }
            //   }
            //   return tGraphTotal;
            // })
            aDataSetfinal(),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };
    //++++End of Area Graph Setup++++//
    
    return (
        <div className="graphsViewCont">
            {loggedIn && (
                <div className="graphsViewTitle">
                    <h2>Quick View</h2>
                    <div className="graphsView">
                        <div className="graphsDoughnut"><Doughnut data={doughnutData}/></div>
                        <div className="graphsLine"><Line options={lineOptions} data={lineData}/></div>
                        <div className="graphsArea"><Line options={areaOptions} data={areaData}/></div>
                    </div>
                </div>
            )}
            <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        </div>
    )
}

export default GraphsView;