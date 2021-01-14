import React from 'react';
import SearchCheckBox from '../SearchCheckBox/SearchCheckBox';
import './Categories.css';

const Categories = (props) => {
    const {
        onChangeCheckBox,
        title,
        data
    } = props;
    return (
        <div className="categoryContainer">
            {title}
            {data.map((item) => (
                <SearchCheckBox
                    key={item.apiKey}
                    label={item.label}
                    name={item.apiKey}
                    onChangeCheckBox={onChangeCheckBox(title)}
                />
            ))}
        </div>
    );
}

export default Categories;