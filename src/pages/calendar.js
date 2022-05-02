import React from "react";
import { useState } from 'react';
import Calendar from 'react-calendar';
//import 'react-calendar/dist/Calendar.css';
import Header from "../components/Header";
import calendar from "./calendar.css"
import {Container, Row, Col} from 'react-bootstrap/';
import { css } from "@emotion/react";


const API_KEY = "AIzaSyBO7bR7-Nja1oZbT9ERkaxIUugtf3YsDDQ";
let calendars = [
  {calendarId: "ttutcd57v67relg0dg4aj77l50@group.calendar.google.com", color: "#B241D1"}, //add a color field to specify the color of a calendar
];

let styles = {
  //you can use object styles (no import required)
  calendar: {
    borderWidth: "3px", //make outer edge of calendar thicker
  },
  
<<<<<<< Updated upstream
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
=======
  //you can also use emotion's string styles
  today: css`
   /* highlight today by making the text red and giving it a red border */
    color: red;
    border: 1px solid red;
  `
}

class Calendar1 extends React.Component {
  render() {
    return (
      <div>
        <Calendar apiKey={API_KEY} calendars={calendars} styles={styles} />
      </div>
    )
  }
}

export default Calendar1
>>>>>>> Stashed changes
