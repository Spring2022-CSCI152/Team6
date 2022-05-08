import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getCourseInfo } from '../components/getCourseInfo';
import { getUserInfo } from '../components/GetUserInfo'
import ContentEditable from 'react-contenteditable'
import { Button, Table } from 'react-bootstrap';


function setRoleView(role) {

  if (role === 'admin') {

  }
}

function Course() {

  let { courseId } = useParams();

  const [course, setCourse] = useState();

  const [view, setView] = useState();

  const [editButton, setEditButton] = useState();

  const [disable, setDisable] = useState(true);
  function handleClick(event) {
    setDisable(!disable);
}


  useEffect(async () => {

    await getCourseInfo(courseId).then((course) => {
      //debug
      // console.log(course);

      setCourse(course);

      //abbreviation
      const classNameAb = document.getElementById("classNameAb");
      classNameAb.textContent = course.classNameAb;

      //debug: tests
      // classNameAb.textContent = res;

      const className = document.getElementById("className");
      className.innerHTML = course.className;

      const prerequisites = document.getElementById("prerequisites");
      prerequisites.innerHTML = "<p><p>";
      for (let i of course.Prerequisites) {
        prerequisites.innerHTML += "<li>" + i + "</li>";
      }

      const description = document.getElementById("description");
      description.innerHTML = course.Description;

      const units = document.getElementById("units");
      units.innerHTML = course.Units;

      const term = document.getElementById("term");
      term.innerHTML = "<p><p>";
      for (let i of course.TermTypicallyOffered) {
        term.innerHTML = "<li>" + i + "</li>";
      }
    })
      .catch((error) => {
        console.log(error);

      })

    if(await getUserInfo().role === 'admin'){

      
    }

  }, [])

  return (
    <>
      <div className="mainbox" id="result">
        <table>
          {/* <thead>
          <tr>
              <td className="line1" id="classNameAb"></td>
              <td className="line1">{course.classNameAb}</td>
          </tr>
          </thead> */}
          <tbody>
          <tr>
              <td className="line1">Class Name Abbreviation: </td>
              <td className="line1" id="classNameAb"></td>
          </tr>
          <tr>
              <td className="line2" >Class Name: </td>
              <td className="line2" id="className"></td>
          </tr>
          <tr>
              <td className="line1" >Prerequisites:</td>
              <td className="line1" id="prerequisites"></td>
          </tr>
          <tr>
              <td className="line2" >Description: </td>
              <td className="line2" id="description"></td>
          </tr>
          <tr>
              <td className="line1" >Units: </td>
              <td className="line1" id="units"></td>
          </tr>
          <tr>
              <td className="line2" >Course Typically Offered:</td>
              <td className="line2" id="term"></td>
          </tr>
          </tbody>
      </table>
        {/* <p className="line1" id="classNameAb"></p>
        <p className="line2" id="className"></p>
        <p className="line1" id="prerequisites"></p>
        <p className="line2" id="description"></p>
        <p className="line1" id="units"></p>
        <p className="line2" id="term"></p> */}
        {/* <button onClick={handleClick}>{ disable? "< Enable >" : "< Disable >" }</button> */}
      </div>


      {editButton}
    </>
  )
}

export default Course