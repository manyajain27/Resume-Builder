// src/App.js
import React, { useState } from 'react';
import './App.css';
import ResumeInput from './components/ResumeInput';
import ResumePreview from './components/ResumePreview';
import 'bootstrap/dist/css/bootstrap.min.css';
import { sampleData } from './data';

const App = () => {
    const [resumeData, setResumeData] = useState(sampleData);

    return (
        <div className="app">
          <div className="left-panel">
             <ResumeInput resumeData={resumeData} setResumeData={setResumeData} />
          </div>
            
            <div className="right-panel">
                <ResumePreview data={resumeData} />
            </div>
        </div>
        
    );
};

export default App;
