import '../CSS/roadmap.css';
import axios from '../axios';
import React, { createElement,useState, useEffect } from 'react';
import { async } from 'regenerator-runtime';
import { FaCheckCircle } from "react-icons/fa";

function Roadmap() {
    var coursesOfferInSpring= [];
    var coursesOfferInSummer= [];
    var coursesOfferInFall= [];
    var coursesOfferInWinter= [];
    var countYear=1;

    const [matrix, setMatrix] = useState([]);
    // const [courseAlreadyTaken, setCourseAlreadyTaken] = useState([]);
    useEffect(() => {

        async function getUserInfoWrapper() {
            window.courseAlreadyTaken=["MATH 75"];
            createYear();
            window.sample=document.getElementsByClassName("year1")[0].cloneNode(true);
            viewCourse();
            //updates user state with user object from backend, matched by stored cookie id  
        }

        getUserInfoWrapper();
        
    }, []);

    function createYear(){
        let dateDropdown = document.getElementById('year1-dropdown'); 
        let currentYear = new Date().getFullYear();    
        let earliestYear = 2014;     
        while (currentYear >= earliestYear) {      
            let dateOption = document.createElement('option');          
            dateOption.text = currentYear;      
            dateOption.value = currentYear;        
            dateDropdown.add(dateOption);      
            currentYear -= 1;    
        }
        const course = document.getElementsByClassName('finalize-course-dropdown');
        Array.prototype.forEach.call (course, function (node) {
            node.addEventListener("click",addCourse, false);
        } );
    }
    function addYear(){
        countYear++;
        console.log(window.courseAlreadyTaken)
        let table =  document.getElementById("table");
        var newSample=window.sample.cloneNode(true);
        newSample.className="year"+countYear.toString();
        table.appendChild(newSample);
        const term = document.getElementsByClassName('finalize-year-dropdown');
        var count=1;
        Array.prototype.forEach.call (term, function (node) {
            node.id="finalize-year"+count+"-dropdown";
            node.addEventListener("click",getYear, false);
            count+=1;
        } );
        const course = document.getElementsByClassName('finalize-course-dropdown');
        Array.prototype.forEach.call (course, function (node) {
            node.addEventListener("click",addCourse, false);
        } );
        clearCourse();
        viewCourse();
    }

    var display=document.getElementById("display");
    const filter= async(e)=>{
        
    }
    const viewCourse= async(e)=>{
        const req = await axios.get('/course')
                .then((res) => {
                    for(let i of res.data.courses){
                        var meetRequirement=true;
                        if(i.Prerequisites.length!=0)
                        {
                            OR=[];
                            // console.log("has prerequesite",i.Prerequisites);
                            for (var element of i.Prerequisites)
                            {
                                // console.log(element)
                                if (element.includes(" (may be taken concurrently)")){
                                    element=element.replace(" (may be taken concurrently)","");
                                }
                                else if (element.includes(" (can be taken concurrently)")){
                                    element=element.replace(" (can be taken concurrently)","");
                                }
                                else if(element.includes("Permission from instructor OR"))
                                {
                                    break;
                                }
                                if((window.courseAlreadyTaken.filter((item) => item == element)[0]))
                                {
                                    meetRequirement = true;
                                    // console.log("Meet the requirement for "+i.classNameAb + " with " + element);
                                }
                                else if(element.includes("OR"))
                                {
                                    element=element.replace(" OR","");
                                    OR.push(element);
                                }
                                else{
                                    meetRequirement = false;
                                    // console.log("Doesn't the requirement for "+i.classNameAb + " with " + element);
                                    break;
                                }
                            }
                            if(OR!=[] && meetRequirement==true)
                            {
                                for (const element of OR)
                                {
                                    var courseMeetORRequirement=window.courseAlreadyTaken.filter((item) => item == element);
                                    if(courseMeetORRequirement.length!=0)
                                    {
                                        // console.log("Meet the requirement for "+i.classNameAb + " with ",courseMeetORRequirement);
                                        meetRequirement = true;
                                        break;
                                    }
                                    meetRequirement = false;
                                    // console.log("Doesn't meet the requirement for "+i.classNameAb + " because of ",element);
                                }
                            }
                        }
                        // console.log(meetRequirement)
                        if(meetRequirement==true)
                        {
                            // console.log(i,"Meet all requirement");
                            coursesOfferInSpring.push(i);
                            const term = document.getElementsByClassName('course-dropdown');
                            Array.prototype.forEach.call (term, function (node) {
                                let courseOptions = document.createElement("option");
                                courseOptions.id="courses";
                                courseOptions.text = i.classNameAb;
                                courseOptions.value = i.classNameAb;
                                node.appendChild(courseOptions);
                            } );
                        }
                        else
                        {
                            // console.log(i,"Doesn't Meet all requirement");
                        }
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
    }

    function clearCourse(){
        const term = document.getElementsByClassName('course-dropdown');
        Array.prototype.forEach.call (term, function (node) {
            node.innerHTML="";
        } );
    }

    const getYear = async (e) =>{
        var yearbutton=e.target;
        while(!yearbutton.matches('button'))
        {
            yearbutton=yearbutton.parentNode;
        }
        // console.log(e.target.parentNode.previousElementSibling.parentNode)
        var td =yearbutton.parentNode;
        console.log(yearbutton.parentNode.parentNode.parentNode)
        var year= yearbutton.previousElementSibling.value;
        td.innerHTML=year;
        td.id=year;   
        var tr=td.parentNode;
        console.log(tr)
        tr.parentNode.id =year; //tbody's id
        var newYear=[];
        newYear.push(year);
        setMatrix(newYear);
    }
    
    var OR=[];

    const addCourse = async (e) =>{
        console.log(window.courseAlreadyTaken)
        // console.log(document.getElementById("table").firstChild.nextSibling.nextSibling.rows[1].cells[0])
        var addbutton=e.target;
        while(!addbutton.matches('button'))
        {
            addbutton=addbutton.parentNode;
        }
        var dropdown=addbutton.previousElementSibling;
        var tbody = addbutton.parentNode.parentNode.parentNode; //tbody of that course
        console.log(tbody)
        if(addbutton.parentNode.parentNode.parentNode.id=="") //id of tbody
        {
            alert("Please choose an academic year first");
        }
        else{
            //sending to server
            const req = await axios.post('/course/search', {"specific": dropdown.value.toString()})
            .then((res) => {

                //data of the course will be res.data.courses[0]
                for(var prerequesite of res.data.courses[0].Prerequisites)
                {
                    if (prerequesite.includes(" (may be taken concurrently)")){
                        prerequesite=prerequesite.replace(" (may be taken concurrently)","");
                    }
                    else if (prerequesite.includes(" (can be taken concurrently)")){
                        prerequesite=prerequesite.replace(" (can be taken concurrently)","");
                    }
                    if(prerequesite.includes("OR"))
                    {
                        prerequesite=prerequesite.replace(" OR","");
                    }
                    for(var i=1;i<tbody.rows.length;i++)
                    {
                        if(prerequesite==tbody.rows[i].cells[0].innerHTML){
                            var display=document.getElementById("display");
                            console.log(display)
                            display.style.display="block";
                            var warning=document.createElement("p");
                            console.log(dropdown.parentNode)
                            warning.innerHTML=res.data.courses[0].classNameAb + " - Prequesites: "+res.data.courses[0].Prerequisites.join(", ");
                            display.appendChild(warning);
                            console.log(display)
                            setTimeout(()=>{
                                display.removeChild(warning);
                            },4000)
                            if(window.confirm(prerequesite+" is a prerequisite of " + res.data.courses[0].classNameAb + ". Are you sure you want to take the class in this semester?")==false)
                            {
                                console.log("return")
                                return;
                            }
                        }
                    }
                }
                console.log(res.data.courses[0].Prerequisites);
                
                window.courseAlreadyTaken.push(dropdown.value);
                var display=document.getElementById("display");
                display.style.display="block";
                var warning=document.createElement("p");
                console.log(dropdown.parentNode)
                if(res.data.courses[0].TermTypicallyOffered.length!=0 && res.data.courses[0].TermTypicallyOffered.includes(dropdown.parentNode.className)==false){
                    warning.innerHTML=res.data.courses[0].classNameAb+ " is typically offered in " + res.data.courses[0].TermTypicallyOffered.join(", ") + "\n<br>";
                }
                if(res.data.courses[0].Prerequisites.length!=0)
                {
                    warning.innerHTML+=res.data.courses[0].classNameAb + " - Prequesites: "+res.data.courses[0].Prerequisites.join(", ");
                }
                display.appendChild(warning);
                console.log(dropdown.parentNode.nextElementSibling)
                dropdown.parentNode.nextElementSibling.innerHTML=res.data.courses[0].Units.toString();
                dropdown.parentNode.innerHTML=dropdown.value;
                clearCourse();
                viewCourse();
            }).catch((error) => {
                console.log(error);
            });
        }
        console.log(window.courseAlreadyTaken)
    }
    function refresh(){
        window.location.reload();
    }
    
    function print(){
        window.print();
    }
  return (
    <div className="Roadmap">
        <table id="table">
            <thead>
                <tr id='thead'>
                    <th className="year">Year</th>
                    <th className="Spring" colSpan="2">Spring</th>
                    <th className="Summer" colSpan="2">Summer</th>
                    <th className="Fall" colSpan="2">Fall</th>
                    <th className="Winter" colSpan="2">Winter</th>
                    <th className="comment">Comment</th>
                </tr>
            </thead>
            <tbody className='year1'>
                <tr>
                    <td rowSpan="6" className="year"><select className='year-dropdown' id='year1-dropdown'></select><button className='finalize-year-dropdown' onClick={getYear}><FaCheckCircle /></button></td>
                </tr>
                <tr>
                    
                    <td className="Spring"><select className='course-dropdown'></select><button className='finalize-course-dropdown'><FaCheckCircle /></button></td>
                    <td className="Units"></td>
                    <td className="Summer"><select className='course-dropdown'></select><button className='finalize-course-dropdown'><FaCheckCircle /></button></td>
                    <td className="Units"></td>
                    <td className="Fall"><select className='course-dropdown'></select><button className='finalize-course-dropdown'><FaCheckCircle /></button></td>
                    <td className="Units"></td>
                    <td className="Winter"><select className='course-dropdown'></select><button className='finalize-course-dropdown'><FaCheckCircle /></button></td>
                    <td className="Units"></td>
                    <td className="comment"></td>
                </tr>
                <tr>
                    <td className="Spring"><select className='course-dropdown'></select><button className='finalize-course-dropdown'><FaCheckCircle /></button></td>
                    <td className="Units"></td>
                    <td className="Summer"><select className='course-dropdown'></select><button className='finalize-course-dropdown'><FaCheckCircle /></button></td>
                    <td className="Units"></td>
                    <td className="Fall"><select className='course-dropdown'></select><button className='finalize-course-dropdown'><FaCheckCircle /></button></td>
                    <td className="Units"></td>
                    <td className="Winter"><select className='course-dropdown'></select><button className='finalize-course-dropdown'><FaCheckCircle /></button></td>
                    <td className="Units"></td>
                    <td className="comment"></td>
                </tr>
                <tr>
                    <td className="Spring"><select className='course-dropdown'></select><button className='finalize-course-dropdown'><FaCheckCircle /></button></td>
                    <td className="Units"></td>
                    <td className="Summer"><select className='course-dropdown'></select><button className='finalize-course-dropdown'><FaCheckCircle /></button></td>
                    <td className="Units"></td>
                    <td className="Fall"><select className='course-dropdown'></select><button className='finalize-course-dropdown'><FaCheckCircle /></button></td>
                    <td className="Units"></td>
                    <td className="Winter"><select className='course-dropdown'></select><button className='finalize-course-dropdown'><FaCheckCircle /></button></td>
                    <td className="Units"></td>
                    <td className="comment"></td>
                </tr>
                <tr>
                    <td className="Spring"><select className='course-dropdown'></select><button className='finalize-course-dropdown'><FaCheckCircle /></button></td>
                    <td className="Units"></td>
                    <td className="Summer"><select className='course-dropdown'></select><button className='finalize-course-dropdown'><FaCheckCircle /></button></td>
                    <td className="Units"></td>
                    <td className="Fall"><select className='course-dropdown'></select><button className='finalize-course-dropdown'><FaCheckCircle /></button></td>
                    <td className="Units"></td>
                    <td className="Winter"><select className='course-dropdown'></select><button className='finalize-course-dropdown'><FaCheckCircle /></button></td>
                    <td className="Units"></td>
                    <td className="comment"></td>
                </tr>
                <tr>
                    <td className="Spring"><select className='course-dropdown'></select><button className='finalize-course-dropdown'><FaCheckCircle /></button></td>
                    <td className="Units"></td>
                    <td className="Summer"><select className='course-dropdown'></select><button className='finalize-course-dropdown'><FaCheckCircle /></button></td>
                    <td className="Units"></td>
                    <td className="Fall"><select className='course-dropdown'></select><button className='finalize-course-dropdown'><FaCheckCircle /></button></td>
                    <td className="Units"></td>
                    <td className="Winter"><select className='course-dropdown'></select><button className='finalize-course-dropdown'><FaCheckCircle /></button></td>
                    <td className="Units"></td>
                    <td className="comment"></td>
                </tr>
            </tbody>
            
        </table>
        <button onClick={addYear}>Add year</button>
        <button onClick={print}>Print</button>
        <button onClick={refresh}>clear</button>
        <p id="display">Warning </p>
    </div>

  );
}

export default Roadmap;
