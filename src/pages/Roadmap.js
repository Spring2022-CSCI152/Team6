import '../CSS/roadmap.css';
import { createElement, useState } from 'react';
import axios from '../axios';

function Roadmap() {
    
    var coursesOfferInSpring= [];
    var coursesOfferInSummer= [];
    var coursesOfferInFall= [];
    var coursesOfferInWinter= [];

    window.onload= function() {
        if(document.readyState=="complete")
        {   
            createYear();
            setTimeout(filterFall,500);
            filterSpring();
        }
    };
    function createYear(){
        let dateDropdown = document.getElementById('year-dropdown'); 
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
    
    const filterSpring = async (e) => {
        //sending to server
        const req = await axios.post('/course/searchWithTermFilter', {"TermTypicallyOffered": "Spring"})
            .then((res) => {
                for(let i of res.data.courses){
                    coursesOfferInSpring.push(i);
                    const springTerm = document.getElementsByClassName('spring-dropdown');
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
            }).catch((error) => {
                alert(error);
            });    
    }
    const getYear = async (e) =>{
        var a =document.getElementById(e.target.id).parentNode;
        a.innerHTML=e.target.value;
        console.log(a.innerHTML);
    }
    const addCourse = async (e) =>{
        console.log(e.target.value);
    }
    
    const finalize = async (e) =>{
        console.log(e.target.value);
        var selectdValue=document.getElementById("1");
        console.log(selectdValue.innerHTML);
        selectdValue.innerHTML="<p>"+e.target.value.toString()+"</p>";
        console.log(selectdValue.innerHTML);

    }
    
    function print(){
        window.print();
    }
  return (
    <div className="Roadmap">
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
                    <td rowSpan="5" className="year"><select id='year-dropdown' onChange={getYear}></select></td>
                    <td ><select className='spring-dropdown' onChange={finalize}></select></td>
                    <td>&nbsp;</td>
                    <td><select id='fall-dropdown'></select></td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td><select className='spring-dropdown'></select></td>
                    <td>&nbsp;</td>
                    <td><select id='fall-dropdown'></select></td>
                    <td>&nbsp;</td>
                    </tr>
                <tr>
                    <td><select className='spring-dropdown'></select></td>
                    <td>&nbsp;</td>
                    <td><select id='fall-dropdown'></select></td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td><select className='spring-dropdown'></select></td>
                    <td>&nbsp;</td>
                    <td><select id='fall-dropdown'></select></td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td><select className='spring-dropdown'></select></td>
                    <td>&nbsp;</td>
                    <td><select id='fall-dropdown'></select></td>
                    <td>&nbsp;</td>
                </tr>
            </tbody>
            
        </table>
        <button onClick={addYear}>Add year</button>
        <button onClick={print}>Print</button>
    </div>

  );
}

export default Roadmap;
