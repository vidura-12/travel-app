import React, { useState } from 'react';
import axios from "axios";

const AddStudent = () => {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [errors, setErrors] = useState({});

    const validate = () => {
        const errors = {};
        if (!/^[a-zA-Z]+$/.test(name)) {
            errors.name = "Name should only contain characters.";
        }
        if (!/^\d+$/.test(age)) {
            errors.age = "Age should be a number.";
        }
        if (!["male", "female"].includes(gender.toLowerCase())) {
            errors.gender = "Gender should be either 'male' or 'female'.";
        }
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            const newStudent = {
                name,
                age,
                gender
            }

            axios.post("http://localhost:8080/student/add",newStudent).then( ()=>{
                alert("student added");
            }).catch(()=>{
                alert("error")
            })
            setErrors({});
            
            console.log({ name, age, gender });
        }
    };

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <div className="text-danger">{errors.name}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="age" className="form-label">Age</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="age" 
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                    {errors.age && <div className="text-danger">{errors.age}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="gender" className="form-label">Gender</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="gender" 
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    />
                    {errors.gender && <div className="text-danger">{errors.gender}</div>}
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default AddStudent;
