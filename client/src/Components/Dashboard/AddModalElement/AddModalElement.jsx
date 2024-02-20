import React, { useState, forwardRef } from 'react';
import StylesAddModalElement from './AddModalElement.module.css';
import ModalTaskList from '../ModalTaskList/ModalTaskList';
import { useDispatch } from 'react-redux';
import { closeModal1 } from '../../../Redux/slice';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { Url } from '../../../Utils/Url';

const AddModalElement = () => {
    const baseUrl = Url();
    const [taskList, setTaskList] = useState([]);
    const [selectedPriority, setSelectedPriority] = useState(null); // State to store selected priority
    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState(null);

    const uId = localStorage.getItem('id');
    const myBoard = 'done';

    const handleCloseModal = () => {
        dispatch(closeModal1());
    };

    const handleAddTask = () => {
        // Add a new task to the task list
        setTaskList([...taskList, <ModalTaskList key={taskList.length} />]);
    };

    const handleDeleteTask = (index) => {
        // Remove the task at the specified index from the task list
        setTaskList(taskList.filter((_, i) => i !== index));
    };

    const handlePriorityClick = (priority) => {
        // Set the selected priority when a button is clicked
        setSelectedPriority(priority);
    };

    const DateInput = forwardRef(({ value, onClick }, ref) => (
        <button
            className={StylesAddModalElement.button1}
            onClick={onClick}
            ref={ref}
        >
            {value || "Select Due Date"} {/* Display placeholder if value is empty */}
        </button>
    ));

    const handleSave = () => {
        const title = document.getElementById('taskTitle').value;
        const priority = selectedPriority; // Use the selected priority from state
        const checklist = taskList.map(task => ({ taskName: task.props.children }));
        const dueDate = startDate;
        const userId= uId;
        const board = myBoard;
        // Make a POST request to the backend server
        axios.post(`${baseUrl}/api/addtask`, { title, priority, checklist, dueDate, board, userId})
            .then(response => {
                console.log('Task added successfully:', response.data);
                // Optionally, you can perform any additional actions after successful save
            })
            .catch(error => {
                console.error('Error adding task:', error);
                // Handle error
            });
    };

    return (
        <>
            <div className={StylesAddModalElement.addModalElement}>
                <div className={StylesAddModalElement.title}>Title<span className={StylesAddModalElement.asterisk}> *</span></div>
                <div>
                    <input id="taskTitle" type='text' className={StylesAddModalElement.inputTitle} placeholder='Enter Task Title' />
                </div>
                <br />
                <div style={{ display: 'flex'}}>
                    <span>Select Priority<span className={StylesAddModalElement.asterisk}>*</span></span>
                    <div className={StylesAddModalElement.priorityOptions}>
                        <button value="HIGH PRIORITY" className={StylesAddModalElement.addPriority} onClick={() => handlePriorityClick("HIGH PRIORITY")}><img src='Assets/high.svg' alt='addPriority' />&nbsp;&nbsp;HIGH PRIORITY</button>
                        <button value="MODERATE PRIORITY" className={StylesAddModalElement.addPriority} onClick={() => handlePriorityClick("MODERATE PRIORITY")}><img src='Assets/moderate.svg' alt='addPriority' />&nbsp;&nbsp;MODERATE PRIORITY</button>
                        <button value="LOW PRIORITY" className={StylesAddModalElement.addPriority} onClick={() => handlePriorityClick("LOW PRIORITY")}><img src='Assets/low.svg' alt='addPriority' />&nbsp;&nbsp;LOW PRIORITY</button>
                    </div>
                </div>
                <div>
                    <br />
                    <span>Checklist (1/3)<span className={StylesAddModalElement.asterisk}>*</span></span>
                </div>
                <div className={StylesAddModalElement.checklist}>
                    <ModalTaskList />
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
        </>
    );
};

export default AddModalElement;
