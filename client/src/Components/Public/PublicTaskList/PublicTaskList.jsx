import React,{useState, useEffect} from 'react';
import StylesPublicTaskList from './PublicTaskList.module.css';

const ModalTaskList = ({  checked, taskName }) => {

  return (
    <>
      
        <div  className={StylesPublicTaskList.checklist}>
           <input
            type="checkbox"
            checked={checked}
            className={StylesPublicTaskList.checkbox}
          />
          <input
            type="text"
            placeholder="Loading..."
            value={taskName}
            className={StylesPublicTaskList.inputTask}
          />
        </div>
      <br/>
    </>
  );
};

export default ModalTaskList;
