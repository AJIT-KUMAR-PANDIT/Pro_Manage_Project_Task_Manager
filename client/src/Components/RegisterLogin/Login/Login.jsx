import React, { useState } from 'react';
import StylesLogin from './Login.module.css'; // Import CSS file for styling
import passEye from '../../../Assets/passEye.svg'; // Import password visibility icon

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));

        let errorMessage = '';
        if (name === 'email') {
            errorMessage = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Invalid email address';
        } else if (name === 'password') {
            errorMessage = value.length < 8 ? 'Password must be at least 8 characters long' : '';
        }

        setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
    };

    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);

        // Add your login logic here
        console.log('Form submitted:', formData);
    };

    return (
        <div className={StylesLogin.login}>
            <h2 className={StylesLogin.loginTitle}>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        className={StylesLogin.inputEmail}
                        type="email"
                        name="email"
                        placeholder="         Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {formSubmitted && <span className={StylesLogin.error}>{errors.email}</span>}
                </div>
                <br />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', flexWrap: 'nowrap' }}>
                    <input
                        className={StylesLogin.inputPassword}
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="         Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <img
                        src={showPassword ? passEye : passEye}
                        alt={showPassword ? 'Hide Password' : 'Show Password'}
                        className={StylesLogin.passwordIcon}
                        onClick={handleTogglePassword}
                        style={{ position: 'relative', left: '-40px' }}
                    />
                    {formSubmitted && <span className={StylesLogin.error}>{errors.password}</span>}
                </div>
                <br />
                <button type="submit" className={StylesLogin.loginButton}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
