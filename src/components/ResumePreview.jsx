import React, { useState } from 'react';
import html2pdf from 'html2pdf.js';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ResumePreview = ({ data, setResumeData  }) => {
    const api_key = "AIzaSyA-EkoRMBcor105_RSNCHiA0KvF39GIxIk";
    const [file, setFile] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false); // Loading state

    const navigate = useNavigate();

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleLogout = () => {
        // localStorage.removeItem('token');
        navigate('/');
    };

    const transformApiResponseToSampleData = (apiResponse) => {
        return {
            name: apiResponse.PersonalDetail?.name || '',
            email: apiResponse.PersonalDetail?.email || '',
            phone: apiResponse.PersonalDetail?.phone || '',
            website: apiResponse.PersonalDetail?.website || '',
            workExperience: apiResponse.WorkExperience.map(exp => ({
                company: exp.company,
                startDate: exp.start_date || '',
                endDate: exp.end_date || '',
                position: exp.position,
                location: exp.location,
                description: exp.description || []
            })),
            education: apiResponse.Education.map(edu => ({
                university: edu.university,
                startDate: edu.start_date || '',
                endDate: edu.end_date || '',
                degree: edu.degree,
                location: edu.location,
                description: edu.description || []
            })),
            skills: apiResponse.Skills.map(skill => skill.skill_name),
            interests: apiResponse.Interests.map(interest => interest.interest_name)
        };
    };

    // const handleJsonResponse = (responseData) => {
    //     const transformedData = transformApiResponseToSampleData(responseData);
    //     setResumeData(transformedData); // Update resumeData in the parent component
    //     console.log('Updated resumeData:', transformedData);
    // };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        setLoading(true);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/upload/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Extract the text from the response
            const extractedText = response.data.extracted_text;
            // console.log(extractedText);

            // Send the extracted text to the Gemini API
            const jsonResponse = await sendExtractedTextToGemini(extractedText);
            const transformedData = transformApiResponseToSampleData(JSON.parse(jsonResponse));
            setResumeData(transformedData);

            // Log the JSON response
            // console.log(jsonResponse);
            console.log(transformedData);

            // Close the modal after successful upload
            setShowModal(false);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
        finally {
            setLoading(false); // Set loading to false after processing
            setShowModal(false); // Close the modal after processing
        }
    };

    async function sendExtractedTextToGemini(extractedText) {
        const prompt = `
    Convert the following resume text into a JSON object based on the provided structure. 
    Only include the specified fields and ignore any extra information that does not correspond to these fields:
    - PersonalDetail: 
      - name
      - email
      - phone
      - website
    - WorkExperience (array of objects):
      - company
      - start_date
      - end_date
      - position
      - location
      - description (an array of strings, split by new lines)
    - Education (array of objects):
      - university
      - start_date
      - end_date
      - degree
      - location
      - description (an array of strings, split by new lines)
    - Skills (array of objects):
      - skill_name
    - Interests (array of objects):
      - interest_name
        dont write json as a title. just return the json text without any titles. dont add any extra fields,just stick to the format given and if text has any extra fields ignore it
    Resume Text:
    ${extractedText}
`;
    
        const response = await axios({
            url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${api_key}`,
            method: 'post',
            data: {
                contents: [
                    {
                        parts: [
                            { text: prompt }
                        ]
                    }
                ]
            }
        });

        return response.data.candidates[0].content.parts[0].text;
    }

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
        <div >

         <div className="container flex">
                <button className="buttonicon download btn btn-outline-info" onClick={generatePDF}>
                    Download Resume as PDF
                </button>
                <button 
                    className='buttonicon upload btn btn-outline-secondary' 
                    onClick={() => setShowModal(true)}
                >
                    Upload Existing Resume
                    <svg stroke="currentColor" style={{marginLeft:"7px",marginBottom:"3px"}} fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M.5 8a.5.5 0 01.5.5V12a1 1 0 001 1h12a1 1 0 001-1V8.5a.5.5 0 011 0V12a2 2 0 01-2 2H2a2 2 0 01-2-2V8.5A.5.5 0 01.5 8zM5 4.854a.5.5 0 00.707 0L8 2.56l2.293 2.293A.5.5 0 1011 4.146L8.354 1.5a.5.5 0 00-.708 0L5 4.146a.5.5 0 000 .708z" clipRule="evenodd"></path>
                        <path fillRule="evenodd" d="M8 2a.5.5 0 01.5.5v8a.5.5 0 01-1 0v-8A.5.5 0 018 2z" clipRule="evenodd"></path>
                    </svg>
                </button>
                <button className="buttonicon logout btn btn-outline-danger" onClick={handleLogout}>
                    Logout
                </button>
            </div>

            {/* Bootstrap Modal for file upload */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Upload Existing Resume</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <p>You can import any existing resume that you have and we'll automatically extract the matching entries into our resume!</p>
                        <input type="file" onChange={handleFileChange} className="form-control mb-3" />
                        <Button type="submit" className="btn btn-secondary" disabled={loading}>
                            {loading ? 'Uploading...' : 'Upload Resume'}
                        </Button>
                        {loading && <div className="mt-2">
                            Loading...
                            <svg className='animate-spin size-[50px]' stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M2 11H7V13H2zM17 11H22V13H17zM11 17H13V22H11zM11 2H13V7H11z"></path><path transform="rotate(-45.001 6.697 6.697)" d="M5.697 4.197H7.697V9.197H5.697z"></path><path transform="rotate(134.999 17.303 17.303)" d="M16.303 14.803H18.303V19.803H16.303z"></path><path transform="rotate(45.001 6.697 17.303)" d="M5.697 14.803H7.697V19.803H5.697z"></path><path transform="rotate(-44.992 17.303 6.697)" d="M14.803 5.697H19.803V7.697H14.803z"></path></svg>
                            </div>
                            } {/* Loading message */}
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        
        <div className="resume-page" id="resume-preview" >
            <div className="pdf-content">
                    {/* PERSONAL DETAILS */}
                <h1>{data.name || "Manya Jain"}</h1>
                <ul className="header-links">
                    <li>{data.email || "email@example.com"}</li>|
                    <li>{data.phone || "+919543288456"}</li>|
                    <li>{data.website || ""}</li>
                </ul>
                <hr />

                {/* WORK EXPERIENCE */}
                <div className="title">WORK EXPERIENCE</div>
                <hr />
                {data.workExperience.map((job, index) => (
                    <div key={index} className="company-container ">
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
        </div>
    );
};

export default ResumePreview;
