// eslint-disable-next-line no-unused-vars
import Chart, { Legend } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { ResizeObserver as ResizeObserverPolyfill } from "@juggle/resize-observer";

const MainChart = ({ labels, data, timeFrame }) => {
  if (typeof window !== "undefined") {
    window.ResizeObserver = window.ResizeObserver || ResizeObserverPolyfill;
  }
  const dataArr = [];
  data.forEach((el) => {
    const d = {
      label: el.name,
      data: el.chart,
      fill: false,
      backgroundColor: el.color,
      borderColor: el.color,
      pointRadius: 0,
      borderWidth: 2,
    };
    dataArr.push(d);
  });
  return (
    <div className="bg-white rounded-3xl p-6 h-[400px] drop-shadow-md w-full">
      <p className="text-lg font-medium pb-10">
        Total Engagement : {timeFrame} Days
      </p>
      <div className="h-[80%]">
        <Line
          data={{
            labels,
            datasets:
              //     {
              //       label: "First dataset",
              //       data,
              //       fill: true,
              //       backgroundColor: "rgba(82, 82, 82,0.2)",
              //       borderColor: "rgba(82, 82, 82,1)",
              //       pointRadius: 0,
              //     },
              //   ],
              [...dataArr],
          }}
          options={{
            maintainAspectRatio: false,
            animation: {
              duration: 0.1,
            },
            elements: {
              line: {
                tension: 0.2,
              },
            },
            scales: {
              x: {
                border: {
                  display: false,
                },
                grid: {
                  border: false,
                  color: "#00000",
                  display: false,
                },
                ticks: {
                  color: "gray",
                  // callback: function (value, index, ticks) {
                  //   console.log(timeFrame);
                  //   if (timeFrame > 30) {
                  //     console.log("in here s", value % 100);
                  //     if (value  === 100) {
                  //       return labels[value];
                  //     }
                  //   }
                  //   if (timeFrame > 7) {
                  //     if (value % 2 === 0) {
                  //       return labels[value];
                  //     }
                  //   } else {
                  //     console.log('in here')
                  //     if (value % 1 === 0) {
                  //       return labels[value];
                  //     }
                  //   }
                  // },
                },
              },
              y: {
                border: {
                  display: false,
                },
                grid: {
                  // color: "#00000",
                  // display: false,
                },
                ticks: {
                  color: "gray",
                  // display: false,
                  callback: function (value, index, ticks) {
                    if (value % 1 === 0) {
                      return value;
                    }
                  },
                },
              },
            },
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default MainChart;
