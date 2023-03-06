// eslint-disable-next-line no-unused-vars
import Chart, { Legend } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { useState, useEffect } from "react";
import { ResizeObserver as ResizeObserverPolyfill } from "@juggle/resize-observer";
const MiniChart = ({ labels, data, title }) => {
  if (typeof window !== "undefined") {
    window.ResizeObserver = window.ResizeObserver || ResizeObserverPolyfill;
  }
  const [difference, setDifference] = useState(0);
  const [trend, setTrend] = useState(0);
  useEffect(() => {
    const newValue = data[data.length - 1];
    const originalValue = data[0];
    const val =
      ((newValue - originalValue) / (originalValue > 0 ? originalValue : 1)) *
      100;
    const trendLine = data[0] - data[data.length - 1];
    setTrend(trendLine);
    setDifference(val.toFixed(0));
  }, [data]);

  return (
    <div className="bg-white  rounded-3xl p-4 md:p-6  flex flex-col  drop-shadow-md">
      <p className="text-gray-900 font-medium">{title}</p>
      <div className="flex flex-row space-x-1">
        <div className="flex flex-row w-[40%]">
          <div className="flex flex-row space-x-[10px] items-end">
            <p className="text-2xl font-medium">
              {data.reduce((total, curr) => total + curr)}
            </p>
            <div className="flex flex-row content-end items-end">
              {difference > 0 ? (
                <GoTriangleUp size={14} className="text-green mb-[2px]" />
              ) : difference < 0 ? (
                <GoTriangleDown size={14} className="text-red mb-[2px]" />
              ) : (
                <GoTriangleUp size={14} className="text-gray-600 mb-[2px]" />
              )}
              <p
                className={`${
                  difference > 0
                    ? "text-green"
                    : difference < 0
                    ? "text-red"
                    : "text-gray-600"
                } text-sm`}
              >
                {difference}%
              </p>
            </div>
          </div>
        </div>
        <div className="w-[60%] h-[60px]  ">
          <Line
            data={{
              labels,
              datasets: [
                {
                  label: "First dataset",
                  data,
                  fill: true,
                  backgroundColor:
                    trend < 0
                      ? "rgba(75,192,192,0.2)"
                      : trend > 0
                      ? "rgba(242,40,0,0.2)"
                      : "rgba(82, 82, 82,0.2)",
                  borderColor:
                    trend < 0
                      ? "rgba(75,192,192,1)"
                      : trend > 0
                      ? "rgba(242,40,0,1)"
                      : "rgba(82, 82, 82,1)",
                  pointRadius: 0,
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              animation: {
                duration: 1,
              },
              maintainAspectRatio: false,
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
                    display: false,
                  },
                },
                y: {
                  border: {
                    display: false,
                  },
                  grid: {
                    color: "#00000",
                    display: false,
                  },
                  ticks: {
                    color: "pink",
                    display: false,
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
    </div>
  );
};

export default MiniChart;
