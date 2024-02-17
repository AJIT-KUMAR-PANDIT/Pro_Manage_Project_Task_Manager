import React from 'react'
import StylesLeftSideBar from './LeftSideBar.module.css'

const LeftSideBar = () => {
    return (
        <div className={StylesLeftSideBar.leftSideBar} >
            <div>
                <div><img src='Assets/Art.svg' alt='Art' style={{ width: '100%' }} /></div>
                <div className={StylesLeftSideBar.font}>
                    <div className={StylesLeftSideBar.font1}>Welcome aboard my friend</div>
                    <div className={StylesLeftSideBar.font2}>just a couple of clicks and we start</div>
                </div>
            </div>
        </div>
    )
}

export default LeftSideBar;