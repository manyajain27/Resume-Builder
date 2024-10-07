import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password_confirm } from '../actions/auth';
import { useParams } from 'react-router-dom';
import {
    MDBContainer,
    MDBCol,
    MDBRow
  } from 'mdb-react-ui-kit';
  

const ResetPasswordConfirm = ({ reset_password_confirm }) => {
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: ''
    });
    const routeParams=useParams();
    const { new_password, re_new_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        const uid = routeParams.uid;
        const token = routeParams.token;

        reset_password_confirm(uid, token, new_password, re_new_password);
        setRequestSent(true);
    };

    if (requestSent) {
        alert("New password set. Login with new password!");
        return <Navigate to='/' />
    }

    return (
        <div className=' ' style={{display:"flex",flexDirection:"column",alignItems:"center",marginTop:"150px"}}>
            <div>
                <h1 style={{color:"lightgray",marginTop:"0px"}}> Enter New Password</h1>
            </div>
            
            <MDBContainer className="p-3" >

                    <MDBRow style={{marginBottom:"0", position:"relative"}}>
                            <MDBCol col='4' md='6' className='' style={{margin:"0 auto",padding:"0 20px 0 20px",maxWidth:"380px",boxShadow:"0 0 10px darkslategray",background:"rgba(0,0,0,0.1)",borderRadius:"20px"}}>
                                <form onSubmit={e => onSubmit(e)}>
                                <div className='form-group'>
                                <label className=' mb-1 fs-5' style={{marginTop:"20px",color:"lightgray"}}>New Password</label>
                                        <input
                                            className='form-control'
                                            type='password'
                                            placeholder='New Password'
                                            name='new_password'
                                            value={new_password}
                                            onChange={e => onChange(e)}
                                            minLength='6'
                                            required
                                        />
                                </div>
                                <div className='form-group'>
                                <label className=' mb-1 fs-5' style={{marginTop:"20px",color:"lightgray"}}>Confirm New Password</label>
                                        <input
                                            className='form-control'
                                            type='password'
                                            placeholder='Confirm New Password'
                                            name='re_new_password'
                                            value={re_new_password}
                                            onChange={e => onChange(e)}
                                            minLength='6'
                                            required
                                        />
                                </div>
                                <button className='btn btn-dark mb-3 container mt-3' type='submit'>Reset Password</button>
                            </form>
                            </MDBCol>
                        

                    </MDBRow>

            </MDBContainer>
            
        </div>
        
        // <div className='container mt-5'>
        //     <form onSubmit={e => onSubmit(e)}>
        //     <div className='form-group'>
                    
        //         </div>
        //         <div className='form-group'>
                    
        //         </div>
        //         <button className='btn btn-primary' type='submit'>Reset Password</button>
        //     </form>
        // </div>
    );
};

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);