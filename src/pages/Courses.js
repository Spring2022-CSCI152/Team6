import '../CSS/course.css';
import { useState, useEffect } from 'react';
import axios from '../axios';

var result = [];
var filterterm = new Set();
function Courses() {
    const [findingcourse, setcourse] = useState("");
    const handleFinding = (e) => {
        setcourse(e.target.value)
    }

    const search = async () => {

        let response;
        if (findingcourse == "") {
            const req = await axios.get('/course')
                .then((res) => {
                    response = res;
                })
        }
        else {
            const finding = { "classNameAb": findingcourse, "className": findingcourse };

            const req = await axios.post('/course/search', finding).then((res) => {
                response = res;
            })
        }

        buildTable(response.data.courses);

        // const finding = { "classNameAb": findingcourse, "className": findingcourse };
        // //sending to server
        // const req = await axios.post('/course/search', finding)
        //     .then((res) => {
        //         result = res.data.courses;
        //         filterterm = new Set();
        //         var CourseList = document.getElementById("CourseList");
        //         CourseList.innerHTML = "";
        //         for (let i of result) {
        //             filterterm.add(JSON.stringify(i.TermTypicallyOffered));
        //             var tableRow = document.createElement("tr");
        //             tableRow.innerHTML += "<td>" + i.classNameAb + "</td>";
        //             tableRow.innerHTML += "<td>" + i.className + "</td>";
        //             if (i.Prerequisites.length == 0) {
        //                 tableRow.innerHTML += "<td></td>";
        //             }
        //             for (let j of i.Prerequisites) {
        //                 tableRow.innerHTML += "<li>" + j + "</li>";
        //             }
        //             tableRow.innerHTML += "<td>" + i.Description + "</td>";
        //             tableRow.innerHTML += "<td>" + i.Units + "</td>";
        //             if (i.TermTypicallyOffered.length == 0) {
        //                 tableRow.innerHTML += "<td></td>";
        //             }
        //             for (let k of i.TermTypicallyOffered) {
        //                 tableRow.innerHTML += "<li>" + k + "</li>";
        //             }

        //             CourseList.appendChild(tableRow);
        //         }
        //         var searchBox = document.getElementById("term");
        //         searchBox.innerHTML = "";
        //         var a = Array.from(filterterm);
        //         a.sort();
        //         a.reverse();
        //         for (var i of a) {
        //             i = i.replace("[", '');
        //             i = i.replace("]", '');
        //             i = i.replaceAll("\"", '');
        //             var option = document.createElement("option");
        //             if (i == "") {
        //                 option.innerHTML += "<option>Every Term</option>";
        //             }
        //             else {
        //                 option.innerHTML += "<option>" + i + "</option>";
        //             }
        //             searchBox.appendChild(option);
        //         }

        //     }).catch((error) => {
        //         alert(error.response.data.message);
        //     });


    }

    const buildTable = (result) => {

        filterterm = new Set();

        //get table
        var CourseList = document.getElementById("CourseList");

        //reset table to blank
        CourseList.innerHTML = "";

        // for css to make table rows differentialable
        let even = 0;

        //create all rows
        for (let i of result) {
            filterterm.add(JSON.stringify(i.TermTypicallyOffered));
            var tableRow = document.createElement("tr");

            // for css to make table rows differentialable
            tableRow.className = even === 0 ? "odd" : "even";
            //change even tracker for next iteration
            even = 1 - even;

            tableRow.innerHTML += "<td>" + i.classNameAb + "</td>";
            tableRow.innerHTML += "<td>" + i.className + "</td>";

            //prerequisites
            let PrerequisitesTd = document.createElement("td");
            for (let j of i.Prerequisites) {
                PrerequisitesTd.innerHTML += "<li>" + j + "</li>";
            }
            tableRow.appendChild(PrerequisitesTd);

            tableRow.innerHTML += "<td>" + i.Description + "</td>";
            tableRow.innerHTML += "<td>" + i.Units + "</td>";

            let courseTypOffTd = document.createElement("td");

            for (let k of i.TermTypicallyOffered) {
                courseTypOffTd.innerHTML += "<li>" + k + "</li>";
            }
            tableRow.appendChild(courseTypOffTd);

            CourseList.appendChild(tableRow);
        }
        var searchBox = document.getElementById("term");
        searchBox.innerHTML = "";
        var a = Array.from(filterterm);
        a.sort();
        a.reverse();
        for (var i of a) {
            i = i.replace("[", '');
            i = i.replace("]", '');
            i = i.replaceAll("\"", '');
            var option = document.createElement("option");
            if (i == "") {
                option.innerHTML += "<option>Every Term</option>";
            }
            else {
                option.innerHTML += "<option>" + i + "</option>";
            }
            searchBox.appendChild(option);
        }

    }

    useEffect(() => {
        search();
    }, [])


    // const viewAll = async () => {
    //     const req = await axios.get('/course')
    //         .then((res) => {
    //             result = res.data.courses;
    //             filterterm = new Set();
    //             var CourseList = document.getElementById("CourseList");
    //             CourseList.innerHTML = "";
    //             for (let i of result) {
    //                 filterterm.add(JSON.stringify(i.TermTypicallyOffered));
    //                 var tableRow = document.createElement("tr");
    //                 tableRow.innerHTML += "<td>" + i.classNameAb + "</td>";
    //                 tableRow.innerHTML += "<td>" + i.className + "</td>";
    //                 if (i.Prerequisites.length == 0) {
    //                     tableRow.innerHTML += "<td></td>";
    //                 }
    //                 for (let j of i.Prerequisites) {
    //                     tableRow.innerHTML += "<li>" + j + "</li>";
    //                 }
    //                 tableRow.innerHTML += "<td>" + i.Description + "</td>";
    //                 tableRow.innerHTML += "<td>" + i.Units + "</td>";
    //                 if (i.TermTypicallyOffered.length == 0) {
    //                     tableRow.innerHTML += "<td></td>";
    //                 }
    //                 for (let k of i.TermTypicallyOffered) {
    //                     tableRow.innerHTML += "<li>" + k + "</li>";
    //                 }
    //                 CourseList.appendChild(tableRow);
    //             }
    //             var searchBox = document.getElementById("term");
    //             searchBox.innerHTML = "";
    //             var a = Array.from(filterterm);
    //             a.sort();
    //             a.reverse();
    //             for (var i of a) {
    //                 i = i.replace("[", '');
    //                 i = i.replace("]", '');
    //                 i = i.replaceAll("\"", '');
    //                 var option = document.createElement("option");
    //                 if (i == "") {
    //                     option.innerHTML += "<option>Every Term</option>";
    //                 }
    //                 else {
    //                     option.innerHTML += "<option>" + i + "</option>";
    //                 }
    //                 searchBox.appendChild(option);
    //             }
    //         }).catch((error) => {
    //             console.log(error);
    //         });
    // }
    const filter = async (e) => {
        var findingTerm = [];
        var finding;
        if (e.target.value == "Every Term") {
            search();
            return;
        }
        if (e.target.value == "Fall,Spring") {
            findingTerm.push("Fall");
            findingTerm.push("Spring");
        }
        else {
            findingTerm.push(e.target.value);
        }
        if (findingcourse == "") {
            finding = { "TermTypicallyOffered": findingTerm };
        }
        else {
            finding = { "classNameAb": findingcourse, "className": findingcourse, "TermTypicallyOffered": findingTerm };
        }
        //sending to server
        const req = await axios.post('/course/searchWithTermFilter', finding)
            .then((res) => {
                var CourseList = document.getElementById("CourseList");
                CourseList.innerHTML = "";
                for (let i of res.data.courses) {
                    filterterm.add(JSON.stringify(i.TermTypicallyOffered));
                    var tableRow = document.createElement("tr");
                    tableRow.innerHTML += "<td>" + i.classNameAb + "</td>";
                    tableRow.innerHTML += "<td>" + i.className + "</td>";
                    if (i.Prerequisites.length == 0) {
                        tableRow.innerHTML += "<td></td>";
                    }
                    for (let j of i.Prerequisites) {
                        tableRow.innerHTML += "<li>" + j + "</li>";
                    }
                    tableRow.innerHTML += "<td>" + i.Description + "</td>";
                    tableRow.innerHTML += "<td>" + i.Units + "</td>";
                    if (i.TermTypicallyOffered.length == 0) {
                        tableRow.innerHTML += "<td></td>";
                    }
                    for (let k of i.TermTypicallyOffered) {
                        tableRow.innerHTML += "<li>" + k + "</li>";
                    }

                    CourseList.appendChild(tableRow);
                }

            }).catch((error) => {
                alert(error);
            });
    }


    //intermediary between submit event of form, and search function.
    const onSubmitSearch = (e) => {

        //prevents page reload
        e.preventDefault();

        //calls search to query database
        search();
    }


    // window.onload = function () {
    //     if (document.readyState == "complete") {
    //         viewAll();
    //     }

    // };

    return (
        <div className="Course">
            <form onSubmit={onSubmitSearch}>
                <label htmlFor='finding'>Search</label>
                <input type="text" onChange={handleFinding} name="finding" className="finding" placeholder="finding..." id="finding" /> <br />
                <button type="submit">Search</button>
            </form>
            <select className="term" id="term" onChange={filter}>
                {/* <option value="none">Every Term</option> 
            <option value="Fall">Fall</option>
            <option value="Spring">Spring</option>
            <option value="Fall and Spring">Fall and Spring</option> */}
            </select>
            <table>
                <thead>
                    {/* <tr onLoad={viewAll}> */}
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
