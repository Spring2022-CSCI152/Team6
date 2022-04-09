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
                console.log(res.data)
                for(let i of res.data.courses){
                    console.log(i);
                    var CourseList = document.getElementById("CourseList");
                    CourseList.innerHTML="";
                    var tableRow =document.createElement("tr");
                    tableRow.innerHTML +="<td>"+i.classNameAb+"</td>";
                    tableRow.innerHTML +="<td>"+i.className+"</td>";
                    if(i.Prerequisites.length==0){
                        tableRow.innerHTML +="<td></td>";
                    }
                    for(let j of i.Prerequisites)
                    {
                        tableRow.innerHTML +="<li>"+ j +"</li>";
                    }
                    tableRow.innerHTML +="<td>"+i.Description+"</td>";
                    tableRow.innerHTML +="<td>"+i.Units+"</td>";
                    if(i.TermTypicallyOffered.length==0){
                        tableRow.innerHTML +="<td></td>";
                    }
                    for(let k of i.TermTypicallyOffered)
                    {
                        tableRow.innerHTML +="<li>"+ k +"</li>";
                    }
    
                    CourseList.appendChild(tableRow);
                }

            }).catch((error) => {
            console.log(error);
            });
    }
    const viewAll = async () => {
        const req = await axios.get('/course')
        .then((res) => {
            for(let i of res.data.courses){
                var CourseList = document.getElementById("CourseList");
                var tableRow =document.createElement("tr");
                tableRow.innerHTML +="<td>"+i.classNameAb+"</td>";
                tableRow.innerHTML +="<td>"+i.className+"</td>";
                if(i.Prerequisites.length==0){
                    tableRow.innerHTML +="<td></td>";
                }
                for(let j of i.Prerequisites)
                {
                    tableRow.innerHTML +="<li>"+ j +"</li>";
                }
                tableRow.innerHTML +="<td>"+i.Description+"</td>";
                tableRow.innerHTML +="<td>"+i.Units+"</td>";
                if(i.TermTypicallyOffered.length==0){
                    tableRow.innerHTML +="<td></td>";
                }
                for(let k of i.TermTypicallyOffered)
                {
                    tableRow.innerHTML +="<li>"+ k +"</li>";
                }

                CourseList.appendChild(tableRow);
            }
        }).catch((error) => {
        console.log(error);
        });
    }
    window.onload= function() {
        if(document.readyState == 'complete') {
            viewAll();
        }
    };
    
  return (
    <div className="Course">
        <form>
            <label htmlFor='finding'>Search</label>
            <input type="text" onChange={handleFinding} name="finding" className="finding" placeholder="finding..." id="finding" /> <br />
            <button type="button" onClick={search}>Search</button>
        </form>
        <table>
            <thead>
                <tr>
                    <th>Class</th>
                    <th>Class Name</th>
                    <th>Prerequisites</th>
                    <th>Description</th>
                    <th>Units</th>
                    <th>Course Typically Offered</th>
                </tr>
            </thead>
            <tbody id="CourseList">
            </tbody>
        </table>
    </div>

  );
}

export default Courses;
