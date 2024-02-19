import React from 'react'
import StylesAddModalElement from './AddModalElement.module.css'

const AddModalElement = () => {
    return (
        <>
            <div className={StylesAddModalElement.addModalElement}>
                <div className={StylesAddModalElement.title}>Title<span className={StylesAddModalElement.asterisk}> *</span></div>
            </div>
        </>
    )
}

export default AddModalElement;