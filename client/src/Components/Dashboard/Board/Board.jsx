import React, { useState } from 'react';
import StylesBoard from './Board.module.css';
import Card from '../Card/Card';

const Board = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = (item) => {
        console.log(`Selected item: ${item}`);
        toggleMenu();
    };

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
                            <Card />
                        </div>
                        <div className={StylesBoard.boardCards_background}></div>
                        <div className={StylesBoard.boardCards_background}></div>
                        <div className={StylesBoard.boardCards_background}></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Board;
