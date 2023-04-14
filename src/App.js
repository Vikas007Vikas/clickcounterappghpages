import React, { useState, useEffect } from 'react';
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

const listClicks = `query ListClicks {
  listClicks {
    items {
      id
      count
      timestamp
    }
  }
}`;

const createClick = `mutation CreateClick($input: CreateClickInput!) {
  createClick(input: $input) {
    id
    count
    timestamp
  }
}`;

function App() {
  const [clicks, setClicks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClicks();
  }, []);

  async function fetchClicks() {
    const { data } = await API.graphql(graphqlOperation(listClicks));
    setClicks(data.listClicks.items);
    setLoading(false);
  }

  async function handleClick() {
    const { data } = await API.graphql(graphqlOperation(createClick, { input: { count: 1, timestamp: new Date().toISOString() } }));
    setClicks([...clicks, data.createClick]);
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Click Counter</h1>
      <button onClick={handleClick}>Click me</button>
      <p>Click count: {clicks.reduce((sum, click) => sum + click.count, 0)}</p>
    </div>
  );
}

export default App;