import React from "react";
import { useState } from 'react';
import Calendar from 'react-calendar';
//import 'react-calendar/dist/Calendar.css';
import '../CSS/CC.css';
import '../CSS/Reminder.css'

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
              <div>
             <div className="firstsection">
             <div className="box-main">
             <div className="firstHalf">
             <h1 className="text-big" id="web"> <u className = "underline">Important Dates</u></h1>
                <section className="task-list">
                  <div id="tasks">
              <div className = "reg"> Holiday - Martin Luther King Jr. Day </div>
              <div className = "linee"> Date: 01/17/2022 </div>
              <div className = "description"> Description: Holiday, no instructions </div>
            </div>
          </section> 
          <section className="task-list1">
                  <div id="tasks">
              <div className = "reg"> First Day of Spring Semester </div>
              <div className = "linee"> Date: 01/18/2022 </div>
              <div className = "description"> Description: First day of Spring semester </div>
            </div>
          </section> 
          <section className="task-list">
                  <div id="tasks">
              <div className = "reg"> First Day of Spring Instruction </div>
              <div className = "linee"> Date: 01/20/2022 </div>
              <div className = "description"> Description: First day of instructions beginning online </div>
            </div>
          </section> 
          <section className="task-list1">
                  <div id="tasks">
              <div className = "reg"> Holiday - President's Day  </div>
              <div className = "linee"> Date: 02/21/2022 </div>
              <div className = "description"> Description: Holiday, no instructions</div>
            </div>
          </section> 
          <section className="task-list">
                  <div id="tasks">
              <div className = "reg"> Holiday - Ceasar Chavez Day  </div>
              <div className = "linee"> Date: 03/31/2022 </div>
              <div className = "description"> Description: Holiday, no instructions</div>
            </div>
          </section>
          <section className="task-list1">
                  <div id="tasks">
              <div className = "reg"> Spring Break  </div>
              <div className = "linee"> Date: 04/11/2022 - 04/15/2022 </div>
              <div className = "description"> Description: Holiday, no instructions</div>
            </div>
          </section>  
          <section className="task-list">
                  <div id="tasks">
              <div className = "reg"> Fall Registration </div>
              <div className = "linee"> Date: 04/18/2022 </div>
              <div className = "description"> Description: You may begin enrolling for the Fall 2022 Regular Academic Session </div>
            </div>
          </section> 
          <section className="task-list1">
                  <div id="tasks">
              <div className = "reg"> Last Day of Spring Instruction  </div>
              <div className = "linee"> Date: 05/11/2022 </div>
              <div className = "description"> Description: No more instructions</div>
            </div>
          </section> 
          <section className="task-list">
                  <div id="tasks">
              <div className = "reg"> Consultation Days  </div>
              <div className = "linee"> Date: 05/12/2022 - 05/13/2022</div>
              <div className = "description"> Description: Consultation with professors</div>
            </div>
          </section> 
          <section className="task-list1">
                  <div id="tasks">
              <div className = "reg"> Final Examination Days </div>
              <div className = "linee"> Date: 05/16/2022 - 05/19/2022 </div>
              <div className = "description"> Description: Final exmainiation for courses</div>
            </div>
          </section> 
        </div>
      </div>
    </div>
  </div>
    

      </div>
    )
  }
}

export default Calendar1