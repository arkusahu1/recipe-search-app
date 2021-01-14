import React from 'react';
import './SearchCheckBox.css'


const SearchCheckBox = (props) => {
    const { label, name, onChangeCheckBox } = props;
    return (
        <div className="SearchCheckBoxContainer">
             <label>
                <input className="SearchCheckBox_input" type="checkbox" name={name} onChange={onChangeCheckBox}/>
                {label}
            </label>
        </div>
    );
}

export default SearchCheckBox;