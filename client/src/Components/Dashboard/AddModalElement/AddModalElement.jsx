import React,{useState} from 'react';
import StylesAddModalElement from './AddModalElement.module.css'
import ModalTaskList from '../ModalTaskList/ModalTaskList';
import {useDispatch } from 'react-redux'
import { closeModal1 } from '../../../Redux/slice'

const AddModalElement = () => {

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
                <br/>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <button className={StylesAddModalElement.button1}>Select Due Date</button>
                    </div>
                    <div style={{ display: 'flex' , gap: '21px'}}>
                        <button className={StylesAddModalElement.cancel} onClick={() => handleCloseModal()}>Cancel</button>
                        <button className={StylesAddModalElement.save}>Save</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddModalElement;