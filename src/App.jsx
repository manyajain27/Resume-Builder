// src/App.js
import React, { useState } from 'react';
import './App.css';
import ResumeInput from './components/ResumeInput';
import ResumePreview from './components/ResumePreview';
import Login from './components/Login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { sampleData } from './data';
import Signup from './container/Signup';
import ResetPassword from './container/ResetPassword';
import ResetPasswordConfirm from './container/ResetPasswordConfirm';
import Activate from './container/Activate';
import Google from './container/Google';
import { Provider } from 'react-redux';
import store from './store';
import CheckMail from './container/CheckMail';

const App = () => {
    const [resumeData, setResumeData] = useState(sampleData);

    return (
        <Provider store={store}>
            <Router>
                <div className="app-main">
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/resume" element={
                            <div className='app'>
                                <div className="left-panel">
                                    <ResumeInput resumeData={resumeData} setResumeData={setResumeData} />
                                </div>
                                <div className="right-panel">
                                    {/* Pass setResumeData to ResumePreview */}
                                    <ResumePreview data={resumeData} setResumeData={setResumeData} />
                                </div>
                            </div>
                        } />
                        <Route path="/activate/:uid/:token" element={<Activate />} />
                        <Route path="/reset-password" element={<ResetPassword />} />
                        <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path='/google' element={<Google />} />
                        <Route path='/mail' element={<CheckMail/>} />
                    </Routes>
                </div>
            </Router>
        </Provider>
    );
};

export default App;
