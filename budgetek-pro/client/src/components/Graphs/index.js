import React from "react";
import Auth from '../../utils/auth';
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

function GraphsView(props) {

  const graphsData = props.graphData; 
  console.log(graphsData)

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
            text: 'Chart.js Line Chart',
            },
        },
    }

    const lgraphlabels =  ['January', 'February', 'March', 'April', 'May', 'June', 'July']

    const lineData = {
        labels: lgraphlabels,
        datasets: [
          {
            label: 'Expenses',
            data: lgraphlabels.map(() => Math.floor(Math.random() * 1000)),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Incomes',
            data: lgraphlabels.map(() => Math.floor(Math.random() * 1000)),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
    };
    //++++End of Line Graph Setup++++//
    //----Doughnut Graph Setup----//
    const dDataLabels = [];
    for (let i = 0 ; i < graphsData?.length ; i ++) {
      if (graphsData[i].iandeEvent.expenseCategory) {
        dDataLabels.push(graphsData[i].iandeEvent.expenseCategory)
      }
    }

    console.log(dDataLabels)
    const doughnutData = {
        labels: [...dDataLabels],
        datasets: [
            {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2],
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
            text: 'Chart.js Line Chart',
          },
        },
    };

    const areaLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const areaData = {
        labels: areaLabels,
        datasets: [
          {
            fill: true,
            label: 'Total Budget',
            data: areaLabels.map(() => Math.floor(Math.random() * 1000) - Math.floor(Math.random() * 1000)),
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