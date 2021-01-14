import React from 'react';
import './Range.css';

const Range = (props) => {
    const { onMinChange, onMaxChange, min, max } = props;
    const onMinInputChange = (evt) => {
        onMinChange(evt.target.value)
    }
    const onMaxInputChange = (evt) => {
        onMaxChange(evt.target.value)
    }
    return (
        <div className="range">
            <label>
                <input onChange={onMinInputChange} value={min} className="range-input" type="number" placeholder="min" />
                to
                <input onChange={onMaxInputChange} value={max} className="range-input" type="number" placeholder="max" />
            </label>
        </div>
    );
}

export default Range;