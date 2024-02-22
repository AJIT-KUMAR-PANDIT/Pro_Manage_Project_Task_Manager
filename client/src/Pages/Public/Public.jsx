import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StylePublic from './Public.module.css';
import PublicTaskList from '../../Components/Public/PublicTaskList/PublicTaskList';
import { Url } from '../../Utils/Url';
import logoimg from '../../Assets/logo.svg';
import highPriorityImg from '../../Assets/high.svg';
import moderatePriorityImg from '../../Assets/moderate.svg';
import lowPriorityImg from '../../Assets/low.svg';
import NotFound from '../../Components/Dashboard/NotFound/NotFound';

const Public = ({ taskId }) => {
    const baseUrl = Url();
    const [shareableLink, setShareableLink] = useState('');
    const [showLink, setShowLink] = useState(false);
    const [publicTaskData, setPublicTaskData] = useState(0);
    let imgSrc = null;

    const showPublicTaskData = async (taskId) => {
        try {
            const response = await axios.get(`${baseUrl}/api/publictasks/${taskId}`);
            let tasks = response.data.tasks;
            tasks.map((data) => {
                setPublicTaskData(data);
            })
        } catch (error) {
            console.error('Error fetching public task data:', error);
        }
    };

    useEffect(() => {
        showPublicTaskData(taskId);
    }, [], [taskId]);

    const generateShareableLink = async (taskId) => {
        try {
            const response = await axios.get(`${baseUrl}/api/sharelink/${taskId}`);
            setShareableLink(response.data.shareableLink);
            setShowLink(true);
        } catch (error) {
            console.error('Error generating shareable link:', error);
        }
    };

    const setImage = (priority) => {
        switch (priority) {
            case 'HIGH PRIORITY':
                imgSrc = highPriorityImg;
                break;
            case 'MODERATE PRIORITY':
                imgSrc = moderatePriorityImg;
                break;
            default:
                imgSrc = lowPriorityImg;
        }
    };

    if (publicTaskData) {
        setImage(publicTaskData.priority);
    }

    const [taskName, setTaskName] = useState('');
    const [check, setCheck] = useState(null);

    
    return (
        <>
            {console.log(publicTaskData)}
            {(publicTaskData) ? (
                <div className={StylePublic.public}>
                    <div className={StylePublic.logo}>
                        <img src={logoimg} alt='logo' style={{ width: '51px' }} />&nbsp;&nbsp;&nbsp;Pro Manage
                    </div>
                    <br />
                    <div className={StylePublic.cards}>
                        <div className={StylePublic.priorityText}>
                            <img src={imgSrc} alt='priority' />&nbsp;&nbsp;{publicTaskData.priority}
                        </div>
                        <br />
                        <div className={StylePublic.cardTitle}>
                            {publicTaskData.title}
                        </div>
                        <br /><br />
                        <div className={StylePublic.checklist}>
                            Checklist (1/3)
                        </div>
                        <br />
                        <div className={StylePublic.taskList}>
                            {
                                publicTaskData.checklist &&
                                publicTaskData.checklist.map((check) => (
                                    <PublicTaskList itsDueDate={publicTaskData.dueDate} checked={check.completed} taskName={check.taskName} />
                                ))}
                            {console.log(publicTaskData.checklist)}
                        </div>
                        <br />
                        <button onClick={() => generateShareableLink(taskId)}>Generate Shareable Link</button>
                        {showLink && (
                            <div className={StylePublic.shareableLink}>
                                <p>Shareable Link:</p>
                                <a href={shareableLink} target="_blank" rel="noopener noreferrer">{shareableLink}</a>
                            </div>
                        )}
                    </div>
                </div>

            ) : (
                <NotFound />
            )
            }
        </>
    );
}

export default Public;
