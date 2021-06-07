import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data_18_today, setData_18_today] = useState([]);
  const [data_18_tomorrow, setData_18_tomorrow] = useState([]);
  useEffect(() => {
    axios
      .all([
        axios.get(
          "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=306&date=07-06-2021"
        ),
        axios.get(
          "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=306&date=08-06-2021"
        ),
      ])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          const responseTwo = responses[1];
          if (responseOne.status === 200) {
            let sessions = responseOne.data.sessions;
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

        //   (respose) => {
        //   if (respose.status === 200) {
        //     let sessions = respose.data.sessions;
        //     if (sessions && sessions.length > 0) {
        //       let data;
        //       data = sessions.filter((session) => {
        //         return session.min_age_limit === 18;
        //       });
        //       console.log(data);
        //       setData_18_today(data);
        //     }
        //   }
        // }
      );
  }, []);
  return (
    <>
      <h1>Vaccination Drive Today()</h1>
      {data_18_today.length === 0 && <p>No vaccination Drive</p>}
      {data_18_today.map((session) => (
        
        <div key={session.session_id}>
          <p>Name: {session.name}</p>
          <p>Slots: {session.available_capacity}</p>
        </div>
      ))}

      <h1>Vaccination Drive Tomorrow()</h1>
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
