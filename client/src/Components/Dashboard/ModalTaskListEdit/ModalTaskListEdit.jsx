import React from 'react';
import StylesModalTaskListEdit from './ModalTaskListEdit.module.css';

const ModalTaskListEdit = ({ checklists, setChecklists, onTaskCheck, onTaskDelete }) => {

  const handleAddNewClick = () => {
    const newChecklistId = `checklist-${checklists.length}`;
    const newChecklist = {
      id: newChecklistId,
      taskName: '',
      completed: false,
    };
    setChecklists([...checklists, newChecklist]);
  };

  const handleInputChange = (e, id) => {
    const updatedChecklists = checklists.map((checklist) => {
      if (checklist.id === id) {
        return { ...checklist, taskName: e.target.value };
      }
      return checklist;
    });
    setChecklists(updatedChecklists);
  };

  const handleCheckboxChange = (id) => {
    const updatedChecklists = checklists.map((checklist) => {
      if (checklist.id === id) {
        return { ...checklist, completed: !checklist.completed };
      }
      return checklist;
    });
    setChecklists(updatedChecklists);
    // Pass the updated data to the parent component
    onTaskCheck(id, updatedChecklists.find(checklist => checklist.id === id).completed);
  };

  const handleDeleteClick = (id) => {
    const filteredChecklists = checklists.filter((checklist) => checklist.id !== id);
    setChecklists(filteredChecklists);
    // Pass the updated data to the parent component
    onTaskDelete(id);
  };

  return (
    <>
      {checklists.map((checklist) => (
        <div key={checklist.id} className={StylesModalTaskListEdit.checklist}>
          <input
            type="checkbox"
            checked={checklist.completed}
            onChange={() => handleCheckboxChange(checklist.id)}
            className={StylesModalTaskListEdit.checkbox}
          />
          <input
            type="text"
            placeholder="Add a Task"
            value={checklist.taskName}
            onChange={(e) => handleInputChange(e, checklist.id)}
            className={StylesModalTaskListEdit.inputTask}
          />
          <button className={StylesModalTaskListEdit.deleteButton} onClick={() => handleDeleteClick(checklist.id)}>
            <img src="Assets/delete.svg" alt="delete" />
          </button>
        </div>
      ))}
      <br/>
      <div className={StylesModalTaskListEdit.addButton} onClick={handleAddNewClick}>
        <img src='Assets/AddButton.svg' alt='AddButton' />&nbsp;&nbsp;Add New
      </div>
    </>
  );
};

export default ModalTaskListEdit;
