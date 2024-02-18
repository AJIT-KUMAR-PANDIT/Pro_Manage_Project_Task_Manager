import React from 'react';
import StylesSettings from './Settings.module.css';
import SettingsForm from '../SettingsForm/SettingsForm';

const Settings = () => {
  return (
    <>
    <div className={StylesSettings.settings}>
                <div className={StylesSettings.header} >Settings<br/><br/><br/></div>
                <div >
                        <SettingsForm/>
                </div>
            </div>
    </>
  )
}

export default Settings;