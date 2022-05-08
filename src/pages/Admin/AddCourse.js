import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { getUserInfo } from '../../components/GetUserInfo';
import { addCourse } from '../../components/getCourseInfo';
import { Button, Container, Form, Image, Row, Col } from 'react-bootstrap';
import '../../CSS/CourseAdmin.css'



const save = async (course) => {
  await addCourse(course)
  .then((res) =>{
    console.log(res)
    alert(res.data.message)
  })
  .catch((error) => {console.log(error)})
}

const updateCourse = (property,value,course,setCourse) =>{
    course[property]=value;
    setCourse({...course});
}

const AddCourse = () => {


  const [course, setCourse] = useState({
      classNameAb:"",
      className: "",
      Prerequisites:[],
      Description:"",
      Units:3,
      TermTypicallyOffered:""
  });


  const saveButton =  <button onClick={() => { save(course) }}>Save</button>

    // function addClasses() {
    //     var text = document.getElementById("popup");
    //     text.classList.toggle("show");
    // }

    // function enterClass() {

    // }

    //render
    return (<>
        <div className='mainbox'>
            {/* <h2>Your Classes</h2> */}
            {/* <button onClick={addClasses}>add class</button> */}
            {/* <div name="popup" id="popup" className="show"> */}

            <table>
                <tbody>
                    <tr>
                        <td className="line1" width="450">Class Name Abbreviation: </td>
                        <td className="line1" width="450" id="classNameAb"><input type="text" id="classNameAbInput" value={course.classNameAb} onChange={()=>{updateCourse("classNameAb",document.getElementById('classNameAbInput').value,course,setCourse)}}/></td>
                    </tr>
                    <tr>
                        <td className="line2" >Class Name: </td>
                        <td className="line2" id="className"><input type="text" id="classNameInput" value={course.className} onChange={()=>{updateCourse("className",document.getElementById('classNameInput').value,course,setCourse)}}/></td>
                    </tr>
                    <tr>
                        <td className="line1" >Prerequisites:</td>
                        <td className="line1" id="prerequisites"><input type="text" id="prerequisitesInput" value={course.Prerequisites} onChange={()=>{updateCourse("Prerequisites",document.getElementById('prerequisitesInput').value,course,setCourse)}}/></td>
                    </tr>
                    <tr>
                        <td className="line2" >Description: </td>
                        <td className="line2"  id="description"><input type="text" id="descriptionInput" value={course.Description} onChange={()=>{updateCourse("Description",document.getElementById('descriptionInput').value,course,setCourse)}}/></td>
                    </tr>
                    <tr>
                        <td className="line1" >Units: </td>
                        <td className="line1" id="units"><input type="text" id="unitsInput" value={course.Units} onChange={()=>{updateCourse("Units",document.getElementById('unitsInput').value,course,setCourse)}}/></td>
                    </tr>
                    <tr>
                        <td className="line2" >Course Typically Offered:</td>
                        <td className="line2" id="term"><input type="text" id="termInput" value={course.TermTypicallyOffered} onChange={()=>{updateCourse("TermTypicallyOffered",document.getElementById('termInput').value,course,setCourse)}}/></td>
                    </tr>
                </tbody>
            </table>


        </div>
        {saveButton}

    </>
    )
}

export default AddCourse;



    // //state and state change function for user object
    // const [user, setUser] = useState({});

    // //loads user info on mount
    // useEffect(() => {

    //     async function getUserInfoWrapper() {

    //         //updates user state with user object from backend, matched by stored cookie id
    //         setUser(await getUserInfo());
    //         //console.log(user);
    //     }

    //     getUserInfoWrapper();

    // }, []);
    
// Course Abbreviation
// <div>
//     <input type="text" ></input>
// </div>
// Course Name
// <div>
//     <input type="text" ></input>
// </div>
// Course Description
// <div>
//     <input type="text"></input>
// </div>
// Prerequisites
// <div>
//     <input type="text"></input>
// </div>
// Description
// <div>
//     <input type="text"></input>
// </div>
// Units
// <div>
//     <input type="text"></input>
// </div>
// Term Typically Offered
// <div>
//     <input type="text"></input>
// </div>
// <button onClick={save()}>Save</button>
// {/* </div> */}