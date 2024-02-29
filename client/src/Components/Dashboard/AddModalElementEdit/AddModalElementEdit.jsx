import React, { useState, forwardRef, useEffect } from 'react';
import StylesAddModalElementEdit from './AddModalElementEdit.module.css';
import ModalTaskListEdit from '../ModalTaskListEdit/ModalTaskListEdit';
import { useDispatch } from 'react-redux';
import { closeModal2, toggleLoader } from '../../../Redux/slice';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { Url } from '../../../Utils/Url';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddModalElementEdit = ({ taskId }) => {
    const baseUrl = Url();
    const [selectedPriority, setSelectedPriority] = useState(null);
    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState(null);
    const uId = localStorage.getItem('id');
    const myBoard = 'toDo';
    const [checklists, setChecklists] = useState([]);
    const [taskTitle, setTaskTitle] = useState(''); // Added state for task title

    useEffect(() => {
        fetchTaskData();
    }, []);

    const fetchTaskData = () => {
        axios.get(`${baseUrl}/api/edittasksshow/${taskId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                const task = response.data.tasks[0];
                setSelectedPriority(task.priority);
                setStartDate(task.dueDate ? task.dueDate : null);
                setChecklists(task.checklist);
                setTaskTitle(task.title);

                console.log("task.checklist======", task.checklist);
            })
            .catch(error => {
                console.error('Error fetching task data:', error);
                toast.error('Error fetching task data');
            });
    };

    const handleCloseModal = () => {
        dispatch(toggleLoader());
        dispatch(closeModal2());
    };

    const handlePriorityClick = (priority) => {
        setSelectedPriority(priority);
    };

    const handleTaskCheck = (id, completed) => {
        const updatedChecklists = checklists.map((checklist) => {
            if (checklist._id === id) {
                return { ...checklist, completed: completed };
            }
            return checklist;
        });
        setChecklists(updatedChecklists);
    };

    const handleTaskDelete = (id) => {
        const filteredChecklists = checklists.filter((checklist) => checklist._id !== id);
        setChecklists(filteredChecklists);
    };

    const handleSave = () => {
        const priority = selectedPriority;
        const dueDate = startDate ? startDate.toISOString().split('T')[0] : null; // Format date as "YYYY-MM-DD"
        const userId = uId;
        const board = myBoard;

        // Filter out empty tasks from the checklist
        const nonEmptyChecklist = checklists.filter(item => item.taskName.trim() !== '');

        // Check if there are any non-empty tasks
        if (nonEmptyChecklist.length === 0) {
            toast.error('No tasks to save.');
            return; // Don't proceed if there are no tasks to save
        }

        const checklist = nonEmptyChecklist.map(item => ({
            taskName: item.taskName,
            completed: item.completed
        }));

        const data = {
            title: taskTitle,
            priority,
            checklist,
            dueDate,
            userId,
            board
        };

        axios.put(`${baseUrl}/api/updatetask/${taskId}`, data, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                toast.success(response.data.message);
                handleCloseModal();
            })
            .catch(error => {
                console.error('Error updating task:', error);
                toast.error(error);
            });
    };

    const DateInput = forwardRef(({ value, onClick }, ref) => (
        <button
            className={StylesAddModalElementEdit.button1}
            onClick={onClick}
            ref={ref}
        >
            {value || "Select Due Date"}
        </button>
    ));

    let checkMarkMe = 0;

    return (
        <>
            <div className={StylesAddModalElementEdit.AddModalElementEdit}>
                <div className={StylesAddModalElementEdit.title}>Title<span className={StylesAddModalElementEdit.asterisk}> *</span></div>
                <div>
                    <input
                        id="taskTitle"
                        type='text'
                        className={StylesAddModalElementEdit.inputTitle}
                        placeholder='Enter Task Title'
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)} // Updating taskTitle state onChange
                    />
                </div>
                <br />
                <div style={{ display: 'flex' }}>
                    <span>Select Priority<span className={StylesAddModalElementEdit.asterisk}>*</span></span>
                    <div className={StylesAddModalElementEdit.priorityOptions}>
                        <button
                            value="HIGH PRIORITY"
                            className={selectedPriority === "HIGH PRIORITY" ? StylesAddModalElementEdit.addPriorityColor : StylesAddModalElementEdit.addPriority}
                            onClick={() => handlePriorityClick("HIGH PRIORITY")}
                        >
                            <img src='Assets/high.svg' alt='addPriority' />&nbsp;&nbsp;HIGH PRIORITY
                        </button>
                        <button
                            value="MODERATE PRIORITY"
                            className={selectedPriority === "MODERATE PRIORITY" ? StylesAddModalElementEdit.addPriorityColor : StylesAddModalElementEdit.addPriority}
                            onClick={() => handlePriorityClick("MODERATE PRIORITY")}
                        >
                            <img src='Assets/moderate.svg' alt='addPriority' />&nbsp;&nbsp;MODERATE PRIORITY
                        </button>
                        <button
                            value="LOW PRIORITY"
                            className={selectedPriority === "LOW PRIORITY" ? StylesAddModalElementEdit.addPriorityColor : StylesAddModalElementEdit.addPriority}
                            onClick={() => handlePriorityClick("LOW PRIORITY")}
                        >
                            <img src='Assets/low.svg' alt='addPriority' />&nbsp;&nbsp;LOW PRIORITY
                        </button>
                    </div>
                </div>
                <div>
                    <br />
                    <span>Checklist ({checklists.map((checklist) => {
                        if (checklist.completed === true) {
                            checkMarkMe = checkMarkMe + 1;
                        }
                    })
                    }
                        {checkMarkMe}
                        /{checklists.length})<span className={StylesAddModalElementEdit.asterisk}>*</span></span>
                    {console.log("checklists]]]]]]]]]]", checklists)}
                </div>
                <div className={StylesAddModalElementEdit.checklist}>
                    <ModalTaskListEdit
                        checklists={checklists}
                        setChecklists={setChecklists}
                        onTaskCheck={handleTaskCheck}
                        onTaskDelete={handleTaskDelete}
                    />
                </div>
                <br />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignContent: 'center', alignItems: 'center' }}>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            customInput={<DateInput />}
                            placeholderText='Select Due Date'
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '21px' }}>
                        <button className={StylesAddModalElementEdit.cancel} onClick={() => handleCloseModal()}>Cancel</button>
                        <button className={StylesAddModalElementEdit.save} onClick={handleSave}>Save</button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default AddModalElementEdit;
