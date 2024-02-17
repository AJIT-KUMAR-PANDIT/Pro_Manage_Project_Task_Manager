import React, { useState } from 'react';
import StylesDashboard from './Dashboard.module.css';
import Board from '../../Components/Dashboard/Board/Board';

const Dashboard = () => {
    const [activeItem, setActiveItem] = useState('Board');

    const handleItemClick = (alt) => {
        setActiveItem(alt);
    };

    return (
        <>
            <div className={StylesDashboard.dashboard}>
                {/* ?side navBar start+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
                <div className={StylesDashboard.sideNavBar}>
                    <br/>
                    <div className={StylesDashboard.logo}>
                        <img src='Assets/logo.svg' alt='Pro Manage Logo' style={{ width: '21%' }} />Pro Manage
                    </div>
                    <br/><br/>
                    <div className={activeItem === 'Board' ? StylesDashboard.activeItem : StylesDashboard.inactiveItem} onClick={() => handleItemClick('Board')}>
                        <img src='Assets/board.svg' alt='Board' style={{ width: '21%' }} />Board &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                    <br/>
                    <div className={activeItem === 'Analytics' ? StylesDashboard.activeItem : StylesDashboard.inactiveItem} onClick={() => handleItemClick('Analytics')}>
                        <img src='Assets/analytics.svg' alt='Analytics' style={{ width: '21%' }} />Analytics&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                    <br/>
                    <div className={activeItem === 'Settings' ? StylesDashboard.activeItem : StylesDashboard.inactiveItem} onClick={() => handleItemClick('Settings')}>
                        <img src='Assets/settings.svg' alt='Settings' style={{ width: '21%' }} />Settings&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                    <div className={activeItem === 'Logout' ? StylesDashboard.activeItem : StylesDashboard.inactiveItem} onClick={() => handleItemClick('Logout')} style={{ position: 'relative', bottom: '-45vh' }}>
                        <img src='Assets/Logout.svg' alt='Logout' style={{ width: '21%' }} /><span style={{ color: '#cf3636' }}>Logout</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                </div>
                {/* ?side navBar ends+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
                <div>
                    <Board />
                </div>
            </div>
        </>
    );
};

export default Dashboard;
