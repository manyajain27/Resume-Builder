import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure to import Bootstrap CSS
import axios from 'axios';

const ResumeInput = ({ resumeData, setResumeData }) => {

    useEffect(() => {
        if (resumeData) {
            console.log('Populating form with resumeData:', resumeData); 
            setResumeData(resumeData);
        }
    }, [resumeData]);

    

    // Function to handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setResumeData({
            ...resumeData,
            [name]: value,
        });
    }

    // Function to handle adding work experience
    const addWorkExperience = () => {
        setResumeData({
            ...resumeData,
            workExperience: [
                ...resumeData.workExperience,
                { company: '', startDate: '', endDate: '', position: '', location: '', description: [''] }
            ]
        });
    };

    // Function to handle deleting work experience
    const deleteWorkExperience = (index) => {
        const newWork = [...resumeData.workExperience];
        newWork.splice(index, 1);
        setResumeData({ ...resumeData, workExperience: newWork });
    };

    // Function to handle adding education
    const addEducation = () => {
        setResumeData({
            ...resumeData,
            education: [
                ...resumeData.education,
                { university: '', startDate: '', endDate: '', degree: '', location: '', description: [''] }
            ]
        });
    };

    // Function to handle deleting education
    const deleteEducation = (index) => {
        const newEdu = [...resumeData.education];
        newEdu.splice(index, 1);
        setResumeData({ ...resumeData, education: newEdu });
    };

    // Function to handle adding skills
    const addSkill = () => {
        setResumeData({
            ...resumeData,
            skills: [...resumeData.skills, '']
        });
    };

    // Function to handle deleting skill
    const deleteSkill = (index) => {
        const newSkills = [...resumeData.skills];
        newSkills.splice(index, 1);
        setResumeData({ ...resumeData, skills: newSkills });
    };

    // Function to handle adding interests
    const addInterest = () => {
        setResumeData({
            ...resumeData,
            interests: [...resumeData.interests, '']
        });
    };

    // Function to handle deleting interest
    const deleteInterest = (index) => {
        const newInterests = [...resumeData.interests];
        newInterests.splice(index, 1);
        setResumeData({ ...resumeData, interests: newInterests });
    };

    //prepare data in correct format
    const prepareData = (formData) => {
        return {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            website: formData.website,
            linkedin: formData.linkedin,
            work_experience: formData.workExperience.map(exp => ({
                company: exp.company,
                start_date: exp.startDate,
                end_date: exp.endDate,
                position: exp.position,
                location: exp.location,
                description: exp.description
            })),
            education: formData.education.map(edu => ({
                university: edu.university,
                start_date: edu.startDate,
                end_date: edu.endDate,
                degree: edu.degree,
                location: edu.location,
                description: edu.description
            })),
            skills: formData.skills.map(skill => ({ skill_name: skill })),
            interests: formData.interests.map(interest => ({ interest_name: interest }))
        };
    };
    

     const saveData = async () => {
        const preparedData = prepareData(resumeData);
        
        try {
            console.log(preparedData);
            const response = await axios.post('https://manyajain2701.pythonanywhere.com/api/personal_details/', preparedData);
            alert('Data saved successfully:', response.data);
        } catch (error) {
            alert('Error saving data', error);
        }
    };
    
    

    return (
        <>
        <div className="title ms-4" style={{fontSize:"50px",fontWeight:"600",color: "#EDEDF0"}}>Resume Builder <span style={{fontSize:"20px", color:"gray"}}>by Manya.</span>
                    <button className="btn btn-success " style={{marginLeft:"90px"}} onClick={saveData}>
                        Save Resume
                    </button>
                    </div>
        
        <div className="container" style={{marginTop:"10px"}}>
            <div className="card" style={{backgroundColor:"#EDEDF0"}}>
                <div className="card-body" >
                    <h2 className="card-title">Personal Details</h2>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control mb-2"
                            name="name"
                            placeholder="Full Name"
                            value={resumeData.name}
                            onChange={handleInputChange}
                        />
                        <input
                            type="email"
                            className="form-control mb-2"
                            name="email"
                            placeholder="Email"
                            value={resumeData.email}
                            onChange={handleInputChange}
                        />
                            <input
                                type="text"
                                className="form-control mb-2"
                                name="phone"
                                placeholder="Phone Number"
                                value={resumeData.phone}
                                onChange={handleInputChange}
                            />
                       
                        <input
                            type="text"
                            className="form-control mb-2"
                            name="website"
                            placeholder="Website"
                            value={resumeData.website}
                            onChange={handleInputChange}
                        />
                    </div>

                    <h2 className="card-title">Work Experience</h2>
                    {resumeData.workExperience.map((work, index) => (
                        <div className="form-group mb-3" key={index}>
                            <input
                                type="text"
                                className="form-control mb-2"
                                placeholder="Company Name"
                                value={work.company}
                                onChange={(e) => {
                                    const newWork = [...resumeData.workExperience];
                                    newWork[index].company = e.target.value;
                                    setResumeData({ ...resumeData, workExperience: newWork });
                                }}
                            />
                            
                    
                            <div >
                                <label className="me-3">Start Date:</label>
                                <br></br>
                                <select
                                    className="me-2"
                                    value={work.startMonth}
                                    style={{border:"",borderRadius:"10px",padding:"3px"}}
                                    onChange={(e) => {
                                        const newWork = [...resumeData.workExperience];
                                        newWork[index].startMonth = e.target.value;
                                        setResumeData({ ...resumeData, workExperience: newWork });
                                    }}
                                >
                                    <option value="">Month</option>
                                    <option value="Jan">Jan</option>
                                    <option value="Feb">Feb</option>
                                    <option value="Mar">Mar</option>
                                    <option value="Apr">Apr</option>
                                    <option value="May">May</option>
                                    <option value="Jun">Jun</option>
                                    <option value="Jul">Jul</option>
                                    <option value="Aug">Aug</option>
                                    <option value="Sep">Sep</option>
                                    <option value="Oct">Oct</option>
                                    <option value="Nov">Nov</option>
                                    <option value="Dec">Dec</option>
                                </select>
                                <select
                                    value={work.startYear}
                                    style={{border:"",borderRadius:"10px",padding:"3px"}}
                                    onChange={(e) => {
                                        const newWork = [...resumeData.workExperience];
                                        newWork[index].startYear = e.target.value;
                                        setResumeData({ ...resumeData, workExperience: newWork });
                                    }}
                                >
                                    <option value="">Year</option>
                                    {Array.from({ length: 50 }, (_, i) => {
                                        const yearplus5 = new Date().getFullYear() + 5;
                                        const year = yearplus5 - i;
                                        return <option key={year} value={year}>{year}</option>;
                                    })}
                                </select>
                            </div>
                            <div className="mb-2">
                                <label className="me-3">End Date:</label>
                                <br></br>
                                <select
                                style={{border:"",borderRadius:"10px",padding:"3px"}}
                                    className="me-2"
                                    value={work.endMonth}
                                    onChange={(e) => {
                                        const newWork = [...resumeData.workExperience];
                                        newWork[index].endMonth = e.target.value;
                                        setResumeData({ ...resumeData, workExperience: newWork });
                                    }}
                                >
                                    <option value="">Month</option>
                                    <option value="Present">Present</option>
                                    <option value="Jan">Jan</option>
                                    <option value="Feb">Feb</option>
                                    <option value="Mar">Mar</option>
                                    <option value="Apr">Apr</option>
                                    <option value="May">May</option>
                                    <option value="Jun">Jun</option>
                                    <option value="Jul">Jul</option>
                                    <option value="Aug">Aug</option>
                                    <option value="Sep">Sep</option>
                                    <option value="Oct">Oct</option>
                                    <option value="Nov">Nov</option>
                                    <option value="Dec">Dec</option>
                                </select>
                                <select
                                    value={work.endYear}
                                    style={{border:"",borderRadius:"10px",padding:"3px"}}
                                    onChange={(e) => {
                                        const newWork = [...resumeData.workExperience];
                                        newWork[index].endYear = e.target.value;
                                        setResumeData({ ...resumeData, workExperience: newWork });
                                    }}
                                >
                                    <option value="">Year</option>
                                    {Array.from({ length: 50 }, (_, i) => {
                                        const yearplus5 = new Date().getFullYear() + 5;
                                        const year = yearplus5 - i;
                                        return <option key={year} value={year}>{year}</option>;
                                    })}
                                </select>
                            </div>


                            <input
                                type="text"
                                className="form-control mb-2"
                                placeholder="Position"
                                value={work.position}
                                onChange={(e) => {
                                    const newWork = [...resumeData.workExperience];
                                    newWork[index].position = e.target.value;
                                    setResumeData({ ...resumeData, workExperience: newWork });
                                }}
                            />
                            <input
                                type="text"
                                className="form-control mb-2"
                                placeholder="Location"
                                value={work.location}
                                onChange={(e) => {
                                    const newWork = [...resumeData.workExperience];
                                    newWork[index].location = e.target.value;
                                    setResumeData({ ...resumeData, workExperience: newWork });
                                }}
                            />
                            <textarea
                                className="form-control mb-2"
                                placeholder="Description"
                                value={work.description.join('\n')}
                                onChange={(e) => {
                                    const newWork = [...resumeData.workExperience];
                                    newWork[index].description = e.target.value.split('\n');
                                    setResumeData({ ...resumeData, workExperience: newWork });
                                }}
                            />
                            <button className="btn btn-danger btn-sm" onClick={() => deleteWorkExperience(index)}>Delete</button>
                        </div>
                    ))}
                    <button className="btn btn-dark mb-3" onClick={addWorkExperience}>Add Work Experience</button>

                    <h2 className="card-title">Education</h2>
                    {resumeData.education.map((edu, index) => (
                        <div className="form-group mb-3" key={index}>
                            <input
                                type="text"
                                className="form-control mb-2"
                                placeholder="University Name"
                                value={edu.university}
                                onChange={(e) => {
                                    const newEdu = [...resumeData.education];
                                    newEdu[index].university = e.target.value;
                                    setResumeData({ ...resumeData, education: newEdu });
                                }}
                            />
                            
<div>
    <label>Start Date:</label>
    <br></br>
    <select
        className="me-2"
        value={edu.startMonth}
        style={{border:"",borderRadius:"10px",padding:"3px"}}
        onChange={(e) => {
            const newEdu = [...resumeData.education];
            newEdu[index].startMonth = e.target.value;
            setResumeData({ ...resumeData, education: newEdu });
        }}
    >
        <option value="">Month</option>
        
                                     <option value="Jan">Jan</option>
                                    <option value="Feb">Feb</option>
                                    <option value="Mar">Mar</option>
                                    <option value="Apr">Apr</option>
                                    <option value="May">May</option>
                                    <option value="Jun">Jun</option>
                                    <option value="Jul">Jul</option>
                                    <option value="Aug">Aug</option>
                                    <option value="Sep">Sep</option>
                                    <option value="Oct">Oct</option>
                                    <option value="Nov">Nov</option>
                                    <option value="Dec">Dec</option>
    </select>
    <select
        value={edu.startYear}
        style={{border:"",borderRadius:"10px",padding:"3px"}}
        onChange={(e) => {
            const newEdu = [...resumeData.education];
            newEdu[index].startYear = e.target.value;
            setResumeData({ ...resumeData, education: newEdu });
        }}
    >
        <option value="">Year</option>
                                     {Array.from({ length: 50 }, (_, i) => {
                                        const yearplus5 = new Date().getFullYear() + 5;
                                        const year = yearplus5 - i;
                                        return <option key={year} value={year}>{year}</option>;
                                    })}
    </select>
</div>
<div className="mb-2">
    <label>End Date:</label>
    <br></br>
    <select
         className="me-2"
        value={edu.endMonth}
        style={{border:"",borderRadius:"10px",padding:"3px"}}
        onChange={(e) => {
            const newEdu = [...resumeData.education];
            newEdu[index].endMonth = e.target.value;
            setResumeData({ ...resumeData, education: newEdu });
        }}
    >
        <option value="">Month</option>
        <option value="Present">Present</option>
        <option value="Jan">Jan</option>
                                    <option value="Feb">Feb</option>
                                    <option value="Mar">Mar</option>
                                    <option value="Apr">Apr</option>
                                    <option value="May">May</option>
                                    <option value="Jun">Jun</option>
                                    <option value="Jul">Jul</option>
                                    <option value="Aug">Aug</option>
                                    <option value="Sep">Sep</option>
                                    <option value="Oct">Oct</option>
                                    <option value="Nov">Nov</option>
                                    <option value="Dec">Dec</option>
    </select>
    <select
        value={edu.endYear}
        style={{border:"",borderRadius:"10px",padding:"3px"}}
        onChange={(e) => {
            const newEdu = [...resumeData.education];
            newEdu[index].endYear = e.target.value;
            setResumeData({ ...resumeData, education: newEdu });
        }}
    >
        <option value="">Year</option>
                                    {Array.from({ length: 50 }, (_, i) => {
                                        const yearplus5 = new Date().getFullYear() + 5;
                                        const year = yearplus5 - i;
                                        return <option key={year} value={year}>{year}</option>;
                                    })}
    </select>
</div>

                            <input
                                type="text"
                                className="form-control mb-2"
                                placeholder="Degree"
                                value={edu.degree}
                                onChange={(e) => {
                                    const newEdu = [...resumeData.education];
                                    newEdu[index].degree = e.target.value;
                                    setResumeData({ ...resumeData, education: newEdu });
                                }}
                            />
                            <input
                                type="text"
                                className="form-control mb-2"
                                placeholder="Location"
                                value={edu.location}
                                onChange={(e) => {
                                    const newEdu = [...resumeData.education];
                                    newEdu[index].location = e.target.value;
                                    setResumeData({ ...resumeData, education: newEdu });
                                }}
                            />
                            <textarea
                                className="form-control mb-2"
                                placeholder="Description"
                                value={edu.description.join('\n')}
                                onChange={(e) => {
                                    const newEdu = [...resumeData.education];
                                    newEdu[index].description = e.target.value.split('\n');
                                    setResumeData({ ...resumeData, education: newEdu });
                                }}
                            />
                            <button className="btn btn-danger btn-sm" onClick={() => deleteEducation(index)}>Delete</button>
                        </div>
                    ))}
                    <button className="btn btn-dark mb-3" onClick={addEducation}>Add Education</button>

                    <h2 className="card-title">Skills</h2>
                    {resumeData.skills.map((skill, index) => (
                        <div className="form-group mb-3" key={index}>
                            <input
                                type="text"
                                className="form-control mb-2"
                                placeholder="Skill"
                                value={skill}
                                onChange={(e) => {
                                    const newSkills = [...resumeData.skills];
                                    newSkills[index] = e.target.value;
                                    setResumeData({ ...resumeData, skills: newSkills });
                                }}
                            />
                            <button className="btn btn-danger btn-sm" onClick={() => deleteSkill(index)}>Delete</button>
                        </div>
                    ))}
                    <button className="btn btn-dark mb-3" onClick={addSkill}>Add Skill</button>

                    <h2 className="card-title">Interests</h2>
                    {resumeData.interests.map((interest, index) => (
                        <div className="form-group mb-3" key={index}>
                            <input
                                type="text"
                                className="form-control mb-2"
                                placeholder="Interest"
                                value={interest}
                                onChange={(e) => {
                                    const newInterests = [...resumeData.interests];
                                    newInterests[index] = e.target.value;
                                    setResumeData({ ...resumeData, interests: newInterests });
                                }}
                            />
                            <button className="btn btn-danger btn-sm" onClick={() => deleteInterest(index)}>Delete</button>
                        </div>
                    ))}
                    <button className="btn btn-dark" onClick={addInterest}>Add Interest</button>
                    
                </div>
            </div>
        </div>
        </>
        
    );
};

export default ResumeInput;
