import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useFetch from '../pages/useFetch';

const CountriesFull = ({ country, name }) => {
  let url = name
    ? `https://restcountries.com/v2/name/${name}`
    : "https://restcountries.com/v2/all";

  const { data, loading } = useFetch(url);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    if (name) {
      setCountries(data);
    } else {
      if (country === "all") {
        setCountries(data);
      } else {
        setCountries(
          data.filter((filterCountry) => {
            return filterCountry.region === country;
          })
        );
      }
    }
  }, [country, name, data]);

  return (
    <div className="">
      <div className="containerFlex">
        {countries.length ? (
          countries.map((oneCountry) => {
            const { flag, name, population, region, capital } = oneCountry;
            return (
              <Link to={`/${name}`} className="flexCountry" key={name}>
                <div className="flex-2" key={name}>
                  <img src={flag} alt={name} className="images" />

                  <div className="txt">
                    <h4>{name}</h4>
                    <div>
                      <h5 className="">
                        population:{" "}
                        <span>{population.toLocaleString("en-US")}</span>
                      </h5>
                    </div>
                    {region && (
                      <div>
                        <h5 className="">
                          region: <span>{region}</span>
                        </h5>
                      </div>
                    )}
                    {capital && (
                      <div>
                        <h5 className="">
                          capital: <span>{capital}</span>
                        </h5>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <h1 className={loading ? "x" : "loading"} style={{ left: "35%" }}>
            Loading...
          </h1>
        )}
      </div>
    </div>
  );
};

export default CountriesFull;
