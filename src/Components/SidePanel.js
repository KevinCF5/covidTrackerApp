import React, { useEffect, useState } from "react";
import "./SidePanel.css";
import { sortData } from "../Utilities/util";

const SidePanel = () => {
  const [countries, setCountries] = useState([]);
  const [selectedTab, setSelectedTab] = useState("cases");
  const [totalCases, setTotalCases] = useState(null);
  const [sortedCountriesData, setSortedData] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const totalResponse = await fetch("https://disease.sh/v3/covid-19/all");
        const totalCases = await totalResponse.json();
        setTotalCases(totalCases);

        const countriesResponse = await fetch(
          "https://disease.sh/v3/covid-19/countries"
        );
        const countries = await countriesResponse.json();

        const sortedData = sortData(countries);
        setSortedData(sortedData);
        setCountries(countries);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChangeTab = (tab) => {
    setSelectedTab(tab);
  };

  const filteredCountries = sortedCountriesData.filter((country) =>
    country.country.toLowerCase().includes(searchInput.toLowerCase())
  );

  const tabDataDisplay = () => {
    if (selectedTab === "cases") {
      return {
        value: totalCases ? totalCases.cases : null,
        countryParameter: "cases",
      };
    } else if (selectedTab === "recovered") {
      return {
        value: totalCases ? totalCases.recovered : null,
        countryParameter: "recovered",
      };
    } else if (selectedTab === "deaths") {
      return {
        value: totalCases ? totalCases.deaths : null,
        countryParameter: "deaths",
      };
    }
    return null;
  };

  const tabDisplay = tabDataDisplay();

  return (
    <div className="side-panel">
      <div className="tabs">
        <button onClick={() => handleChangeTab("cases")}>CASES</button>
        <button onClick={() => handleChangeTab("recovered")}>RECOVERED</button>
        <button onClick={() => handleChangeTab("deaths")}>DEATHS</button>
      </div>

      <div className="total-worlwide">
        <h2>{tabDisplay.value}</h2>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="search..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

      <div className="country-list">
        <ul>
          {filteredCountries.map((country) => (
            <li key={country.country} className="country-item">
              <span className="country-cases">
                {country[tabDisplay.countryParameter]}
              </span>
              <span className="country-name">{country.country}</span>
              <img
                className="country-flag"
                src={country.countryInfo.flag}
                alt=""
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SidePanel;
