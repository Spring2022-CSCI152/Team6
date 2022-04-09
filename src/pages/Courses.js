import '../CSS/course.css';
import { useState } from 'react';
import axios from '../axios';


function Courses() {
    const [findingcourse, setcourse] = useState("");
    const handleFinding = (e) => {
        setcourse(e.target.value)
      }
    const search = async () => {
        const finding = {"classNameAb": findingcourse};
        //sending to server
        const req = await axios.post('/course', finding)
            .then((res) => {
            const classNameAb = document.getElementById("classNameAb");
            classNameAb.innerHTML ="<p>Class Name Abbreviation: "+res.data.course[0].classNameAb+"</p>";

            const className = document.getElementById("className");
            className.innerHTML ="<p>Class Name: "+res.data.course[0].className+"</p>";

            const prerequisites = document.getElementById("prerequisites");
            prerequisites.innerHTML +="<p>Prerequisites:<p>";
            for (let i of res.data.course[0].Prerequisites)
            {
                prerequisites.innerHTML +="<li>"+ i +"</li>";
            }

            const description = document.getElementById("description");
            description.innerHTML ="<p>Description: "+res.data.course[0].Description+"</p>";

            const units = document.getElementById("units");
            units.innerHTML ="<p>Units: "+res.data.course[0].Units+"</p>";

            const term = document.getElementById("term");
            term.innerHTML +="<p>Course Typically Offered:<p>";
            for (let i of res.data.course[0].TermTypicallyOffered)
            {
                term.innerHTML +="<li>"+i+"</li>";
            }

            }).catch((error) => {
            console.log(error);
            });
        }

  return (
    <div className="Course">
        <form>
            <label htmlFor='finding'>Search</label>
            <input type="text" onChange={handleFinding} name="finding" className="finding" placeholder="finding..." id="finding" /> <br />
            <button type="button" onClick={search}>Search</button>
        </form>
        <div id="result">
            <p id="classNameAb"></p>
            <p id="className"></p>
            <div id="prerequisites"></div>
            <p id="description"></p>
            <p id="units"></p>
            <p id="term"></p>
        </div>
    </div>

  );
}

export default Courses;
