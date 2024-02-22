import React,{useState, useEffect} from 'react';
import StylesPublicTaskList from './PublicTaskList.module.css';

const ModalTaskList = ({ itsDueDate, checked, taskName }) => {


  const [dueDate, setDueDate] = useState('');
    const [newDueDate, setNewDueDate] = useState('');
    const [dueDatePassed, setDueDatePassed] = useState(null);

    useEffect(() => {
        const today = new Date();
        const formatted = getFormattedDate(today);
        setDueDate(formatted);

        const serverDate = itsDueDate;
        if (!serverDate) {
            return;
        }

        const dateParts = serverDate.split('T')[0].split('-');
        const serverDueDate = new Date(`${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`);

        setNewDueDate(getFormattedDate(serverDueDate));

        if (serverDueDate < today) {
            setDueDatePassed(true);
        } else {
            setDueDatePassed(false);
        }
    }, [itsDueDate]);

    function getFormattedDate(date) {
        const day = date.getDate();
        const month = getFormattedMonth(date.getMonth());
        const suffix = getDaySuffix(day);

        return `${month} ${day}${suffix}`;
    }

    function getFormattedMonth(month) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months[month];
    }

    function getDaySuffix(day) {
        if (day === 1 || day === 21 || day === 31) {
            return "st";
        } else if (day === 2 || day === 22) {
            return "nd";
        } else if (day === 3 || day === 23) {
            return "rd";
        } else {
            return "th";
        }
    }



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
        <div>
          <br/>
          { itsDueDate!==null &&(
                        <>
                        <span className={StylesPublicTaskList.dueDateTitle}>Due Date</span>
                        &nbsp;&nbsp;&nbsp;
                        <span className={StylesPublicTaskList.dueDate}>{newDueDate}</span>
                        </>
          )}
                    </div>
      <br/>
    </>
  );
};

export default ModalTaskList;
