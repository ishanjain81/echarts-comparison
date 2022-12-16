import React,{useState} from 'react';
import ReactEcharts from "echarts-for-react"; 
import './Home.css';

function Home() {
    const [daysToCloseCase,setDaysToCloseCase] = useState<number[]>([23.2, 23.9, 38.6, 41.7, 48.7, 60.6, 83.9]);
    const [openCasesAge,setOpenCasesAge] = useState<number[]>([15.9, 15.5, 28.7, 54.5, 53.6, 68.3, 64]);
    let arr: any[] = [];

    const labelRight = {
        position: 'right'
    } as const;
    
    const labelLeft = {
        position: 'left'
    } as const;

    for(let index = 0; index < daysToCloseCase.length; index++){
        let d: number = Number((daysToCloseCase[index] - openCasesAge[index]).toFixed(2));
        if(d >= 0){
            arr.push({
                value: d,
                label: labelRight
            });
        }
        else{
            arr.push({
                value: d,
                label: labelLeft
            });
        }
    }

    const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
        },
        yAxis: {
          type: 'category',
          data: ['Leave of Absence', 'HR Policy Enquiry', 'Employee Relations', 'Data Change', 'Employee Grievance', 'Compensation', 'Benefits']
        },
        series: [
          {
            name: 'Case Days to Close',
            type: 'bar',
            label: {
                show: true,
                position: 'right'
            },
            color: 'rgb(15, 174, 227)',
            data: daysToCloseCase
          },
          {
            name: 'Open Cases Age',
            type: 'bar',
            label: {
                show: true,
                position: 'right'
            },
            color: 'rgb(238, 85, 111)',
            data: openCasesAge
          }
        ]
      };
      
      const option1 = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
          type: 'value',
          min: -20,
          max: 22,
        },
        yAxis: {
          type: 'category',
          axisLine: { show: false },
          axisLabel: { show: false },
          axisTick: { show: false },
          splitLine: { show: false },
        },
        series: [
          {
            name: 'Difference',
            type: 'bar',
            stack: 'Total',
            label: {
                show: true,
            },
            color: 'rgb(23, 199, 178)',
            data: arr
          }
        ]
      };

  return (
    <div className="main-container">
        <div className="left-container"><ReactEcharts option={option} style={{height: '100%', width: '100%'}} /></div>
        <div className="right-container"><ReactEcharts option={option1} style={{height: '100%', width: '100%'}}/></div>
        <div className="value-container"></div>
    </div>
  )
}

export default Home