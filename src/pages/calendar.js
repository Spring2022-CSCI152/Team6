import React from "react";
import { useState } from 'react';
import Calendar from 'react-calendar';
//import 'react-calendar/dist/Calendar.css';

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
  
  //you can also use emotion's string styles
  today: css`
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