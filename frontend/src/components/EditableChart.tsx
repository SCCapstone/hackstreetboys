import React, { useEffect, useState } from "react";
import { GoogleChartEditor } from "react-google-charts/dist/types";
import { GoogleChartWrapper } from "react-google-charts/dist/types";
import { GoogleViz } from "react-google-charts/dist/types";
import  Chart from "react-google-charts";
import { IonButton } from "@ionic/react";

 export function EditableChart() {
    var data = [
        ["Time", "Time Spent Walking"],
        [0, 0],
      ];
      
      var options = {
        title: "Daily Walking Progress",
        hAxis: { title: "Time (hrs)", minValue: 0, maxValue: 15 },
        vAxis: { title: "Time Spent Walking (hrs)", minValue: 0, maxValue: 15 },
        legend: "none",
      };

  const [chartEditor, setChartEditor] = useState<GoogleChartEditor>();
  const [chartWrapper, setChartWrapper] = useState<GoogleChartWrapper>();
  const [google, setGoogle] = useState<GoogleViz>();
  const onEditClick = () => {
    if (!chartWrapper || !google || !chartEditor) {
      return;
    }

    chartEditor.openDialog(chartWrapper);

    google.visualization.events.addListener(chartEditor, "ok", () => {
      const newChartWrapper = chartEditor.getChartWrapper();

      newChartWrapper.draw();

      const newChartOptions = newChartWrapper.getOptions();
      const newChartType = newChartWrapper.getChartType();

      console.log("Chart type changed to ", newChartType);
      console.log("Chart options changed to ", newChartOptions);
    });

    
  };

  var hour = new Date().getHours();


  function addQuarter() {
    console.log('in add quarter');
    data.push([hour,0.25])
    console.log(data);
    renderChart();
  }

  function addHalf() {
    console.log('in add half');
    data.push([hour,0.5])
    console.log(data);
    renderChart();

   }

   function addOne() {
    console.log('in add hour');
    data.push([hour,1])
    console.log(data);
    renderChart();

   }

return (
    <>
    {console.log('in def ret')}
              <IonButton color='success' onClick={addQuarter}>+ 15 min</IonButton>
              <IonButton color='success'onClick={addHalf}>+ 30 min</IonButton>
              <IonButton color='success' onClick={addOne}>+ 1 hr</IonButton>
      <Chart
        chartType="ScatterChart"
        width="80%"
        height="400px"
        data={data}
        options={options}
        chartPackages={["corechart", "controls", "charteditor"]}
        getChartEditor={({ chartEditor, chartWrapper, google }) => {
          setChartEditor(chartEditor);
          setChartWrapper(chartWrapper);
          setGoogle(google);
        }}
      />
      <IonButton color='primary' onClick={onEditClick}>Customize Chart</IonButton>
    </>
  );

  function renderChart() {

    return (
        <>
        {console.log('in renderchart')}
                  <IonButton color='success' onClick={addQuarter}>+ 15 min</IonButton>
                  <IonButton color='success'onClick={addHalf}>+ 30 min</IonButton>
                  <IonButton color='success' onClick={addOne}>+ 1 hr</IonButton>
          <Chart
            chartType="ScatterChart"
            width="80%"
            height="400px"
            data={data}
            options={options}
            chartPackages={["corechart", "controls", "charteditor"]}
            getChartEditor={({ chartEditor, chartWrapper, google }) => {
              setChartEditor(chartEditor);
              setChartWrapper(chartWrapper);
              setGoogle(google);
              
            }}
            
          />
          <IonButton color='primary' onClick={onEditClick}>Customize Chart</IonButton>
        </>
      );
  }
  
}

export default EditableChart;
