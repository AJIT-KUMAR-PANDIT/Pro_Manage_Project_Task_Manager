import React from 'react';
import StylesModalTaskEditList from './ModalTaskEditList.module.css';

const ModalTaskEditList = ({ checklists, setChecklists, onTaskCheck, onTaskDelete }) => {

  const handleAddNewClick = () => {
    const newChecklistId = `checklist-${checklists.length}`;
    const newChecklist = {
      id: newChecklistId,
      inputValue: '',
      isChecked: false,
    };
    setChecklists([...checklists, newChecklist]);
  };

  const handleInputChange = (e, id) => {
    const updatedChecklists = checklists.map((checklist) => {
      if (checklist.id === id) {
        return { ...checklist, inputValue: e.target.value };
      }
      return checklist;
    });
    setChecklists(updatedChecklists);
  };

  const handleCheckboxChange = (id) => {
    const updatedChecklists = checklists.map((checklist) => {
      if (checklist.id === id) {
        return { ...checklist, isChecked: !checklist.isChecked };
      }
      return checklist;
    });
    setChecklists(updatedChecklists);
    // Pass the updated data to the parent component
    onTaskCheck(id, updatedChecklists.find(checklist => checklist.id === id).isChecked);
  };

  const handleDeleteClick = (id) => {
    const updatedChecklists = checklists.filter((checklist) => checklist.id !== id);
    setChecklists(updatedChecklists);
    // Pass the updated data to the parent component
    onTaskDelete(id);
  };

  // Function to collect task data as string arrays
  const collectTaskData = () => {
    return checklists.map(checklist => checklist.inputValue);
  };

  return (
    <>
      {checklists.map((checklist) => (
        <div key={checklist.id} className={StylesModalTaskEditList.checklist}>
          <input
            type="checkbox"
            checked={checklist.isChecked}
            onChange={() => handleCheckboxChange(checklist.id)}
            className={StylesModalTaskEditList.checkbox}
          />
          <input
            type="text"
            placeholder="Add a Task"
            value={checklist.inputValue}
            onChange={(e) => handleInputChange(e, checklist.id)}
            className={StylesModalTaskEditList.inputTask}
          />
          <button className={StylesModalTaskEditList.deleteButton} onClick={() => handleDeleteClick(checklist.id)}>
            <img src="Assets/delete.svg" alt="delete" />
          </button>
        </div>
      ))}
      <br/>
      <div className={StylesModalTaskEditList.addButton} onClick={handleAddNewClick}>
        <img src='Assets/AddButton.svg' alt='AddButton' />&nbsp;&nbsp;Add New
      </div>
    </>
  );
};

export default ModalTaskEditList;
