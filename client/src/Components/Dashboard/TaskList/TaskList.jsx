import React, { useState } from 'react';
import StylesTaskList from './TaskList.module.css';

const TaskList = () => {
    const [inputValue, setInputValue] = useState('');
    const [isChecked, setIsChecked] = useState(false);
  
    const handleInputChange = (e) => {
      setInputValue(e.target.value);
    };
  
    const handleCheckboxChange = () => {
      setIsChecked((prevChecked) => !prevChecked);
    };
  
    return (
      <div>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className={StylesTaskList.checkbox}
          />
          
        
          <input
            type="text"
            placeholder="Type something..."
            value={inputValue}
            onChange={handleInputChange}
            className={StylesTaskList.inputTask}
          />
        
      </div>
    );
  };


export default TaskList