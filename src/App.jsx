import React from "react";
import Header from "./components/Header";
import { useState } from "react";
import AllCountries from "./components/CountriesFull";
import OneCountry from "./components/Country";
import useFetch from "./pages/useFetch";
import { Routes, Route } from "react-router-dom";

function App() {
  const [input, setInput] = useState(undefined);
  const [search, setSearch] = useState(undefined);
  const { data } = useFetch("https://restcountries.com/v2/all");

  const [country, setCountry] = useState("all");
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(input);
  };
  const handleSelect = (e) => {
    e.preventDefault();
    setCountry(e.target.value);
    setSearch(undefined);
    setInput("");
  };

  const getcountryname = (code) => {
    let countryName;
    const country = data.filter((element) => {
      return element.alpha3Code === code;
    });
    countryName = country[0].name;
    return countryName;
  };

  return (
    <div className="App container">
      <div className="">
        <Header />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                {" "}
                <form className="form" onSubmit={handleSubmit}>
                  <div className="search">
                    <i className="fa fa-search searches"></i>
                    <input
                      type="search"
                      className="input"
                      placeholder="Search for a country... "
                      value={input}
                      onChange={(e) => {
                        setInput(e.target.value);
                        setSearch(e.target.value);
                      }}
                    />
                  </div>
                  <div className="selects">
                    <select
                      id="region"
                      name="region"
                      className="select"
                      onChange={handleSelect}
                    >
                      <option value="all" defaultValue>
                        Filter by Region
                      </option>
                      <option value="Africa">Africa</option>
                      <option value="Americas">America</option>
                      <option value="Asia">Asia</option>
                      <option value="Europe">Europe</option>
                      <option value="Oceania">Oceania</option>
                    </select>
                  </div>
                </form>{" "}
                <AllCountries country={country} name={search} />
              </>
            }
          ></Route>

          <Route
            path="/:countryName"
            element={<OneCountry getcountryname={getcountryname} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
