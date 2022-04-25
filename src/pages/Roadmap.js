import '../CSS/course.css';
import { createElement, useState } from 'react';
import axios from '../axios';

function Roadmap() {
    
    var coursesOfferInSpring= [];
    var coursesOfferInSummer= [];
    var coursesOfferInFall= [];
    var coursesOfferInWinter= [];

    window.onload= function() {
        createYear1();
        filterFallSpring();
        filterFall();
        filterSpring();
        if(document.readyState=="complete")
        {
            showCourses();
        }
        
    };
    function createYear1(){
        let td = document.getElementById('year'); 
        td.innerHTML="<select id='date-dropdown'></select></td>";
        let dateDropdown = document.getElementById('date-dropdown'); 
        let currentYear = new Date().getFullYear();    
        let earliestYear = 2014;     
        while (currentYear >= earliestYear) {      
            let dateOption = document.createElement('option');          
            dateOption.text = currentYear;      
            dateOption.value = currentYear;        
            dateDropdown.add(dateOption);      
            currentYear -= 1;    
        }
    }
    function addYear(){
        let sample = document.getElementById("sample_year");
        let table =  document.getElementById("table");
        let newRow = sample.cloneNode(true);
        table.appendChild(newRow);
    }

    const filterFallSpring = async (e) => {
        //sending to server
        const req = await axios.post('/course/searchWithTermFilter', {"TermTypicallyOffered": ["Fall", "Spring"]})
            .then((res) => {
                for(let i of res.data.courses){
                    if (!coursesOfferInSpring.includes(JSON.stringify(i))) {
                        coursesOfferInSpring.push(JSON.stringify(i));
                        }
                    if (!coursesOfferInFall.includes(JSON.stringify(i))) {
                        coursesOfferInFall.push(JSON.stringify(i));
                      }
                }
            }).catch((error) => {
                alert(error);
            });
        }
    
    const filterSpring = async (e) => {
        //sending to server
        const req = await axios.post('/course/searchWithTermFilter', {"TermTypicallyOffered": "Spring"})
            .then((res) => {
                for(let i of res.data.courses){
                    if (!coursesOfferInSpring.includes(JSON.stringify(i))) {
                        coursesOfferInSpring.push(JSON.stringify(i));
                        }
                }
            }).catch((error) => {
                alert(error);
            });    
    }    

    const filterFall = async (e) => {
        //sending to server
        const req = await axios.post('/course/searchWithTermFilter', {"TermTypicallyOffered": "Fall"})
            .then((res) => {
                for(let i of res.data.courses){
                    if (!coursesOfferInFall.includes(JSON.stringify(i))) {
                        coursesOfferInFall.push(JSON.stringify(i));
                      }
                    // const fallTerm = document.querySelectorAll('[id=fall-dropdown]');
                    // Array.prototype.forEach.call (fallTerm, function (node) {
                    //     let fallOptions = document.createElement("option");
                    //     fallOptions.text = i.classNameAb;
                    //     fallOptions.value = i.classNameAb;
                    //     node.appendChild(fallOptions);
                    // } );
                }
            }).catch((error) => {
                alert(error);
            });    
    }

    function showCourses(){
        console.log(Array.isArray(coursesOfferInSpring));
        console.log(coursesOfferInSpring[1]);
        console.log(coursesOfferInFall[1]);
        console.log(coursesOfferInFall.length);
        for (let i =0;i<coursesOfferInSpring.length;i++)
        {
            console.log(i);
            i=JSON.parse(i);
            console.log(i);
        }
        for (let i of coursesOfferInFall)
        {
            i=JSON.parse(i);
        }
        console.log(coursesOfferInSpring);
        console.log(coursesOfferInFall);
        for (let i of coursesOfferInSpring){
            const springTerm = document.querySelectorAll('[id=spring-dropdown]');
            Array.prototype.forEach.call (springTerm, function (node) {
                let springOptions = document.createElement("option");
                springOptions.text = i.classNameAb;
                springOptions.value = i.classNameAb;
                node.appendChild(springOptions);
            } );
        }
        for (let i of coursesOfferInFall){
            const fallTerm = document.querySelectorAll('[id=fall-dropdown]');
            Array.prototype.forEach.call (fallTerm, function (node) {
                let fallOptions = document.createElement("option");
                fallOptions.text = i.classNameAb;
                fallOptions.value = i.classNameAb;
                node.appendChild(fallOptions);
            } );
        }
        
    }
    

  return (
    <div className="Course">
        <table id="table">
            <thead>
                <tr>
                    <th>Year</th>
                    <th>Spring</th>
                    <th>Summer</th>
                    <th>Fall</th>
                    <th>Winter</th>
                </tr>
            </thead>
            <tbody id="sample_year">
                <tr>
                    <td rowSpan="5" id="year">&nbsp;</td>
                    <td><select id='spring-dropdown'></select></td>
                    <td>&nbsp;</td>
                    <td><select id='fall-dropdown'></select></td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td><select id='spring-dropdown'></select></td>
                    <td>&nbsp;</td>
                    <td><select id='fall-dropdown'></select></td>
                    <td>&nbsp;</td>
                    </tr>
                <tr>
                    <td><select id='spring-dropdown'></select></td>
                    <td>&nbsp;</td>
                    <td><select id='fall-dropdown'></select></td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td><select id='spring-dropdown'></select></td>
                    <td>&nbsp;</td>
                    <td><select id='fall-dropdown'></select></td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td><select id='spring-dropdown'></select></td>
                    <td>&nbsp;</td>
                    <td><select id='fall-dropdown'></select></td>
                    <td>&nbsp;</td>
                </tr>
            </tbody>
            
        </table>
        <button onClick={addYear}>Add year</button>
    </div>

  );
}

export default Roadmap;
