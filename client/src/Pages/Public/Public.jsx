import React from 'react'
import StylePublic from './Public.module.css';
import PublicTaskList from '../../Components/Public/PublicTaskList/PublicTaskList';

const Public = () => {
    return (
        <>
            <div className={StylePublic.public}>
                <div className={StylePublic.logo}>
                    <img src='Assets/logo.svg' alt='logo' style={{ width: '51px' }} />&nbsp;&nbsp;&nbsp;Pro Manage
                </div>
                <br />
                <div className={StylePublic.cards}>
                    <div className={StylePublic.priorityText}>
                        <img src='Assets/high.svg' alt='high' />&nbsp;&nbsp;HIGH PRIORITY
                    </div>
                    <br />
                    <div className={StylePublic.cardTitle}>
                        Hero section
                    </div>
                    <br /><br />
                    <div className={StylePublic.checklist}>
                        Checklist (1/3)
                    </div>
                    <br />
                    <div className={StylePublic.taskList}>
                        <PublicTaskList />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Public;