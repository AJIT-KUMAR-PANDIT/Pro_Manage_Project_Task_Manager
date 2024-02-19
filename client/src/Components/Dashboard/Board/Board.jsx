import React, { useState } from 'react';
import StylesBoard from './Board.module.css';
import Card from '../Card/Card';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import AddModalElement from '../AddModalElement/AddModalElement';

const Board = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = (item) => {
        console.log(`Selected item: ${item}`);
        toggleMenu();
    };

    // ?modal start

    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    //modal end


    return (
        <>
            <div>
                <br />
                <div className={StylesBoard.header} >
                    <div className={StylesBoard.headerTitle}>Welcome! Kumar</div>
                    <div className={StylesBoard.headerDate}>12th Jan, 2024</div>
                </div>
                <div className={StylesBoard.header}>
                    <div className={StylesBoard.headerTitle2}>Board</div>
                    <div className={StylesBoard.headerMenu}>
                        <div className={StylesBoard.dropdown}>
                            <button className="dropdown-toggle" onClick={toggleMenu}>
                                Today
                            </button>
                            {isOpen && (
                                <div className="dropdown-menu" onClick={toggleMenu}>
                                    <button className="dropdown-item" onClick={() => handleItemClick('Item 1')}>
                                        Item 1
                                    </button>
                                    <button className="dropdown-item" onClick={() => handleItemClick('Item 2')}>
                                        Item 2
                                    </button>
                                    <button className="dropdown-item" onClick={() => handleItemClick('Item 3')}>
                                        Item 3
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <br />
                <div>
                    <div className={`${StylesBoard.boardCards} ${StylesBoard.scroll}`} style={{ position: 'relative', left: '261px' }}>
                        <div className={StylesBoard.boardCards_background}>
                            <br />
                            <div className={StylesBoard.boardCards_backgroundTitle} style={{ position: 'relative', left: '-111px' }}>Backlog<img src='Assets/collaspe.svg' alt='3dot' style={{ position: 'relative', right: '-231px' }} /></div>
                            <br />
                            <Card />
                        </div>
                        <div className={StylesBoard.boardCards_background}>
                            <br />
                            <div className={StylesBoard.boardCards_backgroundTitle} style={{ position: 'relative', left: '-111px' }}>To do<img src='Assets/add.svg' alt='add' style={{ position: 'relative', right: '-211px' }} onClick={onOpenModal} /><img src='Assets/collaspe.svg' alt='3dot' style={{ position: 'relative', right: '-231px' }} /></div>
                            <br />
                            <Card />
                        </div>
                        <div className={StylesBoard.boardCards_background}>
                            <br />
                            <div className={StylesBoard.boardCards_backgroundTitle} style={{ position: 'relative', left: '-100px' }}>In progress<img src='Assets/collaspe.svg' alt='3dot' style={{ position: 'relative', right: '-200px' }} /></div>
                            <br />
                            <Card />
                        </div>
                        <div className={StylesBoard.boardCards_background}>
                            <br />
                            <div className={StylesBoard.boardCards_backgroundTitle} style={{ position: 'relative', left: '-111px' }}>Done<img src='Assets/collaspe.svg' alt='3dot' style={{ position: 'relative', right: '-231px' }} /></div>
                            <br />
                            <Card />
                        </div>
                    </div>
                </div>
            </div>


            {/* ?modal start++++++++++++++++++++++++++++++++ */}
            <Modal open={open} onClose={onCloseModal} center showCloseIcon={false}
                classNames={{
                    modal: `${StylesBoard.customModal}`,
                }}
            >
                <AddModalElement />
            </Modal>

            {/* modal end+++++++++++++++++++++++++++++++++++ */}
        </>
    );
};

export default Board;
