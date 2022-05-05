import '../CSS/course.css';
import React, { useState } from 'react';
import axios from '../axios';

function FindCourse() {

    //state: search criteria
    const [findingcourses, setcourse] = useState("");

    //sets search criteria with event (onChange)
    const handleFinding = (e) => {
        setcourse(e.target.value)
    }

    //query database
    const search = async (e) => {

        // prevents page reload
        e.preventDefault();
        

        if (findingcourses == "") {
            alert("Please input class for searching");


            return;
        }


        const finding = { "classNameAb": findingcourses, "className": findingcourses };
        //sending to server
        const req = await axios.post('/course/search', {"specific":findingcourses})
            .then((res) => {

                //debug
                // console.log(res);

                //abbreviation
                const classNameAb = document.getElementById("classNameAb");
                classNameAb.textContent = "Class Name Abbreviation: " + res.data.courses[0].classNameAb;

                //debug: tests
                // classNameAb.textContent = res;

                const className = document.getElementById("className");
                className.innerHTML = "<p>Class Name: " + res.data.courses[0].className + "</p>";

                const prerequisites = document.getElementById("prerequisites");
                prerequisites.innerHTML = "<p>Prerequisites:<p>";
                for (let i of res.data.courses[0].Prerequisites) {
                    prerequisites.innerHTML += "<li>" + i + "</li>";
                }

                const description = document.getElementById("description");
                description.innerHTML = "<p>Description: " + res.data.courses[0].Description + "</p>";

                const units = document.getElementById("units");
                units.innerHTML = "<p>Units: " + res.data.courses[0].Units + "</p>";

                const term = document.getElementById("term");
                term.innerHTML = "<p>Course Typically Offered:<p>";
                for (let i of res.data.courses[0].TermTypicallyOffered) {
                    term.innerHTML = "<li>" + i + "</li>";
                }

            }).catch((error) => {
                console.log(error);
            });


    }

    return (
        <div className="Course">
            <form onSubmit={search} name="SearchCourseForm">
                <label>Search: </label>
                <input type="text" onChange={handleFinding} name="finding" className="finding" placeholder="Example: CSCI 1" id="finding" value={findingcourses} /> <br />
                <button className='button' type="submit" name="submit">Search</button>
            </form>
            <div className = "mainbox" id="result">
                <p className = "line1" id="classNameAb"></p>
                <p className = "line2"  id="className"></p>
                <p className = "line1" id="prerequisites"></p>
                <p className = "line2" id="description"></p>
                <p className = "line1"  id="units"></p>
                <p className = "line2" id="term"></p>
            </div>
        </div>

    );
}

export default FindCourse;
