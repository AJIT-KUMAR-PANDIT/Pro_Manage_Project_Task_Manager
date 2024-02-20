import React, { useState, forwardRef } from 'react';
import StylesAddModalElement from './AddModalElement.module.css'
import ModalTaskList from '../ModalTaskList/ModalTaskList';
import { useDispatch } from 'react-redux'
import { closeModal1 } from '../../../Redux/slice'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import {Url} from '../../../Utils/Url';


const AddModalElement = () => {

    const baseUrl = Url();

    const [taskList, setTaskList] = useState([])

    const dispatch = useDispatch();
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



    // due datepicker start

    
    const [startDate, setStartDate] = useState(null);

    const DateInput = forwardRef(({ value, onClick }, ref) => (
      <button
      className={StylesAddModalElement.button1}
        onClick={onClick}
        ref={ref}
      >
        {value || "Select Due Date"} {/* Display placeholder if value is empty */}
      </button>
    ));
  

    // due datepicker end


    return (
        <>
            <div className={StylesAddModalElement.addModalElement}>
                <div className={StylesAddModalElement.title}>Title<span className={StylesAddModalElement.asterisk}> *</span></div>
                <div>
                    <input type='text' className={StylesAddModalElement.inputTitle} placeholder='Enter Task Title' />
                </div>
                <div>
                    <br />
                    <span>Select Priority
                        <span className={StylesAddModalElement.asterisk}>*</span></span><span className={StylesAddModalElement.addPriority}><img src='Assets/high.svg' alt='addPriority' />&nbsp;&nbsp;HIGH PRIORITY</span>
                    <span className={StylesAddModalElement.addPriority}><img src='Assets/moderate.svg' alt='addPriority' />&nbsp;&nbsp;MODERATE PRIORITY</span>
                    <span className={StylesAddModalElement.addPriority}><img src='Assets/low.svg' alt='addPriority' />&nbsp;&nbsp;LOW PRIORITY
                    </span>
                </div>
                <div>
                    <br />
                    <span>Checklist (1/3)
                        <span className={StylesAddModalElement.asterisk}>*</span>
                    </span>
                </div>
                <div className={StylesAddModalElement.checklist}>
                    <ModalTaskList />
                </div>
                <br />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignContent: 'center',alignItems: 'center' }}>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            customInput={<DateInput />}
                            placeholderText='Select Due Date'
                        />
                        {console.log(startDate)}
                    </div>
                    <div style={{ display: 'flex', gap: '21px' }}>
                        <button className={StylesAddModalElement.cancel} onClick={() => handleCloseModal()}>Cancel</button>
                        <button className={StylesAddModalElement.save}>Save</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddModalElement;