import '../CSS/course.css';
import { useState, useEffect } from 'react';
import axios from '../axios';
import { FaSearch } from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";

// var result = [];
var filterterm = new Set();

function Courses() {

    //state: text to be used in DB search
    const [searchQuery, setSearchQuery] = useState("");

    //updates text to be used in DB search
    const handleFinding = (e) => {
        setSearchQuery(e.target.value)
    }

    //query database
    const search = async () => {

        let response;

        //view all
        if (searchQuery == "") {
            const req = await axios.get('/course')
                .then((res) => {
                    response = res;
                })
                .catch((error) => {
                    console(error);
                })
        }

        //specific criteria
        else {

            const req = await axios.post('/course/search', { "general": searchQuery })
                .then((res) => {
                    response = res;
                })
                .catch((error) => {
                    console.log(error);
                })
        }

        if (response) buildTable(response.data.courses);

    }

    //use query results to build html table
    const buildTable = (result) => {


        //get table
        var CourseList = document.getElementById("CourseList");

        //reset table to blank
        CourseList.innerHTML = "";

        // for css to make table rows differentialable
        let even = 0;

        //create all rows
        for (let i of result) {
            var tableRow = document.createElement("tr");

            // for css to make table rows differentialable
            tableRow.className = even === 0 ? "odd" : "even";
            //change even tracker for next iteration
            even = 1 - even;

            tableRow.innerHTML += "<td>" + i.classNameAb + "</td>";
            tableRow.innerHTML += "<td>" + i.className + "</td>";

            //prerequisites
            // let PrerequisitesTd = document.createElement("td");
            // for (let j of i.Prerequisites) {
            //     PrerequisitesTd.innerHTML += "<li>" + j + "</li>";
            // }
            // tableRow.appendChild(PrerequisitesTd);

            // tableRow.innerHTML += "<td>" + i.Description + "</td>";
            tableRow.innerHTML += "<td>" + i.Units + "</td>";

            let courseTypOffTd = document.createElement("td");

            for (let k of i.TermTypicallyOffered) {
                courseTypOffTd.innerHTML += "<li>" + k + "</li>";
            }
            tableRow.appendChild(courseTypOffTd);

            CourseList.appendChild(tableRow);
        }



    }

    //gets all courses on mount (component load)
    useEffect(async () => {

        const req = await axios.get('/course')
            .then((res) => {

                buildTable(res.data.courses);

                //dynamically fill in options of term drop down menu
                filterterm = new Set();

                for (let i of res.data.courses) {
                    filterterm.add(JSON.stringify(i.TermTypicallyOffered));
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
            })
            .catch((error) => {
                console.log(error);
            })



    }, [])

    //term filter
    const filter = async (e) => {

        var findingTerm = [];
        var finding;
        if (e.target.value == "Every Term") {
            console.log("every term path");
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
        // if (searchQuery == "") {
        //     finding = { "TermTypicallyOffered": findingTerm };
        // }
        // else {
        finding = { "searchQuery": searchQuery, "TermTypicallyOffered": findingTerm };
        // }

        console.log(finding)

        const req = await axios.post('/course/searchWithTermFilter', finding)
            .then((res) => {
                buildTable(res.data.courses);
            })
            .catch((error) => {
                console.log(error);
            })
    }


    //intermediary between submit event of form, and search function.
    const onSubmitSearch = (e) => {

        //prevents page reload
        e.preventDefault();

        //calls search to query database
        search();
    }

    const reloadPage = (e) => {
        window.location.reload();
    }

    return (
        <div className="Course">
            <form onSubmit={onSubmitSearch}>
                <label htmlFor='finding'>Search</label>
                <input type="text" onChange={handleFinding} name="finding" className="finding" placeholder="Example: CSCI 1" id="finding"></input>
                <button className='button' type="submit"><FaSearch /></button>
                <button className='button' type="button" onClick={reloadPage}><FiRefreshCw /></button>
                <select className="term" id="term" onChange={filter}></select>
            </form>
            <br></br>
            <table>
                <thead>
                    <tr>
                        <th className='th-Code'>Code</th>
                        <th className='th-Title'>Title</th>
                        {/* <th>Prerequisites</th>
                        <th>Description</th> */}
                        <th className='th-Units'>Units</th>
                        <th className='th-Term'>Term Typically Offered</th>
                    </tr>
                </thead>
                <tbody id="CourseList">
                </tbody>
            </table>
        </div>

    );
}

export default Courses;
