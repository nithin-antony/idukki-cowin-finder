import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "./App.css";

function App() {
  const [data_18_today, setData_18_today] = useState([]);
  const [data_18_tomorrow, setData_18_tomorrow] = useState([]);
  const today = moment(new Date()).format("DD-MM-YYYY");
  const tomorrow = moment().add(1,'days').format("DD-MM-YYYY");
  console.log(tomorrow);
  const BASE_URL = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?`;
  useEffect(() => {
    axios
      .all([
        axios.get(`${BASE_URL}district_id=306&date=${today}`),
        axios.get(`${BASE_URL}district_id=306&date=${tomorrow}`),
      ])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          const responseTwo = responses[1];
          if (responseOne.status === 200) {
            let sessions = responseOne.data.sessions;
            console.log(sessions);
            if (sessions && sessions.length > 0) {
              let data;
              data = sessions.filter((session) => {
                return session.min_age_limit === 18;
              });
              console.log(data);
              setData_18_today(data);
            }
          }
          if (responseTwo.status === 200) {
            let sessions = responseTwo.data.sessions;
            console.log(sessions);
            if (sessions && sessions.length > 0) {
              let data;
              data = sessions.filter((session) => {
                return session.min_age_limit === 18;
              });
              console.log(data);
              setData_18_tomorrow(data);
            }
          }
        })
      );
  }, []);
  return (
    <>
      <h1>Vaccination Drive Today({today})</h1>
      {data_18_today.length === 0 && <p>No vaccination Drive</p>}
      {data_18_today.map((session) => (
        <div key={session.session_id}>
          <p>Name: {session.name}</p>
          <p>Slots: {session.available_capacity}</p>
        </div>
      ))}

      <h1>Vaccination Drive Tomorrow({tomorrow})</h1>
      {data_18_tomorrow.length === 0 && <p>No vaccination Drive</p>}
      {data_18_tomorrow.map((session) => (
        <div key={session.center_id}>
          <p>Name: {session.name}</p>
          <p>Slots: {session.available_capacity}</p>
        </div>
      ))}
    </>
  );
}

export default App;
