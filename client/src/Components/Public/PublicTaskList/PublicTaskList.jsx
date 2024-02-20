import React from 'react';
import StylesPublicTaskList from './PublicTaskList.module.css';

const ModalTaskList = ({ checklists, setChecklists, onTaskCheck }) => {

  

  // const handleInputChange = (e, id) => {
  //   const updatedChecklists = checklists.map((checklist) => {
  //     if (checklist.id === id) {
  //       return { ...checklist, inputValue: e.target.value };
  //     }
  //     return checklist;
  //   });
  //   setChecklists(updatedChecklists);
  // };

  // const handleCheckboxChange = (id) => {
  //   const updatedChecklists = checklists.map((checklist) => {
  //     if (checklist.id === id) {
  //       return { ...checklist, isChecked: !checklist.isChecked };
  //     }
  //     return checklist;
  //   });
  //   setChecklists(updatedChecklists);
  //   // Pass the updated data to the parent component
  //   onTaskCheck(id, updatedChecklists.find(checklist => checklist.id === id).isChecked);
  // };

 
 

  return (
    <>
      
        <div  className={StylesPublicTaskList.checklist}>
          <input
            type="checkbox"
            // checked={checklist.isChecked}
            checked={true}
            // onChange={() => handleCheckboxChange(checklist.id)}
            className={StylesPublicTaskList.checkbox}
          />
          <input
            type="text"
            placeholder="Loading..."
            // value={checklist.inputValue}
            value={'test'}
            // onChange={(e) => handleInputChange(e, checklist.id)}
            className={StylesPublicTaskList.inputTask}
          />
        </div>
        <div>
          <br/>
                        <span className={StylesPublicTaskList.dueDateTitle}>Due Date</span>
                        &nbsp;&nbsp;&nbsp;
                        <span className={StylesPublicTaskList.dueDate}>Feb 10th</span>
                    </div>
      <br/>
    </>
  );
};

export default ModalTaskList;
