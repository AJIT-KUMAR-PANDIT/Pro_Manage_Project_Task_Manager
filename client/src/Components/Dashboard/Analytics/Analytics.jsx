import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StylesAnalytics from './Analytics.module.css';
import { Url } from '../../../Utils/Url';
import { useDispatch } from 'react-redux';
import { toggleLoader } from '../../../Redux/slice';

const Analytics = () => {
    const baseUrl = Url();
    const [analyticsData, setAnalyticsData] = useState({
        backlogTasks: 0,
        todoTasks: 0,
        inProgressTasks: 0,
        completedTasks: 0,
        lowPriorityTasks: 0,
        moderatePriorityTasks: 0,
        highPriorityTasks: 0,
        dueDateTasks: 0,
    });

    const dispatch = useDispatch();

    const fetchData = async () => {
        const uId = localStorage.getItem('id');
        dispatch(toggleLoader());
        try {
            const response = await axios.get(`${baseUrl}/api/analytics/${uId}`,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setAnalyticsData(response.data);
            dispatch(toggleLoader());
        } catch (error) {
            console.error('Error fetching analytics:', error);
            dispatch(toggleLoader());
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div className={StylesAnalytics.analytics}>
                <div className={StylesAnalytics.header}>Analytics<br /><br /><br /></div>
                <div style={{ display: 'flex', gap: '31px' }}>
                    <div className={StylesAnalytics.colorBlue}>
                        <div>
                            <div style={{ display: 'flex', gap: '11px' }}><img src='Assets/analyticsCircle.svg' alt='analyticsCircle' /><span style={{ display: 'flex', gap: '211px' }}><span className={StylesAnalytics.anTitle}>Backlog Tasks</span> <span className={StylesAnalytics.anNo}>{analyticsData.backlogTasks}</span></span></div>
                            <br />
                            <div style={{ display: 'flex', gap: '11px' }}><img src='Assets/analyticsCircle.svg' alt='analyticsCircle' /><span style={{ display: 'flex', gap: '226px' }}><span className={StylesAnalytics.anTitle}>To-do Tasks</span> <span className={StylesAnalytics.anNo}>{analyticsData.todoTasks}</span></span></div>
                            <br />
                            <div style={{ display: 'flex', gap: '11px' }}><img src='Assets/analyticsCircle.svg' alt='analyticsCircle' /><span style={{ display: 'flex', gap: '187px' }}><span className={StylesAnalytics.anTitle}>In-Progress Tasks</span> <span className={StylesAnalytics.anNo}>{analyticsData.inProgressTasks}</span></span></div>
                            <br />
                            <div style={{ display: 'flex', gap: '11px' }}><img src='Assets/analyticsCircle.svg' alt='analyticsCircle' /><span style={{ display: 'flex', gap: '189px' }}><span className={StylesAnalytics.anTitle}>Completed Tasks</span> <span className={StylesAnalytics.anNo}>{analyticsData.completedTasks}</span></span></div>
                        </div>
                    </div>
                    <div className={StylesAnalytics.colorBlue}>
                        <div>
                            <div style={{ display: 'flex', gap: '11px' }}><img src='Assets/analyticsCircle.svg' alt='analyticsCircle' /><span style={{ display: 'flex', gap: '211px' }}><span className={StylesAnalytics.anTitle}>Low Priority</span> <span className={StylesAnalytics.anNo}>{analyticsData.lowPriorityTasks}</span></span></div>
                            <br />
                            <div style={{ display: 'flex', gap: '11px' }}><img src='Assets/analyticsCircle.svg' alt='analyticsCircle' /><span style={{ display: 'flex', gap: '178px' }}><span className={StylesAnalytics.anTitle}>Moderate Priority</span> <span className={StylesAnalytics.anNo}>{analyticsData.moderatePriorityTasks}</span></span></div>
                            <br />
                            <div style={{ display: 'flex', gap: '11px' }}><img src='Assets/analyticsCircle.svg' alt='analyticsCircle' /><span style={{ display: 'flex', gap: '211px' }}><span className={StylesAnalytics.anTitle}>High Priority</span> <span className={StylesAnalytics.anNo}>{analyticsData.highPriorityTasks}</span></span></div>
                            <br />
                            <div style={{ display: 'flex', gap: '11px' }}><img src='Assets/analyticsCircle.svg' alt='analyticsCircle' /><span style={{ display: 'flex', gap: '195px' }}><span className={StylesAnalytics.anTitle}>Due Date Tasks</span> <span className={StylesAnalytics.anNo}>{analyticsData.dueDateTasks}</span></span></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Analytics;
