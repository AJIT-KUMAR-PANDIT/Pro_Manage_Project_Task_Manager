import React, { useState } from 'react';
import StylesDashboard from './Dashboard.module.css';
import Board from '../../Components/Dashboard/Board/Board';
import Analytics from '../../Components/Dashboard/Analytics/Analytics';
import Settings from '../../Components/Dashboard/Settings/Settings';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const Dashboard = () => {
    const [activeItem, setActiveItem] = useState('Board');
    const [open, setOpen] = useState(false);

    const handleItemClick = (item) => {
        setActiveItem(item);
    };

    const toggleMenu = () => {
        switch (activeItem) {
            case 'Board':
                return <Board />;
            case 'Analytics':
                return <Analytics />;
            case 'Settings':
                return <Settings />;
            default:
                return null;
        }
    };

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    return (
        <>
            <div className={StylesDashboard.dashboard} style={{ width: '90vw' }}>
                {/* Sidebar Start */}
                <div className={StylesDashboard.sideNavBar} style={{ position: 'fixed' }}>
                    <br />
                    <div className={StylesDashboard.logo}>
                        <img src='Assets/logo.svg' alt='Pro Manage Logo' style={{ width: '21%' }} />Pro Manage
                    </div>
                    <br /><br />
                    <div className={activeItem === 'Board' ? StylesDashboard.activeItem : StylesDashboard.inactiveItem} onClick={() => handleItemClick('Board')}>
                        <img src='Assets/board.svg' alt='Board' style={{ width: '21%' }} />Board &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                    <br />
                    <div className={activeItem === 'Analytics' ? StylesDashboard.activeItem : StylesDashboard.inactiveItem} onClick={() => handleItemClick('Analytics')}>
                        <img src='Assets/analytics.svg' alt='Analytics' style={{ width: '21%' }} />Analytics&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                    <br />
                    <div className={activeItem === 'Settings' ? StylesDashboard.activeItem : StylesDashboard.inactiveItem} onClick={() => handleItemClick('Settings')}>
                        <img src='Assets/settings.svg' alt='Settings' style={{ width: '21%' }} />Settings&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                    <div className={activeItem === 'Logout' ? StylesDashboard.activeItem : StylesDashboard.inactiveItem} onClick={onOpenModal} style={{ position: 'relative', bottom: '-45vh' }}>
                        <img src='Assets/Logout.svg' alt='Logout' style={{ width: '21%' }} /><span style={{ color: '#cf3636' }}>Logout</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                </div>
                {/* Sidebar End */}
                <div>
                    {toggleMenu()}
                </div>
            </div>

            {/* Modal Start */}
            <Modal open={open} onClose={onCloseModal} center showCloseIcon={false} classNames={{ modal: `${StylesDashboard.customModal}` }}>
                <div>
                    <div className={StylesDashboard.logoutText}>Are you sure you want to Logout?</div>
                    <br/>
                    <div className={StylesDashboard.yesLogout}>Yes,  Logout</div>
                    <br/>
                    <div className={StylesDashboard.cancel} onClick={onCloseModal}>Cancel</div>
                </div>
            </Modal>
            {/* Modal End */}
        </>
    );
};

export default Dashboard;
