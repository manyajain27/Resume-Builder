import React from 'react';
import './Login.css';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';

function Login() {
  return (
    <MDBContainer fluid className="p-3 container" style={{marginTop:"100px"}}>

      <MDBRow>

        <MDBCol col='10' md='6'>
          <div className="title" style={{fontSize:"100px",fontWeight:"600",color:"lightblue",lineHeight:"1.2"}}>Resume Builder <span style={{fontSize:"30px",color:"gray",}}>by Manya.</span></div>
          <ul className="info text-white" style={{fontSize:"20px",color:"whitesmoke",marginTop:"20px",listStyleType:"circle"}}>
            <li style={{marginTop:"10px"}}>Comletely free and easy to use.</li>
            <li style={{marginTop:"10px"}}>Only 1 standard professional resume format.</li>
            <li style={{marginTop:"10px"}}>Fill in all your details and see the preview update in real time.</li>
            <li style={{marginTop:"10px"}}>You can upload any exising resume file (pdf/word) or JSON format file to fill in the details automatically. </li>
            <li style={{marginTop:"10px"}}>Save your resume so the next time you login again, all your details will be there.</li>
            <li style={{marginTop:"10px"}}>Download the resume made in pdf format.</li>
          </ul>
        </MDBCol>

        <MDBCol col='4' md='6' className='container' style={{padding:"0 20px 0 20px",maxWidth:"380px",boxShadow:"0 0 10px darkslategray",background:"rgba(0,0,0,0.1)",borderRadius:"20px"}}>


          <MDBInput wrLoginerClass='mb-4' label='Email ' id='formControlLg' type='email' placeholder='Enter your email' size="lg" style={{marginTop:"50px"}}/>
          <MDBInput wrLoginerClass='mb-4' label='Password' id='formControlLg' placeholder='Enter password' type='password' size="lg"/>


          <div className="d-flex justify-content-between mx-4 mb-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
            <a href="!#" style={{color:"black"}}>Forgot password?</a>
          </div>

          <button className="mb-4 w-100 btn btn-dark" size="lg">Sign in</button>

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">OR</p>
          </div>

          <button className="mb-4 w-100 btn btn-light" size="lg" style={{backgroundColor: ''}}>
          <svg stroke="currentColor" style={{scale:"1.5",marginBottom:"4px",marginRight:"30px"}} fill="currentColor" stroke-width="0" version="1.1" x="0px" y="0px" viewBox="0 0 48 48" enable-background="new 0 0 48 48" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
	c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
	c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
	C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg>
            Continue with Google
          </button>

          <button className="mb-4 w-100 btn btn-light" size="lg" style={{backgroundColor: ''}}>
          <svg stroke="currentColor" style={{scale:"1.5",marginBottom:"4px",marginRight:"25px"}} fill="currentColor" stroke-width="0" version="1.1" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M14.5 0h-13c-0.825 0-1.5 0.675-1.5 1.5v13c0 0.825 0.675 1.5 1.5 1.5h13c0.825 0 1.5-0.675 1.5-1.5v-13c0-0.825-0.675-1.5-1.5-1.5zM6 13h-2v-7h2v7zM5 5c-0.553 0-1-0.447-1-1s0.447-1 1-1c0.553 0 1 0.447 1 1s-0.447 1-1 1zM13 13h-2v-4c0-0.553-0.447-1-1-1s-1 0.447-1 1v4h-2v-7h2v1.241c0.412-0.566 1.044-1.241 1.75-1.241 1.244 0 2.25 1.119 2.25 2.5v4.5z"></path></svg>
            Continue with LinkedIn
          </button>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}

export default Login;