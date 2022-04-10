import '../CSS/course.css';
import { useState } from 'react';
import axios from '../axios';

var result = [];
var filterterm = new Set();
function CoursesForAdmin() {
    const [findingcourse, setcourse] = useState("");
    const handleFinding = (e) => {
        setcourse(e.target.value)
      }
    
    const search = async () => {
        if(findingcourse == "")
        {
            viewAll();
            return;
        }
        const finding = {"classNameAb": findingcourse, "className": findingcourse};
        //sending to server
        const req = await axios.post('/course/search', finding)
            .then((res) => {
                result=res.data.courses;
                filterterm = new Set();
                for(let i of result){
                    filterterm.add(JSON.stringify(i.TermTypicallyOffered));
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
                var searchBox = document.getElementById("term");
                searchBox.innerHTML="";
                var a =Array.from(filterterm);
                a.sort();
                a.reverse();
                for(var i of a)
                {
                    i = i.replace("[", '');
                    i = i.replace("]", '');
                    i = i.replaceAll("\"", '');
                    var option = document.createElement("option");
                    if(i=="")
                    {
                        option.innerHTML+="<option>Every Term</option>";
                    }
                    else{
                        option.innerHTML+="<option>"+i+"</option>";
                    }
                    searchBox.appendChild(option);
                }

            }).catch((error) => {
                alert(error.response.data.message);
            });
    }
    const viewAll = async () => {
        const req = await axios.get('/course')
        .then((res) => {
            result=res.data.courses;
            filterterm= new Set();
            var CourseList = document.getElementById("CourseList");
            CourseList.innerHTML="";
            for(let i of result){
                filterterm.add(JSON.stringify(i.TermTypicallyOffered));
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
            var searchBox = document.getElementById("term");
            searchBox.innerHTML="";
            var a =Array.from(filterterm);
            a.sort();
            a.reverse();
            for(var i of a)
            {
                i = i.replace("[", '');
                i = i.replace("]", '');
                i = i.replaceAll("\"", '');
                var option = document.createElement("option");
                if(i=="")
                {
                    option.innerHTML+="<option>Every Term</option>";
                }
                else{
                    option.innerHTML+="<option>"+i+"</option>";
                }
                searchBox.appendChild(option);
            }
        }).catch((error) => {
        console.log(error);
        });
    }
    const filter = async (e) => {
        var findingTerm=[];
        var finding;
        if(e.target.value=="Every Term")
        {
            search();
            return;
        }
        if(e.target.value == "Fall,Spring")
        {
            findingTerm.push("Fall");
            findingTerm.push("Spring");
        }
        else{
            findingTerm.push(e.target.value);
        }
        if(findingcourse ==""){
            finding = {"TermTypicallyOffered": findingTerm};
        }
        else{
            finding = {"classNameAb": findingcourse, "className": findingcourse, "TermTypicallyOffered": findingTerm};
        }
        //sending to server
        const req = await axios.post('/course/searchWithTermFilter', finding)
            .then((res) => {
                var CourseList = document.getElementById("CourseList");
                CourseList.innerHTML="";
                for(let i of res.data.courses){
                    filterterm.add(JSON.stringify(i.TermTypicallyOffered));
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
                alert(error);
            });
    }
    const showAddBox = async()=>{
        document.getElementById("addForm").style.display= "block";
        document.getElementById("body").style.filter = "blur(3px)";
    }
    const closeAddBox = async()=>{
        document.getElementById("addForm").style.display= "none";
        document.getElementById("body").style.filter = "none";
    }
    const [classNameAb, setclassNameAb] = useState("");
    const [className, setclassName] = useState("");
    const [prerequisites, setprerequisites] = useState("");
    const [description, setdescription] = useState("");
    const [units, setunits] = useState("");
    const [term, setterm] = useState("");

    function classNameAbHandle(e){
        setclassNameAb(e.target.value);
    }
    function classNameHandle(e){
        setclassName(e.target.value);
    }
    function prerequisitesHandle(e){
        var prerequisitesArray = e.target.value.split(",");
        setprerequisites(prerequisitesArray);
    }
    function descriptionHandle(e){
        setdescription(e.target.value);
    }
    function unitHandle(e){
        if(isNaN(e.target.value)){
            alert("Unit has to be in number");
            e.target.value="";
            return;
        }
        setunits(e.target.value);
    }
    function termHandle(e){
        var termClearSpace = e.target.value.replaceAll(" ", "");
        var termArray = termClearSpace.split(",");
        setterm(termArray);
    }

    const addCourse = async () => {
        if(classNameAb.length < 1)
        {
            alert("The Class Name Abbreviation is incorrect");
        }
        if(className < 2)
        {
            alert("The Class Name is incorrect");
        }
        const course = 
        {
            "classNameAb": classNameAb, 
            "className": className, 
            "Prerequisites": prerequisites, 
            "Description": description,
            "Units": units,
            "TermTypicallyOffered": term
        };
        //sending to server
        const req = await axios.post('/course/addClass', course)
            .then((res) => {
                alert("Course Added");
                closeAddBox();
                viewAll();
            }).catch((error) => {
                alert(error.response.data.message);
            });
    }
    window.onload= function() {
        if(document.readyState=="complete")
        {
            viewAll();
        }
        
    };
    
  return (
    <div className="Course">
        <div id="addForm">
            <form >
                <h1>ADD</h1>
                <label id="hidden">Class Name Abbreviation:</label>
                <input type="text" onChange={classNameAbHandle}/> <br />
                <label id="hidden">Class Name:</label>
                <input type="text" onChange={classNameHandle}/> <br />
                <label id="hidden">Prerequisites:</label>
                <input type="text" onChange={prerequisitesHandle}/> <br />
                <label id="hidden">Description:</label>
                <input type="text" onChange={descriptionHandle} /> <br />
                <label id="hidden">Units:</label>
                <input type="text" onChange={unitHandle} id="Units"/> <br />
                <label id="hidden">Course Typically Offered:</label>
                <input type="text" onChange={termHandle} /> <br />
                <button type="button" onClick={addCourse} id="hiddenButton">Add</button>
                <button type="button" onClick={closeAddBox} id="hiddenButton">Close</button>
            </form>
        </div>
        <div id="body">
            <form>
                <label htmlFor='finding'>Search</label>
                <input type="text" onChange={handleFinding} name="finding" className="finding" placeholder="finding..." id="finding" /> <br />
                <button type="button" onClick={search}>Search</button>
            </form>
            <button type="button" onClick={window.onload}>Refresh</button>
            <select className="term" id="term" onChange={filter}>
                {/* <option value="none">Every Term</option> 
                <option value="Fall">Fall</option>
                <option value="Spring">Spring</option>
                <option value="Fall and Spring">Fall and Spring</option> */}
            </select>
            <button type="button" onClick={showAddBox}>Add Course</button>
            <table>
                <thead>
                    <tr onLoad={viewAll}>
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
    </div>

  );
}

export default CoursesForAdmin;
