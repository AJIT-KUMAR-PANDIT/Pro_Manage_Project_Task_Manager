import React, { useState, useEffect } from 'react';
import StylesBoard from './Board.module.css';
import Card from '../Card/Card';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import AddModalElement from '../AddModalElement/AddModalElement';
import { useSelector, useDispatch } from 'react-redux'
import { closeModal1, openModal1 } from '../../../Redux/slice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Url } from '../../../Utils/Url'

const Board = () => {

    const baseUrl = Url();

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('thisWeek'); // Default selected option

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = (item) => {
        console.log(`Selected item: ${item}`);
        toggleMenu();
    };

    // ?modal start

    const isOpenModal = useSelector(state => state.modal.isOpen);

    const dispatch = useDispatch();

    const onOpenModal = () => dispatch(openModal1());
    const onCloseModal = () => dispatch(closeModal1());

    //modal end

    const fetchTasksToDo = async (userId, boardDate) => {
        try {
            const response = await axios.post(`${baseUrl}/api/gettasktodo`, { userId, boardDate });
            return response.data.tasksToDo;
        } catch (error) {
            console.error('Error fetching tasks:', error);
            return [];
        }
    };

    const [tasksToDo, setTasksToDo] = useState([]);

    useEffect(() => {
        const userId = localStorage.getItem('id');
        const fetchData = async () => {
            try {
                const tasks = await fetchTasksToDo(userId, selectedOption);
                setTasksToDo(tasks);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchData();
    }, [selectedOption], [],[200]);

    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
    };





    return (
        <>
            {console.log("Board", tasksToDo)}
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
                            <select className={StylesBoard.dropdown} onChange={handleSelectChange} value={selectedOption}>
                                <option value="thisWeek">This Week</option>
                                <option value="today">Today</option>
                                <option value="thisMonth">This Month</option>
                            </select>
                        </div>
                    </div>
                </div>
                <br />
                <div>
                    <div className={`${StylesBoard.boardCards} ${StylesBoard.scroll}`} style={{ position: 'relative', left: '261px' }}>
                        <div className={StylesBoard.boardCards_background}>
                            <br />
                            <div className={StylesBoard.boardCards_backgroundTitle} style={{ position: 'relative', left: '-111px' }}>Backlog<img src='Assets/collaspe.svg' alt='3dot' style={{ position: 'relative', right: '-231px' }} /></div>

                            {tasksToDo.map((taskBoard, index) => {
                                return ((taskBoard.board === "backlog") && <><br /> <Card key={index} priority={taskBoard.priority} title={taskBoard.title} checklist={taskBoard.checklist} myTaskId={taskBoard._id}/></>);
                            })}

                        </div>
                        <div className={StylesBoard.boardCards_background}>
                            <br />
                            <div className={StylesBoard.boardCards_backgroundTitle} style={{ position: 'relative', left: '-111px' }}>To do<img src='Assets/add.svg' alt='add' style={{ position: 'relative', right: '-211px' }} onClick={onOpenModal} /><img src='Assets/collaspe.svg' alt='3dot' style={{ position: 'relative', right: '-231px' }} /></div>

                            {tasksToDo.map((taskBoard, index) => {
                                return ((taskBoard.board === "toDo") && <><br /> <Card key={index} priority={taskBoard.priority} title={taskBoard.title} checklist={taskBoard.checklist} myTaskId={taskBoard._id}/></>);
                            })}
                        </div>
                        <div className={StylesBoard.boardCards_background}>
                            <br />
                            <div className={StylesBoard.boardCards_backgroundTitle} style={{ position: 'relative', left: '-100px' }}>In progress<img src='Assets/collaspe.svg' alt='3dot' style={{ position: 'relative', right: '-200px' }} /></div>

                            {tasksToDo.map((taskBoard, index) => {
                                return ((taskBoard.board === "inProgress") && <><br /> <Card key={index} priority={taskBoard.priority} title={taskBoard.title} checklist={taskBoard.checklist} myTaskId={taskBoard._id}/></>);
                            })}
                        </div>
                        <div className={StylesBoard.boardCards_background}>
                            <br />
                            <div className={StylesBoard.boardCards_backgroundTitle} style={{ position: 'relative', left: '-111px' }}>Done<img src='Assets/collaspe.svg' alt='3dot' style={{ position: 'relative', right: '-231px' }} /></div>

                            {tasksToDo.map((taskBoard, index) => {
                                return ((taskBoard.board === "done") && <><br /> <Card key={index} priority={taskBoard.priority} title={taskBoard.title} checklist={taskBoard.checklist} myTaskId={taskBoard._id}/></>);
                            })}
                        </div>
                    </div>
                </div>
            </div>


            {/* ?modal start++++++++++++++++++++++++++++++++ */}
            <Modal open={isOpenModal} onClose={onCloseModal} center showCloseIcon={false}
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
