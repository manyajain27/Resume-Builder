// src/App.js
import React, { useState } from 'react';
import './App.css';
import ResumeInput from './components/ResumeInput';
import ResumePreview from './components/ResumePreview';
import Login from './components/Login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { sampleData } from './data';

const App = () => {
    const [resumeData, setResumeData] = useState(sampleData);

    return (
        <Router>
            <div className="app-main">
                <Routes>
                    {/* <Route path="/" element={<Login />} /> */}
                    <Route path="/" element={
                        <div className='app'>
                            <div className="left-panel">
                                <ResumeInput resumeData={resumeData} setResumeData={setResumeData} />
                            </div>
                            <div className="right-panel">
                                <ResumePreview data={resumeData} />
                            </div>
                        </div>
                    } />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
