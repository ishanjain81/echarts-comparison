import React,{useState} from 'react';
import ReactEcharts from "echarts-for-react"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faCircleChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import './Home.css';

function Home() {
    const [daysToCloseCase,setDaysToCloseCase] = useState<number[]>([9.37, 11.0, 11.9, 12.3, 12.5, 12.9, 13.7, 15.3, 16.6]);
    const [openCasesAge,setOpenCasesAge] = useState<number[]>([8.59, 0.01, 10.9, 12.0, 9.27, 20.8, 11.6, 18.1, 16.6]);
    const difference : number[] = [0.78, 11.01, 1.08, 0.34, 3.20, -7.91, 2.04, -2.87, 0.01];
    let arr: any[] = [];

    const labelRight = {
        position: 'right'
    } as const;
    
    const labelLeft = {
        position: 'left'
    } as const;

    for(let index = 0; index < difference.length; index++){
        if(difference[index] >= 0){
            arr.push({
                value: difference[index],
                label: labelRight
            });
        }
        else{
            arr.push({
                value: difference[index],
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
          axisLine:{
            show: true
          },
          axisLabel:{
            formatter: function (value: number) {
              if(value === 0){
                return value + '.00%'
              }
              else{
                return value + '.0%';
              }
            }
          }
        },
        yAxis: {
          type: 'category',
          data: ['Product', 'Office of CEO', 'Marketing', 'Customer Support', 'Finance', 'HR', 'IT', 'Sales', 'Operations'],
          axisTick:{
            show: false
          }
        },
        series: [
          {
            name: 'Overall',
            type: 'bar',
            label: {
                show: true,
                position: 'right',
                formatter: function (data: any) {
                  return data.value + '%';
                },
                fontWeight: 600,
                color: '#5CB5E6'
            },
            color: '#5CB5E6',
            data: daysToCloseCase,
            barGap: 0
          },
          {
            name: 'High Performer',
            type: 'bar',
            label: {
                show: true,
                position: 'right',
                formatter: function (data: any) {
                  return data.value + '%';
                },
                fontWeight: 600,
                color: '#FD8F80'
            },
            color: '#FD8F80',
            data: openCasesAge
          }
        ]
      };
      
      const option1 = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: function (params: any) {
            console.log(params)
            return `${params}<br />`;
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
          max: 20,
          axisLine:{
            show: true
          },
          axisLabel:{
            formatter: function (value: number) {
              if(value === 0){
                return '0.00 pp';
              }
              else{
                return value + '.0 pp';
              }
            }
          }
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
                formatter: function (data: any) {
                  let s: string = data.value.toString();
                  if(data.value >= 0){
                    return '+' + s + ' pp';
                  }
                  else{
                    return s + ' pp';
                  }
                },
                fontWeight: 600,
                color: '#5AD0C7'
            },
            color: '#5AD0C7',
            data: arr
          }
        ]
      };

  return (
    <div className="main-container">
      <div className="data-container">
        <div className="top-container">
          <div className="heading">
            <h4 className="heading-top">Comparison of high performer resignation rates to the overall resignation rate &nbsp;
              <FontAwesomeIcon className="down-button" icon={faCircleChevronDown}/>
            </h4>
            <p className="heading-bottom">Do high performers resign more often than the others?</p>
          </div>
          <div className="buttons">
            <button className="top-button"><FontAwesomeIcon icon={faCalendar}/>&nbsp; Mar 2019</button>
            <button className="top-button"><FontAwesomeIcon icon={faPlus}/>&nbsp;&nbsp; Add a Filter</button>
          </div>
        </div>
        <div className="chart-container">
          <div className="left-container"><ReactEcharts option={option} style={{height: '100%', width: '100%'}} /></div>
          <div className="right-container"><ReactEcharts option={option1} style={{height: '100%', width: '100%'}}/></div>
        </div>
      </div>
      <div className="value-container"></div>
    </div>
  )
}

export default Home