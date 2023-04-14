import React, { useState, useEffect } from 'react';
import './App.css'
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

const opencage = require('opencage-api-client');

//const geocoder = new OpenCageApi({ key: '2000608a387d4ff4970038366c825790' });

const listClicks = `query ListClicks {
  listClicks {
    items {
      id
      count
      timestamp
      location
    }
  }
}`;

const createClick = `mutation CreateClick($input: CreateClickInput!) {
  createClick(input: $input) {
    id
    count
    timestamp
    location
  }
}`;

function App() {
  const [clicks, setClicks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    fetchClicks();
    getUserLocation();
  }, []);

  async function fetchClicks() {
    const { data } = await API.graphql(graphqlOperation(listClicks));
    const newClicks = data.listClicks.items.map(click => {
      // If location is null, replace it with "Unknown"
      const location = click.location || "Unknown";
      return { ...click, location };
    });
    setClicks(newClicks);
    setLoading(false);
  }

  async function handleClick() {
    if (userLocation)
    {
      const { data } = await API.graphql(graphqlOperation(createClick, { input: { count: 1, timestamp: new Date().toISOString(), location: userLocation } }));
      setClicks([...clicks, data.createClick]);
    }
    else {
      console.log('User location not available yet');
    }
  }

  function getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async(position) => {
          const { latitude, longitude } = position.coords;
          var query = latitude + ',' + longitude;
          var api_url = 'https://api.opencagedata.com/geocode/v1/json'

          var request_url = api_url
            + '?'
            + 'key=' + '2000608a387d4ff4970038366c825790'
            + '&q=' + encodeURIComponent(query)
            + '&pretty=1'
            + '&no_annotations=1';

          var request = new XMLHttpRequest();
          request.open('GET', request_url, true);
          
          var request = new XMLHttpRequest();
          request.open('GET', request_url, true);

          request.onload = function() {
            // see full list of possible response codes:
            // https://opencagedata.com/api#codes

            if (request.status === 200){
              // Success!
              var data = JSON.parse(request.responseText);
              console.log(data);
              const location = data.results[0].components.city;
              setUserLocation(location);
            } else if (request.status <= 500){
              // We reached our target server, but it returned an error

              console.log("unable to geocode! Response code: " + request.status);
              var data = JSON.parse(request.responseText);
              console.log('error msg: ' + data.status.message);
            } else {
              console.log("server error");
            }
          };

          request.onerror = function() {
            // There was a connection error of some sort
            console.log("unable to connect to server");
          };

          request.send();  // make the request
        },
        error => {
          console.log(error);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  // Create an object with location counts
  const locationCounts = clicks.reduce((acc, click) => {
    if (click.location in acc) {
      acc[click.location] += click.count;
    } else {
      acc[click.location] = click.count;
    }
    return acc;
  }, {});

  // Create an array of location-count pairs sorted by count
  const locationCountsArray = Object.entries(locationCounts).sort((a, b) => b[1] - a[1]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'black' }}>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)' }}>
        <h1>Click Counter</h1>
        <button onClick={handleClick}>Click me</button>
        <p>Click count: {clicks.reduce((sum, click) => sum + click.count, 0)}</p>
        <h2>Geography Data</h2>
        <table>
          <thead>
            <tr>
              <th>Location</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {locationCountsArray.map(([location, count]) => (
              <tr key={location}>
                <td>{location}</td>
                <td>{count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;