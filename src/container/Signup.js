// import React, {useState} from 'react';
// import { Link,  Navigate } from 'react-router-dom';
// import {connect} from 'react-redux';
// import axios from 'axios';
// import './Login.css';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBCheckbox
}
from 'mdb-react-ui-kit';

//   return (
    
//   );
// }


import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../actions/auth';
import axios from 'axios';

const Signup = ({ signup, isAuthenticated }) => {
    const [accountCreated, setAccountCreated] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        re_password: ''
    });

    const { first_name, last_name, email, password, re_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        if (password === re_password) {
            signup(first_name, last_name, email, password, re_password);
            setAccountCreated(true);
        }
    };

    const continueWithGoogle = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?Navigate_uri=${process.env.REACT_APP_API_URL}/google`)

            window.location.replace(res.data.authorization_url);
        } catch (err) {

        }
    };

    const continueWithLinkedIn = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/linkedin-oauth2/?redirect_uri=${process.env.REACT_APP_API_URL}/linkedin`);
    
            window.location.replace(res.data.authorization_url);  // Redirects to LinkedIn for authentication
        } catch (err) {
            console.error(err);
        }
    };
    
   

    if (isAuthenticated) {
        return <Navigate to='/resume' />
    }
    if (accountCreated) {
        return <Navigate to='/mail' />
    }

    return (
        <div className='mt-2 ' style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
            <div>
                <h1 style={{color:"lightgray",marginTop:"0px"}}> Sign Up</h1>
                <p style={{color:"lightgray"}}>Create your Account</p>
            </div>
            
            <MDBContainer className="p-3" >

                    <MDBRow style={{marginBottom:"0", position:"relative"}}>
                            <MDBCol col='4' md='6' className='' style={{margin:"0 auto",padding:"0 20px 0 20px",maxWidth:"380px",boxShadow:"0 0 10px darkslategray",background:"rgba(0,0,0,0.1)",borderRadius:"20px"}}>
                            <form onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                <label className=' mb-1 fs-5' style={{marginTop:"20px",color:"lightgray"}}>First Name</label>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='First Name*'
                        name='first_name'
                        value={first_name}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                <label className=' mb-1 fs-5' style={{marginTop:"20px",color:"lightgray"}}>Last Name</label>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Last Name*'
                        name='last_name'
                        value={last_name}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                <label className=' mb-1 fs-5' style={{marginTop:"20px",color:"lightgray"}}>Email</label>
                    <input
                        className='form-control'
                        type='email'
                        placeholder='Email*'
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                <label className=' mb-1 fs-5' style={{marginTop:"20px",color:"lightgray"}}>Password</label>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Password*'
                        name='password'
                        value={password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                    />
                </div>
                <div className='form-group'>
                <label className=' mb-1 fs-5' style={{marginTop:"20px",color:"lightgray"}}>Confirm Password</label>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Confirm Password*'
                        name='re_password'
                        value={re_password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                    />
                </div>
                <button className='btn btn-success mt-4 mb-4 container' type='submit'>Register</button>
            </form> 
                            </MDBCol>
                        

                    </MDBRow>

            </MDBContainer>
            
            <br />
            <p className='' style={{color:"lightgray"}}>
                Already have an account? <Link to='/' >Sign In</Link>
            </p>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { signup })(Signup);