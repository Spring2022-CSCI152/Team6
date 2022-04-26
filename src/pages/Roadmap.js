import '../CSS/course.css';
import { createElement, useState } from 'react';
import axios from '../axios';

function Roadmap() {
    
    var coursesOfferInSpring= [];
    var coursesOfferInSummer= [];
    var coursesOfferInFall= [];
    var coursesOfferInWinter= [];

    window.onload= function() {
        
        if(document.readyState=="complete")
        {createYear1();
            
            setTimeout(filterFall,500);
            filterSpring();

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

    // const filterFallSpring = async (e) => {
    //     //sending to server
    //     const req = await axios.post('/course/searchWithTermFilter', {"TermTypicallyOffered": ["Fall"]})
    //         .then((res) => {
    //             for(let i of res.data.courses){
    //                 if (!coursesOfferInSpring.includes(JSON.stringify(i))) {
    //                     coursesOfferInSpring.push(JSON.stringify(i));
    //                     }
    //                 if (!coursesOfferInFall.includes(JSON.stringify(i))) {
    //                     coursesOfferInFall.push(JSON.stringify(i));
    //                   }
    //             }
    //         }).catch((error) => {
    //             alert(error);
    //         });
    //     }
    
    const filterSpring = async (e) => {
        //sending to server
        const req = await axios.post('/course/searchWithTermFilter', {"TermTypicallyOffered": "Spring"})
            .then((res) => {
                for(let i of res.data.courses){
                    coursesOfferInSpring.push(i);
                    const springTerm = document.querySelectorAll('[id=spring-dropdown]');
                    Array.prototype.forEach.call (springTerm, function (node) {
                        let fallOptions = document.createElement("option");
                        fallOptions.text = i.classNameAb;
                        fallOptions.value = i.classNameAb;
                        node.appendChild(fallOptions);
                    } );
                }
                console.log("spring")
            }).catch((error) => {
                alert(error);
            });    
    }    

    const filterFall = async (e) => {
        //sending to server
        const req = await axios.post('/course/searchWithTermFilter', {"TermTypicallyOffered": "Fall"})
            .then((res) => {
                for(let i of res.data.courses){
                    coursesOfferInFall.push(i);
                    const fallTerm = document.querySelectorAll('[id=fall-dropdown]');
                    Array.prototype.forEach.call (fallTerm, function (node) {
                        let fallOptions = document.createElement("option");
                        fallOptions.text = i.classNameAb;
                        fallOptions.value = i.classNameAb;
                        node.appendChild(fallOptions);
                    } );
                }
                console.log("fall")

                // console.log(coursesOfferInFall.length);
                // console.log(coursesOfferInFall);
                // const fallTerm = document.querySelectorAll('[id=fall-dropdown]');
                // Array.prototype.forEach.call (fallTerm, function (node) {
                // let springOptions = document.createElement("option");
                // springOptions.text = value;
                // springOptions.value = value;
                // node.appendChild(springOptions);
                // } );

            }).catch((error) => {
                alert(error);
            });    
            
        
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
