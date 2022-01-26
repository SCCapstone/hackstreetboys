import { Chart } from "react-google-charts";

export const LineChart: React.FC = () => {
    return (
        <Chart
    width={500}
    height={'400px'}
    chartType="LineChart"
    loader={<div>Loading Chart</div>}
    data={[
        [
            { type: "number", label: "x" },
            { type: "number", label: "values" },
            { id: "i0", type: "number", role: "interval" },
            { id: "i1", type: "number", role: "interval" },
            { id: "i2", type: "number", role: "interval" },
            { id: "i2", type: "number", role: "interval" },
            { id: "i2", type: "number", role: "interval" },
            { id: "i2", type: "number", role: "interval" },
          ],
          [1, 100, 90, 110, 85, 96, 104, 120],
          [2, 120, 95, 130, 90, 113, 124, 140],
          [3, 130, 105, 140, 100, 117, 133, 139],
          [4, 90, 85, 95, 85, 88, 92, 95],
          [5, 70, 74, 63, 67, 69, 70, 72],
          [6, 30, 39, 22, 21, 28, 34, 40],
          [7, 80, 77, 83, 70, 77, 85, 90],
          [8, 100, 90, 110, 85, 95, 102, 110],
        
    ]}
    options={{
      title: 'Daily Walking Progress',
      curveType: "function",
      series: [{ color: "#E7711B" }],
      intervals: { style: "area" },
      legend: "none",
      // For the legend to fit, we make the chart area smaller
     // chartArea: { width: '50%', height: '70%' },
      // lineWidth: 25
    }}
  />
    );
}

export default LineChart;

  