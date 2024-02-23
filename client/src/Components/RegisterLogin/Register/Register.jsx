import React, { useState } from 'react';
import StylesRegister from './Register.module.css';
import passEye from '../../../Assets/passEye.svg';
import { Url } from '../../../Utils/Url';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { toggleLoader } from '../../../Redux/slice';


const Register = () => {

    const baseUrl = Url();

    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));

        let errorMessage = '';
        if (name === 'name') {
            errorMessage = value.trim() === '' ? 'Name is required' : '';
        } else if (name === 'email') {
            errorMessage = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Invalid email address';
        } else if (name === 'password') {
            errorMessage = value.length < 8 ? 'Password must be at least 8 characters long' : '';
        } else if (name === 'confirmPassword') {
            errorMessage = value !== formData.password ? 'Passwords do not match' : '';
        }

        setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
    };

    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleToggleConfirmPassword = () => {
        setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormSubmitted(true);

        // Validate all fields before submitting
        if (validateFormData()) {
            // registration logic here

            dispatch(toggleLoader());
            try {
                const response = await axios.post(`${baseUrl}/api/register`, formData);
                console.log(response.data);
                toast.success(response.data.message);
                dispatch(toggleLoader());
            } catch (error) {
                console.error(error.response.data);
                toast.error(error.response.data.message);
                dispatch(toggleLoader());
            }





            console.log('Form submitted:', formData);
        }
    };

    // Function to validate all form data fields
    const validateFormData = () => {
        let isValid = true;
        const newErrors = {};

        // Check name field
        if (formData.name.trim() === '') {
            newErrors.name = 'Name is required';
            isValid = false;
        }

        // Check email field
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email address';
            isValid = false;
        }

        // Check password field
        if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters long';
            isValid = false;
        }

        // Check confirmPassword field
        if (formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = 'Passwords do not match';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    return (
        <>


            <div className={StylesRegister.register}>
                <h2 className={StylesRegister.registerTitle}>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            className={StylesRegister.inputName}
                            type="text"
                            name="name"
                            placeholder="         Name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    {formSubmitted && <span className={StylesRegister.error}>{errors.name}</span>}
                    <br />
                    <div>
                        <input
                            className={StylesRegister.inputEmail}
                            type="email"
                            name="email"
                            placeholder="         Email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    {formSubmitted && <span className={StylesRegister.error}>{errors.email}</span>}
                    <br />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', flexWrap: 'nowrap' }}>
                        <input
                            className={StylesRegister.inputPassword}
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="         Password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <img
                            src={showPassword ? passEye : passEye}
                            alt={showPassword ? 'Hide Password' : 'Show Password'}
                            className={StylesRegister.passwordIcon}
                            onClick={handleTogglePassword}
                            style={{ position: 'relative', left: '-40px' }}
                        />

                    </div>
                    {formSubmitted && <span className={StylesRegister.error}>{errors.password}</span>}
                    <br />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', flexWrap: 'nowrap' }}>
                        <input
                            className={StylesRegister.inputPassword}
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            placeholder="         Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                        <img
                            src={showConfirmPassword ? passEye : passEye}
                            alt={showConfirmPassword ? 'Hide Confirm Password' : 'Show Confirm Password'}
                            className={StylesRegister.passwordIcon}
                            onClick={handleToggleConfirmPassword}
                            style={{ position: 'relative', left: '-40px' }}
                        />
                    </div>
                    {formSubmitted && <span className={StylesRegister.error}>{errors.confirmPassword}</span>}
                    <br />
                    <button type="submit" className={StylesRegister.registerButton}>
                        Register
                    </button>
                </form>

            </div>

            <ToastContainer />

        </>
    );
};

export default Register;
