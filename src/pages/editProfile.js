import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserInfo, updateUserInfo } from '../components/GetUserInfo';
import { Button, Container, Form, Image, Row, Col } from 'react-bootstrap';
import '../CSS/profile.css'

const message = "Updated!"

function EditProfile() {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    // const [password, setPassword] = useState('');
    const [major, setMajor] = useState('');
    const [year, setYear] = useState('');
    const [expectedGraduationDate, setExpGraduationDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState(null);


    //on mount: get user information from backend, and set respective states.
    useEffect(() => {

        async function getUserInfoWrapper() {
            const user = await getUserInfo();
            setFirstName(user.firstname);
            setLastName(user.lastname);
            // setPassword(user.password);
            setMajor(user.major);
            setYear(user.year);
            setExpGraduationDate(user.expectedGraduationDate);

        }

        getUserInfoWrapper();

    }, [])


    const handleSubmit = async () => {
        // let user = JSON.parse(localStorage.getItem('user'))
        // console.log(user._id)
        setLoading(true);
        setIsError(false);

        const data = {
            firstname: firstname,
            lastname: lastname,
            // password: password,
            major: major,
            year: year,
            expectedGraduationDate: expectedGraduationDate
        }

        await updateUserInfo(data)
            .then(res => {
                const userData = JSON.parse(res.config.data)

                setFirstName(userData.firstname);
                setLastName(userData.lastname);
                // setPassword(userData.password);
                setMajor(userData.major);
                setYear(userData.year);
                setExpGraduationDate(userData.expectedGraduationDate);
                setLoading(false);
                console.log("Updated!");
            })
            .catch(err => {
                setLoading(false);
                setIsError(true);
                console.log("Error")
            })
    }

    //render
    return (
        <div className="editProfile">
            <Container>
                <Row>

                    <Col>
                        <Form>
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                <Form.Label className = "label" column sm="2">
                                    First Name:
                                </Form.Label>
                                <Col sm="10">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="firstname"
                                        placeholder="Change First name"
                                        value={firstname}
                                        onChange={e => setFirstName(e.target.value)} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-33" controlId="formPlaintextEmail">
                                <Form.Label className = "label" column sm="2">
                                    Last Name:
                                </Form.Label>
                                <Col  sm="10">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="lastname"
                                        placeholder="Change Last name"
                                        value={lastname}
                                        onChange={e => setLastName(e.target.value)} />
                                </Col>
                            </Form.Group>

                            {/* <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                <Form.Label column sm="2">
                                    Password
                                </Form.Label>
                                <Col sm="10">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="password"
                                        placeholder="Change password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)} />

                                </Col>
                            </Form.Group> */}

                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextProfileBio">
                                <Form.Label className = "label" column sm="2">
                                    Major:
                                </Form.Label>
                                <Col sm="10">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="major"
                                        placeholder="Change your major"
                                        value={major}
                                        onChange={e => setMajor(e.target.value)} />
                                    {/* <Form.Control plaintext defaultValue= "" />  */}
                                </Col>
                            </Form.Group>


                            <Form.Group as={Row} className="mb-33" controlId="formPlaintextEmail">
                                <Form.Label className = "label" column sm="3">
                                    Year:
                                </Form.Label>
                                <Col sm="9">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="year"
                                        placeholder="Change your academic year"
                                        value={year}
                                        onChange={e => setYear(e.target.value)} />
                                    {/* <Form.Control plaintext defaultValue= "" />  */}
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                <Form.Label className = "label" column sm="3">
                                    Expected Graduation Date:
                                </Form.Label>
                                <Col sm="9">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="expectedGraduationDate"
                                        placeholder="Change your expected Graduation Date"
                                        value={expectedGraduationDate}
                                        onChange={e => setExpGraduationDate(e.target.value)} />
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


export default EditProfile;
