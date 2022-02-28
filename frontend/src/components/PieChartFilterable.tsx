import { Chart } from "react-google-charts";

export const PieChart: React.FC = () => {
    return (
        <Chart
        chartType="PieChart"
        width="80%"
        height="400px"
        
       loader={<div>Loading Chart</div>}
    data={[
            ["Food", "Calories", "Fat", "Carbs", "Protein"],
            ["Banana", 100, 10, 5, 67],
            ["Coffee", 100, 10, 5, 1],
            ["Donut", 300, 200, 1, 0],
            ["Chicken Fingers", 500, 100, 2, 34],
            ["Rice", 250, 100, 6, 34], 
            ["Apple", 100, 10, 1, 18],
            ["Steak", 500, 100, 1, 100],
            ["Margarita", 210, 200, 8, 1],
            ["Muffin", 250, 200, 5, 34], 
        
    ]}
    options={{
        legend: "none",
        chartArea: { left: 0, top: 0, right: 0, bottom: 45 },
        pieSliceText: "label",

    }}

    controls={[
        {
          controlEvents: [
            {
              eventName: "statechange",
              callback: ({ chartWrapper, controlWrapper }) => {
                console.log("State changed to", controlWrapper?.getState());
              },
            },
          ],
          controlType: "CategoryFilter",
          options: {
            filterColumnIndex: 1,
            ui: {
              labelStacking: "vertical",
              label: "Daily Food Intake:",
              allowTyping: false,
              allowMultiple: false,
            },
          },
        },
      ]}
  />
    );
}

export default PieChart;