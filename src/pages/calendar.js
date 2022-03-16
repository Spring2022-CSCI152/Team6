import React from "react";
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Header from "../components/Header";


function Calendar1() {
  
  // render() {
    const [date, setDate] = useState(new Date());
    return (
      <div className='app'>
        <Header></Header>
      <h1 className='text-center'>React Calendar</h1>
      <div className='calendar-container'>
        <Calendar onChange={setDate} value={date} />
      </div>
      <p className='text-center'>
        <span className='bold'>Selected Date:</span>{' '}
        {date.toDateString()}
      </p>
    </div>
    );
  }
//}
export default Calendar1;