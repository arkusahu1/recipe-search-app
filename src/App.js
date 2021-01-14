import React, { useState } from "react";
import Axios from "axios";
import "./App.css";
import Recipe from "./components/Recipe";
import Alert from "./components/Alert";
import Filter from './components/Filter/Filter';

function App() {
  const filterObjInitial = {
    cuisineType: [],
    mealType: [],
    dishType: [],
    health: [],
    diet: [],
  }
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [title, setTitle] = useState('');
  const [alert, setAlert] = useState("");
  const [filterObj, updateFilterObj] = useState(filterObjInitial);
  const [searchList, updateSearchList] = useState([]);
  const [calMin, calMinChange] = useState(0);
  const [calMax, calMaxChange] = useState(0);
  const [timeMin, timeMinChange] = useState(0);
  const [timeMax, timeMaxChange] = useState(0);

  const APP_ID = "406ea135";
  const APP_KEY = "3bd9744134e25af756af25a2a698745e";

  const getRange = (min, max) => {
    let range = '';
    const minNumber =  Number(min);
    const maxNumber =  Number(max);
    if (minNumber && maxNumber) {
      if (maxNumber > minNumber) {
        range = `${minNumber}-${maxNumber}`;
      } else {
        range = minNumber;
      }
    } else if (minNumber) {
      range = minNumber;
    } else if (maxNumber) {
      range = maxNumber;
    } 
    return range;
  }


  const getData = async () => {
    if (query !== "") {
      
      const queryString = Object.keys(filterObj).reduce((acc1, key) => {
        const queryStr = filterObj[key].reduce((acc2, item) => {
          return `${acc2}${acc2 ? '&' : ''}${key}=${item}`;
        }, '');
        return `${acc1}${acc1 && filterObj[key].length > 0 ? '&' : ''}${queryStr}`;
      }, '');

      const calRange = getRange(calMin, calMax);
      const timeRange = getRange(timeMin, timeMax);
      
      const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}${queryString ? `&${queryString}` : ''}${calRange ? `&calories=${calRange}` : ''}${timeRange ? `&time=${timeRange}` : ''}`;
      const result = await Axios.get(url);
      if (searchList.length === 5) {
        searchList.shift();
      }
      searchList.push(result.data.q);
      updateSearchList(searchList);
      if (!result.data.more) {
        return setAlert("No Recipe Found");
      }
      console.log(result);
      setRecipes(result.data.hits);
      setTitle(result.data.q);
      setQuery("");
      setAlert("");
    } else {
      setAlert("Please fill the form");
    }
  };

  const onChange = e => setQuery(e.target.value);

  const onSubmit = e => {
    e.preventDefault();
    getData();
  };

  const onChangeCheckBox = (type) => (event) => {
    if (event.target.checked) {
      filterObj[type].push(event.target.name);
    } else {
      filterObj[type].splice(filterObj[type].indexOf(event.target.name), 1);
    }
    updateFilterObj(filterObj);
  }

  return (
  <div className="appContainer">
    <h1>Recipe Search App</h1>
    <div className="app">
      <Filter
        onChangeCheckBox={onChangeCheckBox}
        calMinChange={calMinChange}
        calMaxChange={calMaxChange}
        calMin={calMin}
        calMax={calMax}
        timeMinChange={timeMinChange}
        timeMaxChange={timeMaxChange}
        timeMin={timeMin}
        timeMax={timeMax}
      />
      <div className="bodyContainer">
        {searchList.length > 0 && <div className="searchHistory">Last 5 search: {searchList.toString()}</div>}
        <form onSubmit={onSubmit}>
          {alert && <Alert alert={alert} />}
          <label className="search-form">
            <input
              id="promo"
              type="text"
              name="query"
              onChange={onChange}
              value={query}
              autoComplete="off"
              placeholder="Search Recipe"
            />
            <input type="submit" value="Search" />
          </label>
        </form>
        <div>
          {title && <div className="searchTitle">Search result for {title}</div>}
          <div className="recipes">
            {recipes && recipes.length > 0 &&
              recipes.map(item => <Recipe key={item.recipe.label} recipe={item.recipe} />)}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default App;
