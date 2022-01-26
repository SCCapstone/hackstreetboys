import Charts from "react-google-charts";

export const Chart: React.FC = () => {
    return (
        <Charts
    width={400}
    height={'300px'}
    chartType="AreaChart"
    loader={<div>Loading Chart</div>}
    data={[
      ['Calories', 'Days', 'Weight'],
      ['12000', 0, 400],
      ['8090', 30, 350],
      ['1200', 90, 290],
      ['1400', 150, 250],
    ]}
    options={{
      title: 'Weight Overview Progress',
      hAxis: { title: 'Calories', titleTextStyle: { color: '#333' } },
      vAxis: { minValue: 0 },
      // For the legend to fit, we make the chart area smaller
      chartArea: { width: '50%', height: '70%' },
      // lineWidth: 25
    }}
  />
    );
}

export default Chart;