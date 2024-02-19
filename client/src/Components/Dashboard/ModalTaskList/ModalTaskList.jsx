import React, { useState } from 'react';
import StylesModalTaskList from './ModalTaskList.module.css';

const ModalTaskList = () => {
  const [inputValue, setInputValue] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleCheckboxChange = () => {
    setIsChecked((prevChecked) => !prevChecked);
  };

  return (
    <>
      <div id='checklist'>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className={StylesModalTaskList.checkbox}
        />


        <input
          type="text"
          placeholder="Type..."
          value={inputValue}
          onChange={handleInputChange}
          className={StylesModalTaskList.inputTask}
        />

        <button className={StylesModalTaskList.deleteButton}>
          <img src="Assets/delete.svg" alt="delete" />
        </button>
      </div>
    <br/>
      <div className={StylesModalTaskList.addButton}>
        <img src='Assets/AddButton.svg' alt='AddButton' />&nbsp;&nbsp;Add New
      </div>
    </>
  );
};


export default ModalTaskList;