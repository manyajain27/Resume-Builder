import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { linkedinAuthenticate } from '../actions/auth';
import queryString from 'query-string';

const LinkedIn = ({ linkedinAuthenticate }) => {
    const location = useLocation();

    useEffect(() => {
        const values = queryString.parse(location.search);
        const state = values.state ? values.state : null;
        const code = values.code ? values.code : null;

        if (state && code) {
            linkedinAuthenticate(state, code);
        }
    }, [location]);

    return <div className="container">LinkedIn Authentication</div>;
};

export default connect(null, { linkedinAuthenticate })(LinkedIn);
