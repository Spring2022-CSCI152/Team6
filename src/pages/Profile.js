import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserInfo } from '../components/GetUserInfo';
import { Button, Container, Form, Image, Row, Col } from 'react-bootstrap';
import '../CSS/profile.css'


const Profile = () => {

    const emptyUser = {
        firstname: "",
        lastname:"",
        email:"",
        major:"",
        year:"",
        expectedGraduationDate:""
    }

    //state and state change function for user object
    const [user, setUser] = useState(emptyUser);

    //loads user info on mount
    useEffect(() => {

        async function getUserInfoWrapper() {

            //updates user state with user object from backend, matched by stored cookie id
            setUser(await getUserInfo());
            //console.log(user);
        }

        getUserInfoWrapper();
        
    }, []);

    //render
    return (<>
        <div className='profile'>
            Profile
        <Container>
            <Row>
            <Col>

            <Form>

            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                <Form.Label className = "label" column sm="2">
                First Name:
                </Form.Label>
                <Col sm="10">
                <Form.Control className = "input" plaintext readOnly value={user.firstname} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-33" controlId="formPlaintextEmail">
                <Form.Label className = "label" column sm="2">
                Last Name:
                </Form.Label>
                <Col sm="10">
                <Form.Control  className = "input" plaintext readOnly value={user.lastname} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                <Form.Label className = "label" column sm="2">
                Email:
                </Form.Label>
                <Col sm="10">
                <Form.Control  className = "input" plaintext readOnly value={user.email} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-33" controlId="formPlaintextEmail">
                <Form.Label className = "label" column sm="2">
                Major:
                </Form.Label>
                <Col sm="10">
                <Form.Control className = "input" plaintext readOnly value={user.major} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                <Form.Label className = "label" column sm="2">
                Year:
                </Form.Label>
                <Col sm="10">
                <Form.Control  className = "input" plaintext readOnly value={user.year} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-33" controlId="formPlaintextEmail">
                <Form.Label className = "label" column sm="2">
                Expected Graduation Date:
                </Form.Label>
                <Col sm="10">
                <Form.Control className = "input" plaintext readOnly value={user.expectedGraduationDate} />
                </Col>
            </Form.Group>

            </Form>
            </Col>
            <div className = "profilebuttons">
                <div>
                    <Link to="/EditProfile"><button>
                    Edit your profile
                    </button>
                    </Link>
                </div>
            </div>
            </Row>
        </Container>
        </div>
    </>
    )
}

export default Profile;
