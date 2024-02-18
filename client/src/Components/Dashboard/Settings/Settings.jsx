import React, { useState } from 'react';
import StylesSettings from './Settings.module.css';

const Settings = () => {
    const [formData, setFormData] = useState({
        name: '',
        oldPassword: '',
        newPassword: ''
    });

    const [errors, setErrors] = useState({
        newPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));

        if (name === 'newPassword' && value.length < 8) {
            setErrors(prevErrors => ({ ...prevErrors, newPassword: 'Password must be at least 8 characters long' }));
        } else {
            setErrors(prevErrors => ({ ...prevErrors, newPassword: '' }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);
    };

    return (
        <div className={StylesSettings.settings}>
            <div className={StylesSettings.header}>Settings</div>
            <form onSubmit={handleSubmit} className={StylesSettings.form}>
                <div>
                    <label htmlFor="name">
                        <i className="fa fa-user" aria-hidden="true"></i>
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Name"
                        onChange={handleChange}
                        value={formData.name}
                    />
                </div>
                <div>
                    <label htmlFor="oldPassword">
                        <i className="fa fa-lock" aria-hidden="true"></i>
                    </label>
                    <input
                        type="password"
                        id="oldPassword"
                        name="oldPassword"
                        placeholder="Old Password"
                        onChange={handleChange}
                        value={formData.oldPassword}
                    />
                </div>
                <div>
                    <label htmlFor="newPassword">
                        <i className="fa fa-lock" aria-hidden="true"></i>
                    </label>
                    <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        placeholder="New Password"
                        onChange={handleChange}
                        value={formData.newPassword}
                    />
                    <br/>
                    {errors.newPassword && <span className={StylesSettings.error}>{errors.newPassword}</span>}
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default Settings;
