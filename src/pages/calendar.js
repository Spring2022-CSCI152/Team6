import React from "react";
import { useState } from 'react';
import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import Header from "../components/Header";
// import calendar from "./calendar.css"
import {Container, Row, Col} from 'react-bootstrap/';


function Calendar1() {
  
  // render() {
    const [date, setDate] = useState(new Date());
    return (
      <div className='app' style = {{textAlign : "center"}}>
        <Header></Header>
      <h1 className='text-center'>React Calendar</h1>
      <div className='calendar-container' style = {{textAlign : "center"}}>
        <Calendar onChange={setDate} value={date} />
      </div>
      <p className='text-center' style={{fontSize: "20px"}} >
        <span className='bold' style = {{color: "white"}}>Selected Date:</span>{' '}
        <span className='bold' style = {{color: "white"}}>{date.toDateString()}</span>
      </p>
    </div>
    );
  }
//}
export default Calendar1;