import React, { useState } from 'react';
import StylesTaskList from './TaskList.module.css';

const TaskList = ({taskName, completed}) => {
    const [inputValue, setInputValue] = useState(taskName);
    const [isChecked, setIsChecked] = useState(completed);
  
      
    return (
      <div>
          <input
            type="checkbox"
            checked={isChecked}
            className={StylesTaskList.checkbox}
          />
          
        
          <input
            type="text"
            placeholder="Type..."
            value={inputValue}
            className={StylesTaskList.inputTask}
          />
        
      </div>
    );
  };


export default TaskList