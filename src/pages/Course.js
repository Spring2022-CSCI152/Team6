import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getCourseInfo } from '../components/getCourseInfo';
import { getUserInfo } from '../components/GetUserInfo'

function setRoleView(role){

  if(role==='admin'){
    
  }
}

function Course() {

  let { courseId } = useParams();

  const [course, setCourse] = useState();

  const [role, setRole] = useState();

  const [editButton, setEditButton] = useState();

  useEffect(async () => {

    await getCourseInfo(courseId).then((course) => {
      //debug
      // console.log(course);

      setCourse(course);

      //abbreviation
      const classNameAb = document.getElementById("classNameAb");
      classNameAb.textContent = "Class Name Abbreviation: " + course.classNameAb;

      //debug: tests
      // classNameAb.textContent = res;

      const className = document.getElementById("className");
      className.innerHTML = "<p>Class Name: " + course.className + "</p>";

      const prerequisites = document.getElementById("prerequisites");
      prerequisites.innerHTML = "<p>Prerequisites:<p>";
      for (let i of course.Prerequisites) {
        prerequisites.innerHTML += "<li>" + i + "</li>";
      }

      const description = document.getElementById("description");
      description.innerHTML = "<p>Description: " + course.Description + "</p>";

      const units = document.getElementById("units");
      units.innerHTML = "<p>Units: " + course.Units + "</p>";

      const term = document.getElementById("term");
      term.innerHTML = "<p>Course Typically Offered:<p>";
      for (let i of course.TermTypicallyOffered) {
        term.innerHTML = "<li>" + i + "</li>";
      }
    })
      .catch((error) => {
        console.log(error);

      })

    setRoleView(await getUserInfo().role);

  }, [])

  return (
    <div className="mainbox" id="result">
      <p className="line1" id="classNameAb"></p>
      <p className="line2" id="className"></p>
      <p className="line1" id="prerequisites"></p>
      <p className="line2" id="description"></p>
      <p className="line1" id="units"></p>
      <p className="line2" id="term"></p>
    </div>
  )
}

export default Course