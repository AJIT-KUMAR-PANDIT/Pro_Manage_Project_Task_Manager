import React, { useState } from 'react';
import StylesRegisterLogin from './RegisterLogin.module.css';
import LeftSideBar from '../../Components/RegisterLogin/LeftSideBar/LeftSideBar';
import Register from '../../Components/RegisterLogin/Register/Register';
import Login from '../../Components/RegisterLogin/Login/Login';

const RegisterLogin = () => {
    const [isRegisterVisible, setIsRegisterVisible] = useState(true);

    const handleToggleForm = () => {
        setIsRegisterVisible((prevIsRegisterVisible) => !prevIsRegisterVisible);
    };

    return (
        <>
            <div className={StylesRegisterLogin.registerLogin}>
                <div><LeftSideBar /></div>
                <div className={StylesRegisterLogin.form}>
                    {isRegisterVisible ? (
                        <>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', left: '1%' }}>
                                <Register />
                            </div>
                            <br />
                            <div className={StylesRegisterLogin.font_4}>Have an account?</div>
                            <br />
                            <button className={StylesRegisterLogin.loginBut} onClick={handleToggleForm}>Log in</button>
                        </>
                    ) : (
                        <>
                            <Login />
                            <br />
                            <div className={StylesRegisterLogin.font_4}>Have no account yet?</div>
                            <br />
                            <button className={StylesRegisterLogin.registerBut} onClick={handleToggleForm}>Register</button>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default RegisterLogin;
