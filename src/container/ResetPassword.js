import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password } from '../actions/auth';
import {
    MDBContainer,
    MDBCol,
    MDBRow
  } from 'mdb-react-ui-kit';
  
const ResetPassword = ({ reset_password }) => {
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        email: ''
    });

    const { email } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        reset_password(email);
        setRequestSent(true);
    };

    if (requestSent) {
        return <Navigate to='/mail' />
    }

    return (
        <div className=' ' style={{display:"flex",flexDirection:"column",alignItems:"center",marginTop:"150px"}}>
            <div>
                <h1 style={{color:"lightgray",marginTop:"0px"}}> Reset Password</h1>
                <p style={{color:"lightgray"}} className='text-center'>Enter your Email</p>
            </div>
            
            <MDBContainer className="p-3" >

                    <MDBRow style={{marginBottom:"0", position:"relative"}}>
                            <MDBCol col='4' md='6' className='' style={{margin:"0 auto",padding:"0 20px 0 20px",maxWidth:"380px",boxShadow:"0 0 10px darkslategray",background:"rgba(0,0,0,0.1)",borderRadius:"20px"}}>
                                <form onSubmit={e => onSubmit(e)}>
                                <div className='form-group'>
                                <label className=' mb-1 fs-5' style={{marginTop:"20px",color:"lightgray"}}>Email</label>
                                    <input
                                        className='form-control mb-3'
                                        type='email'
                                        placeholder='Email'
                                        name='email'
                                        value={email}
                                        onChange={e => onChange(e)}
                                        required
                                    />
                                </div>
                                <button className='btn btn-dark mb-3 container' type='submit'>Reset Password</button>
                            </form>
                            </MDBCol>
                        

                    </MDBRow>

            </MDBContainer>
            
        </div>
        
    );
};

export default connect(null, { reset_password })(ResetPassword);