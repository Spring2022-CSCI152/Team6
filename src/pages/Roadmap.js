import '../CSS/roadmap.css';
import axios from '../axios';
import React, { createElement,useState, useEffect } from 'react';
import { async } from 'regenerator-runtime';

function Roadmap() {
    var coursesOfferInSpring= [];
    var coursesOfferInSummer= [];
    var coursesOfferInFall= [];
    var coursesOfferInWinter= [];
    var countYear=1;

    const [matrix, setMatrix] = useState([]);
    // const [courseAlreadyTaken, setCourseAlreadyTaken] = useState([]);
    var courseAlreadyTaken=["MATH 75"];
    useEffect(() => {

        async function getUserInfoWrapper() {
            createYear();
            window.sample=document.getElementById("year1").cloneNode(true);
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
    }
    function addYear(){
        countYear++;
        let table =  document.getElementById("table");
        var newSample=window.sample.cloneNode(true);
        newSample.id="year"+countYear.toString();
        table.appendChild(newSample);
        const term = document.getElementsByClassName('year-dropdown');
        var count=1;
        Array.prototype.forEach.call (term, function (node) {
            node.id="year"+count+"-dropdown";
            node.addEventListener("change",getYear, false);
            count+=1;
        } );
        const course = document.getElementsByClassName('course-dropdown');
        Array.prototype.forEach.call (course, function (node) {
            node.addEventListener("change",finalize, false);
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
                                if((courseAlreadyTaken.filter((item) => item == element)[0]))
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
                                    var courseMeetORRequirement=courseAlreadyTaken.filter((item) => item == element);
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
        console.log(e.target.id);
        var td =document.getElementById(e.target.id).parentNode;
        td.innerHTML=e.target.value;
        var tr=td.parentNode;
        tr.parentNode.id =e.target.value; //tbody's id
        var newYear=[];
        newYear.push(e.target.value);
        setMatrix(newYear);
    }
    const addCourse = async (e) =>{
        console.log(e.target.value);
    }
    

    var OR=[];

    const finalize = async (e) =>{
        if(e.target.parentNode.parentNode.parentNode.id==""){
            alert("Please choose an academic year first");
        }
        else{
            //sending to server
            const req = await axios.post('/course/search', {"specific":e.target.value.toString()})
            .then((res) => {
                //data of the course will be res.data.courses[0]
                console.log(res.data.courses[0].Units);
                courseAlreadyTaken.push(e.target.value);
                var display=document.getElementById("display");
                display.style.display="block";
                var warning=document.createElement("p");
                if(res.data.courses[0].TermTypicallyOffered.length!=0 && res.data.courses[0].TermTypicallyOffered.includes(e.target.parentNode.className)==false){
                    warning.innerHTML=res.data.courses[0].classNameAb+ " is typically offered in " + res.data.courses[0].TermTypicallyOffered.join(", ") + "\n<br>";
                }
                if(res.data.courses[0].Prerequisites.length!=0)
                {
                    warning.innerHTML+=res.data.courses[0].classNameAb + " - Prequesites: "+res.data.courses[0].Prerequisites.join(", ");
                }
                display.appendChild(warning);
                e.target.parentNode.nextElementSibling.innerHTML=res.data.courses[0].Units.toString();
                e.target.parentNode.innerHTML=e.target.value;
                
                clearCourse();
                viewCourse();
            }).catch((error) => {
                console.log(error);
            });
        }
        // if(e.target.parentNode)
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
            <tbody id="year1" className='year'>
                <tr>
                    <td rowSpan="5" className="year"><select className='year-dropdown' id='year1-dropdown' onChange={getYear}></select></td>
                    <td className="Spring"><select className='course-dropdown' onChange={finalize}></select></td>
                    <td className="Units"></td>
                    <td className="Summer"><select className='course-dropdown' onChange={finalize}></select></td>
                    <td className="Units"></td>
                    <td className="Fall"><select className='course-dropdown' onChange={finalize}></select></td>
                    <td className="Units"></td>
                    <td className="Winter"><select className='course-dropdown' onChange={finalize}></select></td>
                    <td className="Units"></td>
                    <td className="comment"></td>
                </tr>
                <tr>
                    <td className="Spring"><select className='course-dropdown' onChange={finalize}></select></td>
                    <td className="Units"></td>
                    <td className="Summer"><select className='course-dropdown' onChange={finalize}></select></td>
                    <td className="Units"></td>
                    <td className="Fall"><select className='course-dropdown' onChange={finalize}></select></td>
                    <td className="Units"></td>
                    <td className="Winter"><select className='course-dropdown' onChange={finalize}></select></td>
                    <td className="Units"></td>
                    <td className="comment"></td>
                </tr>
                <tr>
                    <td className="Spring"><select className='course-dropdown' onChange={finalize}></select></td>
                    <td className="Units"></td>
                    <td className="Summer"><select className='course-dropdown' onChange={finalize}></select></td>
                    <td className="Units"></td>
                    <td className="Fall"><select className='course-dropdown' onChange={finalize}></select></td>
                    <td className="Units"></td>
                    <td className="Winter"><select className='course-dropdown' onChange={finalize}></select></td>
                    <td className="Units"></td>
                    <td className="comment"></td>
                </tr>
                <tr>
                    <td className="Spring"><select className='course-dropdown' onChange={finalize}></select></td>
                    <td className="Units"></td>
                    <td className="Summer"><select className='course-dropdown' onChange={finalize}></select></td>
                    <td className="Units"></td>
                    <td className="Fall"><select className='course-dropdown' onChange={finalize}></select></td>
                    <td className="Units"></td>
                    <td className="Winter"><select className='course-dropdown' onChange={finalize}></select></td>
                    <td className="Units"></td>
                    <td className="comment"></td>
                </tr>
                <tr>
                    <td className="Spring"><select className='course-dropdown' onChange={finalize}></select></td>
                    <td className="Units"></td>
                    <td className="Summer"><select className='course-dropdown' onChange={finalize}></select></td>
                    <td className="Units"></td>
                    <td className="Fall"><select className='course-dropdown' onChange={finalize}></select></td>
                    <td className="Units"></td>
                    <td className="Winter"><select className='course-dropdown' onChange={finalize}></select></td>
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
