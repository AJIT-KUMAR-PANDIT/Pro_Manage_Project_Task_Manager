import React, { useState, forwardRef, useEffect } from 'react';
import StylesAddModalElementEdit from './AddModalElementEdit.module.css';
import ModalTaskEditList from '../ModalTaskEditList/ModalTaskEditList';
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
    const [selectedOption, setSelectedOption] = useState('thisWeek');
    
    // Function to fetch tasks for the given user ID and board date
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
    const [taskData, setTaskData] = useState({
        title: '',
        priority: null,
        checklist: [],
        dueDate: null
    });

    useEffect(() => {
        const userId = localStorage.getItem('id');
        const fetchData = async () => {
            try {
                const tasks = await fetchTasksToDo(userId, selectedOption);
                setTasksToDo(tasks);
                // Fetch task data for the given taskId and set it to state
                const task = tasks.find(task => task._id === taskId);
                if (task) {
                    setTaskData({
                        title: task.title,
                        priority: task.priority,
                        checklist: task.checklist,
                        dueDate: task.dueDate ? new Date(task.dueDate) : null
                    });
                }
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchData();
    }, [taskId, selectedOption]);

    const [selectedPriority, setSelectedPriority] = useState(null);
    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState(null);
    const uId = localStorage.getItem('id');
    const myBoard = 'toDo';
    const [checklists, setChecklists] = useState([]);

    useEffect(() => {
        // Prefill priority when task data is loaded
        if (taskData.priority) {
            setSelectedPriority(taskData.priority);
        }

        // Prefill checklist when task data is loaded
        if (taskData.checklist) {
            setChecklists(taskData.checklist.map(item => ({
                inputValue: item.taskName,
                isChecked: item.completed
            })));
        }

        // Prefill due date when task data is loaded
        if (taskData.dueDate) {
            setStartDate(new Date(taskData.dueDate));
        }
    }, [taskData]);

    const handleCloseModal = () => {
        dispatch(closeModal2());
        dispatch(toggleLoader());
    };

    const handlePriorityClick = (priority) => {
        setSelectedPriority(priority);
    };

    const handleTaskCheck = (index, completed) => {
        // Handle task checkbox click
        const updatedChecklist = [...checklists];
        updatedChecklist[index].isChecked = completed;
        setChecklists(updatedChecklist);
    };

    const handleTaskDelete = (index) => {
        // Handle task delete button click
        const updatedChecklist = [...checklists];
        updatedChecklist.splice(index, 1);
        setChecklists(updatedChecklist);
    };

    const handleTitleChange = (value) => {
        setTaskData({
            ...taskData,
            title: value
        });
    };

    const updateTask = async (taskId, updatedTaskData) => {
        try {
            const response = await axios.put(`${baseUrl}/api/edittaskshow/${taskId}`, updatedTaskData);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.error || 'Error updating task');
        }
    };

    const handleSave = () => {
        const title = taskData.title;
        const priority = selectedPriority;
        const dueDate = startDate ? startDate.toISOString().split('T')[0] : null; // Format date as "YYYY-MM-DD"
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

        axios.put(`${baseUrl}/api/updatetask/${taskId}`, data)
            .then(response => {
                console.log('Task added successfully:', response.data);
                toast.success(response.data.message);
                handleCloseModal();
            })
            .catch(error => {
                console.error('Error adding task:', error);
                toast.error(error);
            });

        // Update existing task with new data
        updateTask(taskId, data)
            .then(response => {
                console.log('Task updated successfully:', response);
                toast.success('Task updated successfully');
                handleCloseModal();
            })
            .catch(error => {
                console.error('Error updating task:', error);
                toast.error('Error updating task');
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

    return (
        <>
            <div className={StylesAddModalElementEdit.AddModalElementEdit}>
                <div className={StylesAddModalElementEdit.title}>Title<span className={StylesAddModalElementEdit.asterisk}> *</span></div>
                <div>
                    <input id="taskTitle" type='text' className={StylesAddModalElementEdit.inputTitle} placeholder='Enter Task Title' value={taskData.title} onChange={(e) => handleTitleChange(e.target.value)} />
                </div>
                <br />
                <div style={{ display: 'flex' }}>
                    <span>Select Priority<span className={StylesAddModalElementEdit.asterisk}>*</span></span>
                    <div className={StylesAddModalElementEdit.priorityOptions}>
                        <button value="HIGH PRIORITY" className={StylesAddModalElementEdit.addPriority} onClick={() => handlePriorityClick("HIGH PRIORITY")}><img src='Assets/high.svg' alt='addPriority' />&nbsp;&nbsp;HIGH PRIORITY</button>
                        <button value="MODERATE PRIORITY" className={StylesAddModalElementEdit.addPriority} onClick={() => handlePriorityClick("MODERATE PRIORITY")}><img src='Assets/moderate.svg' alt='addPriority' />&nbsp;&nbsp;MODERATE PRIORITY</button>
                        <button value="LOW PRIORITY" className={StylesAddModalElementEdit.addPriority} onClick={() => handlePriorityClick("LOW PRIORITY")}><img src='Assets/low.svg' alt='addPriority' />&nbsp;&nbsp;LOW PRIORITY</button>
                    </div>
                </div>
                <div>
                    <br />
                    <span>Checklist (1/3)<span className={StylesAddModalElementEdit.asterisk}>*</span></span>
                </div>
                <div className={StylesAddModalElementEdit.checklist}>
                    <ModalTaskEditList checklists={checklists} setChecklists={setChecklists} onTaskCheck={handleTaskCheck} onTaskDelete={handleTaskDelete} />
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
