import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCourseInfo , updateCourseInfo} from '../../components/getCourseInfo';
import { Button, Container, Form, Image, Row, Col } from 'react-bootstrap';
import '../../CSS/CourseAdmin.css'

function EditClass() {
    const [classNameAb, setclassNameAb] = useState('');
    const [className, setclassName] = useState('');
    const [Prerequisites, setPrerequisites] = useState('');
    const [Description, setDescription] = useState('');
    const [Units, setUnits] = useState('');
    const [TermTypicallyOffered, setTermTypicallyOffered] = useState('');
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState(null);

    //on mount: get user information from backend, and set respective states.
    useEffect(() => {

        async function getCourseInfoWrapper() {
            const user = await getCourseInfo();
            setclassNameAb(user.classNameAb);
            setclassName(user.className);
            setPrerequisites(user.Prerequisites);
            setDescription(user.Description);
            setUnits(user.Units);
            setTermTypicallyOffered(user.TermTypicallyOffered);

        }

        getCourseInfoWrapper();

    }, [])


    const handleSubmit = async () => {
        // let user = JSON.parse(localStorage.getItem('user'))
        // console.log(user._id)
        setLoading(true);
        setIsError(false);

        const data = {
            classNameAb: classNameAb,
            className: className,
            Prerequisites: Prerequisites,
            Description: Description,
            // password: password,
            Units: Units,
            TermTypicallyOffered: TermTypicallyOffered,
        }

        await updateCourseInfo(data)
            .then(res => {
                const courseData = JSON.parse(res.config.data)

                setclassNameAb(courseData.classNameAb);
                setclassName(courseData.className);
                setPrerequisites(courseData.Prerequisites);
                // setPassword(userData.password);
                setUnits(courseData.Units);
                setTermTypicallyOffered(courseData.TermTypicallyOffered);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                setIsError(true);
            })
    }


//render
return (
    <div className="editCourse">
        <Container>
            <Row>
                <Col>
                    <Form>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label className = "label" column sm="2">
                            Course Abbreviation:
                            </Form.Label>
                            <Col sm="10">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="classNameAb"
                                    placeholder="Change Course Abbreviation"
                                    value={classNameAb}
                                    onChange={e => setclassNameAb(e.target.value)} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-33" controlId="formPlaintextEmail">
                            <Form.Label className = "label" column sm="2">
                            Course Name:
                            </Form.Label>
                            <Col  sm="10">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="className"
                                    placeholder="Change Course Name"
                                    value={className}
                                    onChange={e => setclassName(e.target.value)} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-33" controlId="formPlaintextEmail">
                            <Form.Label className = "label" column sm="2">
                            Course Description:
                            </Form.Label>
                            <Col  sm="10">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Description"
                                    placeholder="Change Course Description"
                                    value={Description}
                                    onChange={e => setDescription(e.target.value)} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextProfileBio">
                            <Form.Label className = "label" column sm="2">
                            Course Prerequisites:
                            </Form.Label>
                            <Col sm="10">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Prerequisites"
                                    placeholder="Change Course Prerequisites"
                                    value={Prerequisites}
                                    onChange={e => setPrerequisites(e.target.value)} />
                                {/* <Form.Control plaintext defaultValue= "" />  */}
                            </Col>
                        </Form.Group>


                        <Form.Group as={Row} className="mb-33" controlId="formPlaintextEmail">
                            <Form.Label className = "label" column sm="3">
                            Units:
                            </Form.Label>
                            <Col sm="9">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="year"
                                    placeholder="Change Units"
                                    value={Units}
                                    onChange={e => setUnits(e.target.value)} />
                                {/* <Form.Control plaintext defaultValue= "" />  */}
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label className = "label" column sm="3">
                            Term Typically Offered:
                            </Form.Label>
                            <Col sm="9">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="TermTypicallyOffered"
                                    placeholder="Change Term Typically Offered"
                                    value={TermTypicallyOffered}
                                    onChange={e => setTermTypicallyOffered(e.target.value)} />
                                {/* <Form.Control plaintext defaultValue= "" />  */}
                            </Col>
                        </Form.Group>


                    </Form>
                </Col>
                <Button type="submit" onClick={handleSubmit} disabled={loading}>{loading ? 'Loading...' : 'Update'}</Button>
            </Row>

        </Container>
    </div>
);
}


export default EditClass;

