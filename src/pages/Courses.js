import '../CSS/course.css';
import { useState, useEffect } from 'react';
import axios from '../axios';

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
            // const finding = { "classNameAb": searchQuery, "className": findingcourse };

            const req = await axios.post('/course/search', {"general":searchQuery})
                .then((res) => {
                    response = res;
                })
                .catch((error) => {
                    console.log(error);
                })
        }

        if(response) buildTable(response.data.courses);

    }

    //use query results to build html table
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

        //dynamically fill in options of term drop down menu
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

    //prompts search to happen on mount (component load)
    useEffect(() => {
        search();
    }, [])

    //term filter
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
        // if (searchQuery == "") {
        //     finding = { "TermTypicallyOffered": findingTerm };
        // }
        // else {
        finding = { "searchQuery": searchQuery, "TermTypicallyOffered": findingTerm };
        // }

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

    return (
        <div className="Course">
            <form onSubmit={onSubmitSearch}>
               <label for='finding'>  Search For Classes:</label>
                <input type="text" onChange={handleFinding} name="finding" className="finding" placeholder="finding..." id="finding" /> <br />
                <button type="submit">Search</button>
            </form>
            <select className="term" id="term" onChange={filter}>
            </select>
            <table>
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Title</th>
                        <th>Prerequisites</th>
                        <th>Description</th>
                        <th>Units</th>
                        <th>Term Typically Offered</th>
                    </tr>
                </thead>
                <tbody id="CourseList">
                </tbody>
            </table>
        </div>

    );
}

export default Courses;
