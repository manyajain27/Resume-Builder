import React, { useEffect } from 'react';
import {  useLocation,  useNavigate} from 'react-router-dom';
import { connect } from 'react-redux';
import { googleAuthenticate } from '../actions/auth';
import queryString from 'query-string';

const Google = ({ googleAuthenticate }) => {
    let location = useLocation();
    const navigate = useNavigate(); 
    useEffect(() => {
        const values = queryString.parse(location.search);
        const state = values.state ? values.state : null;
        const code = values.code ? values.code : null;

        console.log('State: ' + state);
        console.log('Code: ' + code);

        if (state && code) {
            googleAuthenticate(state, code).then(() => {
                alert('Logged in through Google successfully'); // Show success alert
                navigate('/resume'); // Redirect to the /resume page
            }).catch(error => {
                console.error('Google Authentication failed', error);
            });
        }
    }, [location, googleAuthenticate, navigate]);
    return (
        <div className='container bg-white'>
          Google authentication in progress...
        </div>
    );
};

export default connect(null, { googleAuthenticate })(Google);