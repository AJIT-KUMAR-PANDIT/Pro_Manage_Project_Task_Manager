import React from 'react'
import StylesAnalytics from './Analytics.module.css';


const Analytics = () => {
    return (
        <>
            <div className={StylesAnalytics.analytics}>
                <div className={StylesAnalytics.header} >Analytics<br /><br /><br /></div>
                <div style={{ display: 'flex', gap: '31px' }}>
                    <div className={StylesAnalytics.colorBlue}>
                        <div>
                            <div style={{ display: 'flex', gap: '11px' }}><img src='Assets/analyticsCircle.svg' alt='analyticsCircle' /><span style={{ display: 'flex', gap: '211px' }}><span className={StylesAnalytics.anTitle}>Backlog Tasks</span> <span className={StylesAnalytics.anNo}>0</span></span></div>
                            <br />
                            <div style={{ display: 'flex', gap: '11px' }}><img src='Assets/analyticsCircle.svg' alt='analyticsCircle' /><span style={{ display: 'flex', gap: '226px' }}><span className={StylesAnalytics.anTitle}>To-do Tasks</span> <span className={StylesAnalytics.anNo}>0</span></span></div>
                            <br />
                            <div style={{ display: 'flex', gap: '11px' }}><img src='Assets/analyticsCircle.svg' alt='analyticsCircle' /><span style={{ display: 'flex', gap: '187px' }}><span className={StylesAnalytics.anTitle}>In-Progress Tasks</span> <span className={StylesAnalytics.anNo}>0</span></span></div>
                            <br />
                            <div style={{ display: 'flex', gap: '11px' }}><img src='Assets/analyticsCircle.svg' alt='analyticsCircle' /><span style={{ display: 'flex', gap: '189px' }}><span className={StylesAnalytics.anTitle}>Completed Tasks</span> <span className={StylesAnalytics.anNo}>0</span></span></div>
                        </div>
                    </div>
                    <div className={StylesAnalytics.colorBlue}>
                        <div>
                            <div style={{ display: 'flex', gap: '11px' }}><img src='Assets/analyticsCircle.svg' alt='analyticsCircle' /><span style={{ display: 'flex', gap: '211px' }}><span className={StylesAnalytics.anTitle}>Low Priority</span> <span className={StylesAnalytics.anNo}>0</span></span></div>
                            <br />
                            <div style={{ display: 'flex', gap: '11px' }}><img src='Assets/analyticsCircle.svg' alt='analyticsCircle' /><span style={{ display: 'flex', gap: '178px' }}><span className={StylesAnalytics.anTitle}>Moderate Priority</span> <span className={StylesAnalytics.anNo}>0</span></span></div>
                            <br />
                            <div style={{ display: 'flex', gap: '11px' }}><img src='Assets/analyticsCircle.svg' alt='analyticsCircle' /><span style={{ display: 'flex', gap: '211px' }}><span className={StylesAnalytics.anTitle}>High Priority</span> <span className={StylesAnalytics.anNo}>0</span></span></div>
                            <br />
                            <div style={{ display: 'flex', gap: '11px' }}><img src='Assets/analyticsCircle.svg' alt='analyticsCircle' /><span style={{ display: 'flex', gap: '195px' }}><span className={StylesAnalytics.anTitle}>Due Date Tasks</span> <span className={StylesAnalytics.anNo}>0</span></span></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Analytics;