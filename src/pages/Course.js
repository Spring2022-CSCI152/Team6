import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getCourseInfo, updateCourseInfo } from '../components/getCourseInfo';
import ContentEditable from 'react-contenteditable'
import { Button, Table } from 'react-bootstrap';



//builds table of course information
const basicView = (course) => {

  const courseInfoTable = [];

  var keyNum = 0;
  var keyNum1 = 0;

  //class abbreviation 
  courseInfoTable.push(<tr key={keyNum++}>
    <td className="line1">Class Name Abbreviation:</td>
    <td className="line1">{course.classNameAb}</td>
  </tr>)
  // const classNameAb = document.getElementById("classNameAb");
  // classNameAb.textContent = course.classNameAb;


  //class Name
  courseInfoTable.push(<tr key={keyNum++}>
    <td className='line2'>Class Name:</td>
    <td className='line2'>{course.className}</td>
  </tr>)
  // const className = document.getElementById("className");
  // className.innerHTML = course.className;

  //prerequisites
  const prereqsArr = [];
  for (let i of course.Prerequisites) {
    prereqsArr.push(<li key={keyNum1++}>{i}</li>);
  }
  courseInfoTable.push(<tr key={keyNum++}>
    <td className='line1'>Prerequisites:</td>
    <td className='line1'><p>{prereqsArr}</p></td>
  </tr>)
  // const prerequisites = document.getElementById("prerequisites");
  // prerequisites.innerHTML = "<p><p>";
  // for (let i of course.Prerequisites) {
  //   prerequisites.innerHTML += "<li>" + i + "</li>";
  // }

  //description
  courseInfoTable.push(<tr key={keyNum++}>
    <td className='line2'>Description:</td>
    <td className='line2'><p>{course.Description}</p></td>
  </tr>)
  // const description = document.getElementById("description");
  // description.innerHTML = course.Description;

  //units
  courseInfoTable.push(<tr key={keyNum++}>
    <td className='line1'>Units:</td>
    <td className='line1'><p>{course.Units}</p></td>
  </tr>)
  // const units = document.getElementById("units");
  // units.innerHTML = course.Units;

  //term
  const term = [];
  for (let i of course.TermTypicallyOffered) {
    term.push(<li key={keyNum1++}> {i}</li>);
  }
  courseInfoTable.push(<tr key={keyNum++}>
    <td className='line2'>Course Typically Offered:</td>
    <td className='line2'><p>{term}</p></td>
  </tr>)
  // const term = document.getElementById("term");
  // term.innerHTML = "<p><p>";
  // for (let i of course.TermTypicallyOffered) {
  //   term.innerHTML = "<li>" + i + "</li>";
  // }

  return (<table><tbody>{courseInfoTable}</tbody></table>)
}

//used to change state inputs in edit view
const updateCourse = (field, value, course, setCourse, setCourseViewHtml) => {

  course[field] = value;
  setCourse(course);
  setCourseViewHtml(buildEditView(course, setCourse, setCourseViewHtml));
  console.log(course);
}

//builds table of editable course information
const buildEditView = (course, setCourse, setCourseViewHtml) => {

  const courseInputTable = [];

  var keyNum = 0;

  //class abbreviation 
  courseInputTable.push(<tr key={keyNum++}>
    <td className="line1">Class Name Abbreviation:</td>
    <td className="line1"><input type="text" value={course.classNameAb} id='classNameAbInput' onChange={() => {
      updateCourse("classNameAb", document.getElementById('classNameAbInput').value, course, setCourse, setCourseViewHtml)
    }} />
    </td>
  </tr>)

  //class Name
  courseInputTable.push(<tr key={keyNum++}>
    <td className="line2">Class Name:</td>
    <td className="line2"><input type="text" value={course.className} id='classNameInput' onChange={() => {
      updateCourse("className", document.getElementById('classNameInput').value, course, setCourse, setCourseViewHtml)
    }} />
    </td>
  </tr>)

  //prerequisites
  courseInputTable.push(<tr key={keyNum++}>
    <td className="line1">Prerequisites:</td>
    <td className="line1"><input type="text" value={course.Prerequisites} id='prerequisitesInput' onChange={() => {
      updateCourse("Prerequisites", document.getElementById('prerequisitesInput').value, course, setCourse, setCourseViewHtml)
    }} />
    </td>
  </tr>)

  //description
  courseInputTable.push(<tr key={keyNum++}>
    <td className="line2">Description:</td>
    <td className="line2"><textarea value={course.Description} id='descriptionInput' onChange={() => {
      updateCourse("Description", document.getElementById('descriptionInput').value, course, setCourse, setCourseViewHtml)
    }} />
    </td>
  </tr>)

  //units
  courseInputTable.push(<tr key={keyNum++}>
    <td className="line1">Units:</td>
    <td className="line1"><input type="text" value={course.Units} id='unitsInput' onChange={() => {
      updateCourse("Units", document.getElementById('unitsInput').value, course, setCourse, setCourseViewHtml)
    }} />
    </td>
  </tr>)

  //term
  courseInputTable.push(<tr key={keyNum++}>
    <td className="line2">Course Typically Offered:</td>
    <td className="line2"><input type="text" value={course.TermTypicallyOffered} id='termInput' onChange={() => {
      updateCourse("TermTypicallyOffered", document.getElementById('termInput').value, course, setCourse, setCourseViewHtml)
    }} />
    </td>
  </tr>)

  return (<table><tbody>{courseInputTable}</tbody></table>)
}

//saves course changes to database
const save = async (course) =>{

  await updateCourseInfo({class_id:course._id,classChanges:course})
  .then((res) =>{

    alert(res.data.message);
  })
  .catch((error) =>{
    console.log(error);
  })

}

function Course() {


  let { courseId } = useParams();

  const [course, setCourse] = useState();

  const [courseViewHtml, setCourseViewHtml] = useState([]);

  const [viewButton, setViewButton] = useState();

  // const [disable, setDisable] = useState(true);

  // function handleClick(event) {
  //   setDisable(!disable);
  // }

  useEffect(async () => {

    await getCourseInfo(courseId).then((course) => {

      setCourse(course);

      setCourseViewHtml(basicView(course));

      const role = localStorage.getItem('role');

      const editButton = role === 'admin' ? <button onClick={() => { setCourseViewHtml(buildEditView(course, setCourse, setCourseViewHtml)); setViewButton(readButton) }}>Edit Course</button> : ""

      const readButton = role === 'admin' ? <button onClick={() => { setCourseViewHtml(basicView(course)); setViewButton(editButton) }}>View Course</button> : ""

      setViewButton(editButton);
    })
      .catch((error) => {
        console.log(error);

      })

  }, [])

  const saveButton = <button onClick={() => { save(course) }}>Save</button>

  return (
    <>
      <div className="mainbox" id="result">

        {courseViewHtml}

      </div>

      {viewButton}

      {saveButton}

    </>
  )
}

export default Course



//previous code
{/* <table>
          <thead>
          <tr>
              <td className="line1" id="classNameAb"></td>
              <td className="line1">{course.classNameAb}</td>
          </tr>
          </thead>

          <tbody>
            <tr>
              <td className="line1">Class Name Abbreviation: </td>
              {courseViewHtml.classNameAb}
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
        </table> */}
{/* <p className="line1" id="classNameAb"></p>
        <p className="line2" id="className"></p>
        <p className="line1" id="prerequisites"></p>
        <p className="line2" id="description"></p>
        <p className="line1" id="units"></p>
        <p className="line2" id="term"></p> */}
{/* <button onClick={handleClick}>{ disable? "< Enable >" : "< Disable >" }</button> */ }