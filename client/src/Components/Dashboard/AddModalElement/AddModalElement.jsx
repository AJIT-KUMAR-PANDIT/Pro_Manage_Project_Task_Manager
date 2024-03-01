import React, { useState, forwardRef } from 'react';
import StylesAddModalElement from './AddModalElement.module.css';
import ModalTaskList from '../ModalTaskList/ModalTaskList';
import { useDispatch } from 'react-redux';
import { closeModal1, toggleLoader } from '../../../Redux/slice';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { Url } from '../../../Utils/Url';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddModalElement = () => {
    const baseUrl = Url();
    const [selectedPriority, setSelectedPriority] = useState(null);
    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState(null);
    const uId = localStorage.getItem('id');
    const myBoard = 'toDo';
    const [checklists, setChecklists] = useState([]);


    const handleCloseModal = () => {
        // dispatch(toggleLoader());
        dispatch(closeModal1());
    };

    const handlePriorityClick = (priority) => {
        setSelectedPriority(priority);
    };

    const handleTaskCheck = (taskId, completed) => {
        // Handle task checkbox click
        console.log('Task checkbox clicked - Task ID:', taskId, 'Completed:', completed);
    };

    const handleTaskDelete = (taskId) => {
        // Handle task delete button click
        console.log('Task delete button clicked - Task ID:', taskId);
    };

    const handleSave = () => {
        const title = document.getElementById('taskTitle').value;
        const priority = selectedPriority;
        const dueDate = startDate ? startDate : null; 
        const userId = uId;
        const board = myBoard;

        // Filter out empty tasks from the checklist
        const nonEmptyChecklist = checklists.filter(item => item.inputValue.trim() !== '');

        // Check if there are any non-empty tasks
        if (nonEmptyChecklist.length === 0) {
            console.log('No tasks to save.');
            toast.error('No tasks to save.');
            return; // Don't proceed if there are no tasks to save
        }

        const checklist = nonEmptyChecklist.map(item => ({
            taskName: item.inputValue,
            completed: item.isChecked
        }));

        const data = {
            title,
            priority,
            checklist,
            dueDate,
            userId,
            board
        };

        console.log(data);
        const token = localStorage.getItem('token');
        axios.post(`${baseUrl}/api/addtask`, data,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(response => {
                console.log('Task added successfully:', response.data);
                toast.success(response.data.message);
                handleCloseModal();
                window.location.reload();
            })
            .catch(error => {
                console.error('Error adding task:', error);
                toast.error(error);
            });
    };

    const DateInput = forwardRef(({ value, onClick }, ref) => (
        <button
            className={StylesAddModalElement.button1}
            onClick={onClick}
            ref={ref}
        >
            {value || "Select Due Date"}
        </button>
    ));

    let checkMarkMe = 0;

    return (
        <>
            <div className={StylesAddModalElement.addModalElement}>
                <div className={StylesAddModalElement.title}>Title<span className={StylesAddModalElement.asterisk}> *</span></div>
                <div>
                    <input id="taskTitle" type='text' className={StylesAddModalElement.inputTitle} placeholder='Enter Task Title' />
                </div>
                <br />
                <div style={{ display: 'flex' }}>
                    <span>Select Priority<span className={StylesAddModalElement.asterisk}>*</span></span>
                    <div className={StylesAddModalElement.priorityOptions}>
                        <button value="HIGH PRIORITY" className={selectedPriority === "HIGH PRIORITY" ? StylesAddModalElement.addPriorityColor : StylesAddModalElement.addPriority} onClick={() => handlePriorityClick("HIGH PRIORITY")}><img src='Assets/high.svg' alt='addPriority' />&nbsp;&nbsp;HIGH PRIORITY</button>
                        <button value="MODERATE PRIORITY" className={selectedPriority === "MODERATE PRIORITY" ? StylesAddModalElement.addPriorityColor : StylesAddModalElement.addPriority} onClick={() => handlePriorityClick("MODERATE PRIORITY")}><img src='Assets/moderate.svg' alt='addPriority' />&nbsp;&nbsp;MODERATE PRIORITY</button>
                        <button value="LOW PRIORITY" className={selectedPriority === "LOW PRIORITY" ? StylesAddModalElement.addPriorityColor : StylesAddModalElement.addPriority} onClick={() => handlePriorityClick("LOW PRIORITY")}><img src='Assets/low.svg' alt='addPriority' />&nbsp;&nbsp;LOW PRIORITY</button>
                    </div>
                </div>
                <div>
                    <br />
                    <span>Checklist ({checklists.map((checklist) => {
                        if (checklist.isChecked === true) {
                            checkMarkMe = checkMarkMe + 1;
                        }
                    })
                    }
                        {checkMarkMe}
                        /{checklists.length})<span className={StylesAddModalElement.asterisk}>*</span></span>
                    {console.log("checklists>>>>>>>>>>.", checklists)}
                </div>
                <div className={StylesAddModalElement.checklist}>
                    <ModalTaskList checklists={checklists} setChecklists={setChecklists} onTaskCheck={handleTaskCheck} onTaskDelete={handleTaskDelete} />
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
                        <button className={StylesAddModalElement.cancel} onClick={() => handleCloseModal()}>Cancel</button>
                        <button className={StylesAddModalElement.save} onClick={handleSave}>Save</button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default AddModalElement;
