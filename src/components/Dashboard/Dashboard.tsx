import axios from "axios";
import { FC, useEffect, useState } from "react";
import "./Dashboard.css";

interface AppProps {
  dash: any[];
  resultCount: number;
}

export const Dashboard: FC<AppProps> = ({ dash, resultCount }: AppProps) => {
  const [metrics, getMetrics] = useState<number[]>([]);
  const [country, getCountry] = useState("");
  const [airport, getAirport] = useState("");
  function countingSelects(array: any[]) {
    let selectCount = 0;
    let selectWhereCount = 0;
    let selectLeftGoin = 0;
    for (let i = 0; i < array.length; i++) {
      if (dash[i].query.includes("left join")) {
        selectLeftGoin++;
      } else if (dash[i].query.includes("where")) {
        selectWhereCount++;
      }
      selectCount++;
    }
    const allMetrics = selectCount + selectWhereCount + selectLeftGoin;
    return [selectCount, selectWhereCount, selectLeftGoin, allMetrics];
  }

  useEffect(() => {
    console.log(dash, resultCount);
    axios
      .get(`https://api.ipregistry.co/?key=q6sw46femmsu2i95`)
      .then(function (response) {
        axios
          .get(
            `https://airlabs.co/api/v9/nearby?lat=${response.data.location.latitude}&lng=${response.data.location.longitude}&distance=1000&api_key=07906dcf-2189-4800-aa00-03d171de2a0d`
          )
          .then(function (response) {
            getCountry(response.data.response.airports[0].country_code);
            getAirport(response.data.response.airports[0].icao_code);
          });
      });
    getMetrics(countingSelects(dash));
  }, []);

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-main">
        <div className="dashboard-main-metrics">
          <div className="dashboard-main-metrics-block">
            <p className="dashboard-header">Worker</p>
            <p className="dashboard-text">Colo: {airport}</p>
            <p className="dashboard-text">Country: {country}</p>
          </div>
          <div className="dashboard-main-metrics-block">
            <p className="dashboard-header">SQL Metrics</p>
            <p className="dashboard-text">Query count: {metrics[3]}</p>
            <p className="dashboard-text">Results count: {resultCount} </p>
            <p className="dashboard-text"># SELECT: {metrics[0]}</p>
            <p className="dashboard-text"># SELECT WHERE: {metrics[1]}</p>
            <p className="dashboard-text"># SELECT LEFT JOIN: {metrics[2]}</p>
          </div>
        </div>
        <div className="div dashboard-main-logs">
          <p className="dashboard-header">Activity log</p>
          <p className="dashboard-header-under">
            Explore the app and see metrics here
          </p>
          {dash.length === 0 ? (
            <p></p>
          ) : (
            <div>
              {dash.map((log: any, index) => (
                <div key={index} className="block-log">
                  <p
                    className="dashboard-header-under"
                    style={{ color: "gray" }}
                  >
                    {log.timestamp},{log.workerId},{log.executionTime}ms
                  </p>
                  <p className="dashboard-text font-mono">{log.query}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
