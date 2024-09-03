import React from 'react';
import html2pdf from 'html2pdf.js';

const ResumePreview = ({ data }) => {

const generatePDF = () => {
    const element = document.querySelector('.pdf-content');
    const options = {
        margin: 0.2,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().from(element).set(options).save();
};




    return (
        <>
            <button className="download btn btn-primary mb-3" onClick={generatePDF}>Download Resume as PDF</button>
        <div className="resume-page" id="resume-preview">
            <div className="pdf-content">
                    {/* PERSONAL DETAILS */}
                <h1>{data.name || "Manya Jain"}</h1>
                <ul className="header-links">
                    <li>{data.email || "email@example.com"}</li>|
                    <li>{data.phone || "+919543288456"}</li>|
                    <li>{data.github || ""}</li>
                </ul>
                <hr />

                {/* WORK EXPERIENCE */}
                <div className="title">WORK EXPERIENCE</div>
                <hr />
                {data.workExperience.map((job, index) => (
                    <div key={index} className="company-container">
                        <div className="company company-title">
                            <div className="company"><strong>{job.company}</strong></div>
                            <div className="company-tenure">
                                <strong>{job.startMonth} {job.startYear} - {job.endMonth} {job.endYear}</strong>
                            </div>
                        </div>
                        <div className="company company-position">
                            <div className="position"><em>{job.position}</em></div>
                            <div className="location"><em>{job.location}</em></div>
                        </div>
                        <ul className="company-description">
                            {job.description.map((desc, i) => (
                                <li key={i}>{desc}</li>
                            ))}
                        </ul>
                    </div>
                ))}

                {/* EDUCATION */}
                <div className="title">EDUCATION</div>
                <hr />
                {data.education.map((edu, index) => (
                    <div key={index} className="education-container">
                        <div className="education education-title">
                            <div className="university"><strong>{edu.university}</strong></div>
                            <div className="uni-tenure">
                                <strong>{edu.startMonth} {edu.startYear} - {edu.endMonth} {edu.endYear}</strong>
                            </div>
                        </div>
                        <div className="education education-position">
                            <div className="degree"><em>{edu.degree}</em></div>
                            <div className="location"><em>{edu.location}</em></div>
                        </div>
                        <ul className="education-description">
                            {edu.description.map((desc, i) => (
                                <li key={i}>{desc}</li>
                            ))}
                        </ul>
                    </div>
                ))}

                {/* SKILLS */}
                <div className="title">SKILLS</div>
                <hr />
                <div className="skills-container">
                    <ol>
                        {data.skills.map((skill, index) => (
                            <li key={index}>{skill}</li>
                        ))}
                    </ol>
                </div>

                {/* INTERESTS */}
                <div className="title">INTERESTS</div>
                <hr />
                <ul className="interests">
                    {data.interests.map((interest, index) => (
                        <li key={index}>{interest}</li>
                    ))}
                </ul>
                </div>
            
        </div>
        </>
    );
};

export default ResumePreview;
