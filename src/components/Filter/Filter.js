import React from 'react';
import Range from '../Range/Range'
import Categories from '../Categories/Categories';
import { cuisineType, mealType, dishType, health, diet } from '../../constant';
import './Filter.css';

const Filter = (props) => {
    const {
        onChangeCheckBox,
        calMinChange,
        calMaxChange,
        calMin,
        calMax,
        timeMinChange,
        timeMaxChange,
        timeMin,
        timeMax
    } = props;
    return (
        <div className="filterCintainer">
            <div className="filterText">Filters</div>
            <div className="filterItem">
                Calories
                <Range
                    onMinChange={calMinChange}
                    onMaxChange={calMaxChange}
                    min={calMin}
                    max={calMax}
                />
            </div>
            <div className="filterItem">
                Time
                <Range
                    onMinChange={timeMinChange}
                    onMaxChange={timeMaxChange}
                    min={timeMin}
                    max={timeMax}
                />
            </div>
            <Categories
                data={cuisineType}
                title="cuisineType"
                onChangeCheckBox={onChangeCheckBox}
            />
            <Categories
                data={mealType}
                title="mealType"
                onChangeCheckBox={onChangeCheckBox}
            />
            <Categories
                data={dishType}
                title="dishType"
                onChangeCheckBox={onChangeCheckBox}
            />
            <Categories
                data={health}
                title="health"
                onChangeCheckBox={onChangeCheckBox}
            />
            <Categories
                data={diet}
                title="diet"
                onChangeCheckBox={onChangeCheckBox}
            />
        </div>
    );
}

export default Filter;