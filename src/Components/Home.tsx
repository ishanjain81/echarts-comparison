import React,{useState} from 'react';
import ReactEcharts from "echarts-for-react"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faCircleChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faInfo, faGear, faCircleStop, faInbox, faBars } from '@fortawesome/free-solid-svg-icons';
import './Home.css';

function Home() {
    const [overall,setOverall] = useState<number[]>([9.37, 11.0, 11.9, 12.3, 12.5, 12.9, 13.7, 15.3, 16.6]);
    const [highPerformer,setHighPerformer] = useState<number[]>([8.59, 0.01, 10.9, 12.0, 9.27, 20.8, 11.6, 18.1, 16.6]);
    const difference : number[] = [0.78, 11.01, 1.08, 0.34, 3.20, -7.90, 2.04, -2.87, 0.01];
    const ylabels: string[] = ['Product', 'Office of CEO', 'Marketing', 'Customer Support', 'Finance', 'HR', 'IT', 'Sales', 'Operations'];
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
          splitLine:{
            show: true,
            lineStyle:{
              color: '#cccccc'
            }
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
          data: ylabels,
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
            data: overall,
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
            data: highPerformer
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
            let index: number = Number(params[0].name);
            let str: string = ylabels[index];
            let v1: number = overall[index];
            let v2: number = highPerformer[index];
            return `<div className="label-cont">
                <div style="color: black;font-weight: bold;">${str} 2019</div>
                <div style="color: #33b1f5;">Overall: ${v1}</div>
                <div style="color: rgb(244, 73, 73)">High Performer: ${v2}</div>
                <div style="color: #40e7d9;">Difference: ${params[0].value} pp</div>
              </div>`;
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
          splitLine:{
            show: true,
            lineStyle:{
              color: '#cccccc'
            }
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
          axisLabel: { show: false },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLine:{
            lineStyle:{
              color: '#cccccc'
            }
          }
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
                    s = '+' + s;
                  }
                  if(s.length === 4){
                    s = s + '0';
                  }
                  return s + ' pp';
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
            <h3 className="heading-top">Comparison of high performer resignation rates to the overall resignation rate &nbsp;
              <FontAwesomeIcon className="down-button" icon={faCircleChevronDown}/>
            </h3>
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
      <div className="icons-container">
        <div className="icon-box bg-blue"><FontAwesomeIcon className="icon" icon={faInfo}/></div>
        <div className="icon-box"><FontAwesomeIcon className="icon" icon={faBars}/></div>
        <div className="icon-box"><FontAwesomeIcon className="icon" icon={faGear}/></div>
        <div className="icon-box"><FontAwesomeIcon className="icon" icon={faCircleStop}/></div>
        <div className="icon-box bg-black"><FontAwesomeIcon className="icon" icon={faInbox}/></div>
      </div>
      <div className="value-container">
        <div className="summary">
          <div id="sum-cont"><div id="sum-head">Summary</div><div>Apr 2018 - Mar 2019 </div></div>
        </div>
        <div className="value-box">
          <div className="value-box-left blue">Overall</div>
          <div className="value-box-right blue">14.0 %</div>
        </div>
        <div className="value-box">
          <div className="value-box-left grey">Resignation Count</div>
          <div className="value-box-right grey">639</div>
        </div>
        <div className="value-box">
          <div className="value-box-left grey">Average HeadCount</div>
          <div className="value-box-right grey">4.58 <span className="k-small">&nbsp;K</span></div>
        </div>
        <div className="value-box">
          <div className="value-box-left red">High Performer</div>
          <div className="value-box-right red">14.1 %</div>
        </div>
        <div className="value-box">
          <div className="value-box-left grey">Resignation Count</div>
          <div className="value-box-right grey">152</div>
        </div>
        <div className="value-box">
          <div className="value-box-left grey">Average HeadCount</div>
          <div className="value-box-right grey">1.08 <span className="k-small">&nbsp;K</span></div>
        </div>
        <div className="value-box">
          <div className="value-box-left green">Difference</div>
          <div className="value-box-right green">-0.16 pp</div>
        </div>
        <div className="details-btn"><button>View details</button></div>
        <div className="chart-comp">Chart Completeness</div>
        <div className="settings-box"><div>Not all data are shown in this chart. To show these values, go to</div><div className="chart-settings">CHART SETTINGS</div></div>
      </div>
    </div>
  )
}

export default Home