import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Container, Form, Image, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';

// //ensures requests to backend include the json web token
// axios.interceptors.request.use(
//     config => {
//         // const { origin } = new URL(config.url);
//         // const allowedOrigins = [apiUrl];
//         const token = localStorage.getItem('token');
//         // if (allowedOrigins.includes(origin)) {
//         config.headers.authorization = `Bearer ${token}`;
//         // }
//         return config;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// );



// const Profile = () => {

//     //state and state change function for user object
//     const [user, setUser] = useState({});

//     //loads user info on mount
//     useEffect(() => {
//         getUserInfo();
//     }, []);

//     //gets user information from backend
//     const getUserInfo = async () => {

//         //request user information from server
//         const user = await axios.get("/profile")

//             .then((res) => {

//                 //set user state
//                 setUser(res.data.user);

//             }).catch((error) => {
//                 console.log(error);
//             })
//     }


//     return (<>
//         <div className='profile'>
//             <h1>Profile Page</h1>

//             {/* Example of how to use user object */}
//             <ul>
//                 <li>First Name: {user.firstname}</li>
//                 <li>Last Name: {user.lastname}</li>
//                 <li>Email: {user.email}</li>
//             </ul>

//         </div>
//     </>
//     )
// }

// export default Profile


export default class Profile extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			firstName: "",
            lastName: "",
			password: "",
		};
	}

	
	componentDidMount() {
			let user = JSON.parse(localStorage.getItem('user'))
			console.log(user._id)
			axios.get('http://localhost:4000/user/get?email=gurleenkaurvaid@gmail.com')
				.then((response) => {
					console.log(response.data);
					this.setState({
						firstName: response.data[0].firstname,
                        lastName: response.data[0].lastname,
						email: response.data[0].email,
						password: response.data[0].password,
					});

					console.log(this.state.displayName);
				})
				.catch(function (error) {
					console.log(error);
			});
	}



	render() { 
		return (
			<div className='profile'>
			<Container>
				<Row>
				<Col xs={6} md={4}>
				<img src="https://media.geeksforgeeks.org/wp-content/uploads/20210425000233/test-300x297.png" alt = {""} class="img2"></img>
				</Col>
        
				<Col>
				<Form>
				<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
					<Form.Label column sm="2">
					First Name
					</Form.Label>
					<Col sm="10">
					<Form.Control plaintext readOnly value={this.state.firstName} />
					</Col>
				</Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
					<Form.Label column sm="2">
					Last Name
					</Form.Label>
					<Col sm="10">
					<Form.Control plaintext readOnly value={this.state.lastName} />
					</Col>
				</Form.Group>

				<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
					<Form.Label column sm="2">
					Email
					</Form.Label>
					<Col sm="10">
					<Form.Control plaintext readOnly value={this.state.email} />
					</Col>
				</Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
					<Form.Label column sm="2">
					Major
					</Form.Label>
					<Col sm="10">
					<Form.Control plaintext readOnly value={this.state.firstName} />
					</Col>
				</Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
					<Form.Label column sm="2">
					Year
					</Form.Label>
					<Col sm="10">
					<Form.Control plaintext readOnly value={this.state.firstName} />
					</Col>
				</Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
					<Form.Label column sm="2">
					Expected Graduation Date
					</Form.Label>
					<Col sm="10">
					<Form.Control plaintext readOnly value={this.state.firstName} />
					</Col>
				</Form.Group>

				<Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
					<Form.Label column sm="2">
					Password
					</Form.Label>
					<Col sm="10">
						*******************
					<Link to="/EditProfile"><button className="pwbutton">
					Change your password
					</button>
					</Link>
					</Col>
				</Form.Group>

				</Form>
				</Col>
				<div className = "profilebuttons">
					{/* <div>
						<Link to="/EditProfile"><button>
						Edit your profile
						</button>
						</Link>
					</div> */}
				</div>
                </Row>

			</Container>
			</div>
		);
	}
}