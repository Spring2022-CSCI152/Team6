import React from "react";
import { useState } from 'react';
import Calendar from 'react-calendar';
//import 'react-calendar/dist/Calendar.css';
import Header from "../components/Header";
import calendar from "./calendar.css"
import {Container, Row, Col} from 'react-bootstrap/';


function Calendar1() {
  
  // render() {
    const [date, setDate] = useState(new Date());
    return (
      <div className='app'>
        <h1 className='text-center'>React Calendar with Range</h1>
        <div className='calendar-container'>
          <Calendar
            onChange={setDate}
            value={date}
            selectRange={true}
          />
        </div>
        {date.length > 0 ? (
          <p className='text-center'>
            <span className='bold'>Start:</span>{' '}
            {date[0].toDateString()}
            &nbsp;|&nbsp;
            <span className='bold'>End:</span> {date[1].toDateString()}
          </p>
        ) : (
          <p className='text-center'>
            <span className='bold'>Default selected date:</span>{' '}
            {date.toDateString()}
          </p>
        )}
      </div>
    );
  }
  
//}
export default Calendar1;
